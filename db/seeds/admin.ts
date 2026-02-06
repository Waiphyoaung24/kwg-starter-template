import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "../schema";
import { user } from "../schema";

const ADMIN_EMAIL = "nexuslab.dev.mm@gmail.com";
// Note: In a real app, you would hash this. Better Auth handles hashing.
// Since we're seeding for Better Auth, we need to provide a password
// that it can verify. Better Auth uses bcrypt by default.
// However, since we are seeding directly into the database, we might need
// to use Better Auth's API to create the user to ensure hashing is correct,
// or use a pre-hashed password.
// For simplicity in this template, we'll just seed the user record.
// Better Auth will need the user to "sign up" or "reset password" if
// we don't seed the password correctly.

export async function seedAdmin(db: PostgresJsDatabase<typeof schema>) {
  console.log("Seeding admin user...");

  const [adminUser] = await db
    .insert(user)
    .values({
      name: "Nexus Admin",
      email: ADMIN_EMAIL,
      emailVerified: true,
    })
    .onConflictDoNothing()
    .returning();

  if (adminUser) {
    // Better Auth stores passwords in the 'identity' table (renamed from 'account')
    // when using email/password.
    // Provider ID for email/password is 'credential'
    // This is just a placeholder - real seeding of passwords should be done via Auth API
    // or with a properly hashed bcrypt string.
    console.log(`✅ Seeded admin user: ${ADMIN_EMAIL}`);
  }
}
