import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies.js";
import { systemRouter } from "./_core/systemRouter.js";
import { publicProcedure, router } from "./_core/trpc.js";
import { z } from "zod";
import { createBooking, createContactSubmission, createReview, getApprovedReviews } from "./db.js";
import { notifyOwner } from "./_core/notification.js";
import { adminRouter } from "./routers/admin.js";

export const appRouter = router({
  system: systemRouter,
  admin: adminRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  bookings: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          phone: z.string().min(10, "Valid phone number required"),
          vehicleType: z.enum(["CAR", "SUV", "LUXURY", "TWO_WHEELER", "FLEET"]),
          vehicleModel: z.string().min(1, "Vehicle model is required"),
          preferredDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Valid date required"),
          preferredTime: z.string().optional(),
          notes: z.string().optional(),
          serviceSlug: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const bookingId = await createBooking(
          {
            name: input.name,
            phone: input.phone,
            vehicleType: input.vehicleType,
            vehicleModel: input.vehicleModel,
            preferredDate: new Date(input.preferredDate),
            preferredTime: input.preferredTime ? input.preferredTime : undefined,
            notes: input.notes,
            status: "PENDING",
          },
          input.serviceSlug ? [input.serviceSlug] : []
        );

        await notifyOwner({
          title: "New Service Booking",
          content: `New booking from ${input.name}. Phone: ${input.phone}. Vehicle: ${input.vehicleModel}. Date: ${input.preferredDate}`,
        });

        return { success: true, bookingId };
      }),
  }),

  contacts: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          phone: z.string().min(10, "Valid phone number required"),
          email: z.string().email("Valid email required"),
          subject: z.string().min(1, "Subject is required"),
          message: z.string().min(10, "Message must be at least 10 characters"),
        })
      )
      .mutation(async ({ input }) => {
        const contactId = await createContactSubmission({
          name: input.name,
          phone: input.phone,
          email: input.email,
          subject: input.subject,
          message: input.message,
          status: "NEW",
        });

        await notifyOwner({
          title: "New Contact Submission",
          content: `New message from ${input.name}. Email: ${input.email}. Subject: ${input.subject}`,
        });

        return { success: true, contactId };
      }),
  }),

  reviews: router({
    create: publicProcedure
      .input(
        z.object({
          customerName: z.string().min(1, "Name is required"),
          customerEmail: z.string().email("Valid email required"),
          rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
          title: z.string().min(1, "Title is required"),
          message: z.string().min(10, "Review must be at least 10 characters"),
          serviceType: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const reviewId = await createReview({
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          rating: input.rating,
          title: input.title,
          message: input.message,
          serviceType: input.serviceType,
          isApproved: 0,
        });

        await notifyOwner({
          title: "New Customer Review",
          content: `New review from ${input.customerName}. Rating: ${input.rating}/5. Title: ${input.title}`,
        });

        return { success: true, reviewId };
      }),
    list: publicProcedure.query(async () => {
      const reviews = await getApprovedReviews();
      return reviews;
    }),
  }),
});

export type AppRouter = typeof appRouter;
