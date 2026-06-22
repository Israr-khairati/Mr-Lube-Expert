import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "../_core/cookies";
import { COOKIE_NAME } from "@shared/const";
import { sdk } from "../_core/sdk";
import { getDb } from "../db";
import { adminCredentials, users, bookings, reviews, siteContent, mediaFiles } from "../../drizzle/schema";
import { eq, desc, asc } from "drizzle-orm";
import { hashPassword, verifyPassword } from "../_core/password";
import { uploadFile } from "../storageHelper";
import { ENV } from "../_core/env";
import crypto from "crypto";

// Auto-seed function for default admin
async function ensureAdminExists() {
  const db = await getDb();
  if (!db) return;

  const existing = await db.select().from(adminCredentials).limit(1);
  if (existing.length === 0) {
    let password = ENV.adminDefaultPassword;
    let isRandom = false;
    if (!password) {
      password = crypto.randomBytes(12).toString("hex") + "Admin!23";
      isRandom = true;
    }
    const passwordHash = await hashPassword(password);
    await db.insert(adminCredentials).values({
      username: "admin",
      email: "admin@mrlubeexpert.com",
      passwordHash,
    });
    if (isRandom) {
      console.warn(
        `[Seeding] ADMIN_DEFAULT_PASSWORD env variable not set! Generated random admin password: ${password}`
      );
    } else {
      console.log("[Seeding] Default admin created using configured ADMIN_DEFAULT_PASSWORD");
    }
  }
}

export const adminRouter = router({
  login: publicProcedure
    .input(
      z.object({
        usernameOrEmail: z.string().min(1, "Username or email is required"),
        password: z.string().min(1, "Password is required"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ensureAdminExists();
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Check credentials
      const records = await db
        .select()
        .from(adminCredentials)
        .where(
          input.usernameOrEmail.includes("@")
            ? eq(adminCredentials.email, input.usernameOrEmail)
            : eq(adminCredentials.username, input.usernameOrEmail)
        )
        .limit(1);

      if (records.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username/email or password",
        });
      }

      const adminRecord = records[0];
      const isValid = await verifyPassword(input.password, adminRecord.passwordHash);
      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username/email or password",
        });
      }

      // Setup session user in the local users table
      const openId = `admin_${adminRecord.username}`;
      const now = new Date();
      
      const existingUser = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
      if (existingUser.length === 0) {
        await db.insert(users).values({
          openId,
          name: adminRecord.username,
          email: adminRecord.email,
          role: "admin",
          loginMethod: "credentials",
          lastSignedIn: now,
        });
      } else {
        await db
          .update(users)
          .set({ lastSignedIn: now, role: "admin" })
          .where(eq(users.openId, openId));
      }

      // Create session cookie using sdk
      const sessionToken = await sdk.createSessionToken(openId, { name: adminRecord.username });
      const cookieOptions = getSessionCookieOptions(ctx.req);

      ctx.res.cookie(COOKIE_NAME, sessionToken, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      });

      return {
        success: true,
        user: {
          username: adminRecord.username,
          email: adminRecord.email,
          role: "admin" as const,
        },
      };
    }),

  logout: publicProcedure.mutation(({ ctx }) => {
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    return { success: true };
  }),

  dashboardStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

    const allBookings = await db.select().from(bookings);
    const totalBookings = allBookings.length;

    const stats = {
      total: totalBookings,
      pending: allBookings.filter(b => b.status === "PENDING").length,
      confirmed: allBookings.filter(b => b.status === "CONFIRMED").length,
      completed: allBookings.filter(b => b.status === "COMPLETED").length,
      cancelled: allBookings.filter(b => b.status === "CANCELLED").length,
    };

    const totalReviews = (await db.select().from(reviews)).length;

    const recentBookings = await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt))
      .limit(5);

    return {
      stats,
      totalReviews,
      recentBookings,
    };
  }),

  bookings: router({
    list: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      return db.select().from(bookings).orderBy(desc(bookings.createdAt));
    }),

    updateStatus: adminProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

        await db
          .update(bookings)
          .set({ status: input.status, updatedAt: new Date() })
          .where(eq(bookings.id, input.id));

        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

        await db.delete(bookings).where(eq(bookings.id, input.id));
        return { success: true };
      }),
  }),

  content: router({
    get: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return {};

      const records = await db.select().from(siteContent);
      const contentMap: Record<string, string> = {};
      for (const record of records) {
        contentMap[record.key] = record.value;
      }
      return contentMap;
    }),

    update: adminProcedure
      .input(
        z.object({
          key: z.string().min(1),
          value: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

        await db
          .insert(siteContent)
          .values({
            key: input.key,
            value: input.value,
          })
          .onConflictDoUpdate({
            target: siteContent.key,
            set: {
              value: input.value,
              updatedAt: new Date(),
            },
          });

        return { success: true };
      }),
  }),

  media: router({
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(mediaFiles).orderBy(asc(mediaFiles.position), asc(mediaFiles.id));
    }),

    upload: adminProcedure
      .input(
        z.object({
          fileName: z.string(),
          fileBase64: z.string(),
          contentType: z.string(),
          category: z.string(),
          title: z.string().optional(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

        // Decode base64 file
        const base64Data = input.fileBase64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        // Upload using storage helper (uses Forge S3 or local fallback)
        const url = await uploadFile(input.fileName, buffer, input.contentType);

        // Get max position for the category to append correctly
        const existing = await db
          .select()
          .from(mediaFiles)
          .where(eq(mediaFiles.category, input.category))
          .orderBy(desc(mediaFiles.position))
          .limit(1);

        const nextPosition = existing.length > 0 ? existing[0].position + 1 : 0;

        await db.insert(mediaFiles).values({
          url,
          category: input.category,
          title: input.title || null,
          description: input.description || null,
          position: nextPosition,
        });

        return { success: true, url };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

        await db.delete(mediaFiles).where(eq(mediaFiles.id, input.id));
        return { success: true };
      }),

    reorder: adminProcedure
      .input(
        z.array(
          z.object({
            id: z.number(),
            position: z.number(),
          })
        )
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });

        for (const item of input) {
          await db
            .update(mediaFiles)
            .set({ position: item.position })
            .where(eq(mediaFiles.id, item.id));
        }

        return { success: true };
      }),
  }),
});
