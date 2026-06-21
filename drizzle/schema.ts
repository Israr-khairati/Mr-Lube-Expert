import { pgTable, text, timestamp, varchar, date, time, serial, integer, pgEnum } from "drizzle-orm/pg-core";

/**
 * Enums for PostgreSQL.
 */
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const vehicleTypeEnum = pgEnum("vehicleType", ["CAR", "SUV", "LUXURY", "TWO_WHEELER", "FLEET"]);
export const bookingStatusEnum = pgEnum("bookingStatus", ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]);
export const contactStatusEnum = pgEnum("contactStatus", ["NEW", "CONTACTED", "CLOSED"]);

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  vehicleType: vehicleTypeEnum("vehicleType").notNull(),
  vehicleModel: varchar("vehicleModel", { length: 255 }).notNull(),
  preferredDate: date("preferredDate", { mode: "date" }).notNull(),
  preferredTime: time("preferredTime"),
  notes: text("notes"),
  status: bookingStatusEnum("status").default("PENDING").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

export const bookingServices = pgTable("bookingServices", {
  id: serial("id").primaryKey(),
  bookingId: integer("bookingId").notNull(),
  serviceSlug: varchar("serviceSlug", { length: 255 }).notNull(),
});

export type BookingService = typeof bookingServices.$inferSelect;
export type InsertBookingService = typeof bookingServices.$inferInsert;

export const contactSubmissions = pgTable("contactSubmissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: contactStatusEnum("status").default("NEW").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  serviceType: varchar("serviceType", { length: 255 }),
  isApproved: integer("isApproved").default(0).notNull(), // 0 = pending, 1 = approved
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;
