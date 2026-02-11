import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { menuItem, menuMapping } from "@repo/db";
import { router, protectedProcedure } from "../lib/trpc.js";

export const menuRouter = router({
  // List all menu items for the current organization
  listItems: protectedProcedure
    .input(z.object({ branchId: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const orgId = ctx.session?.activeOrganizationId;
      if (!orgId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No organization selected",
        });
      }

      const conditions = [eq(menuItem.organizationId, orgId)];
      if (input?.branchId) {
        conditions.push(eq(menuItem.branchId, input.branchId));
      }

      return ctx.db
        .select()
        .from(menuItem)
        .where(and(...conditions))
        .orderBy(menuItem.sortOrder, menuItem.name);
    }),

  // Get a single menu item by ID
  getItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const orgId = ctx.session?.activeOrganizationId;
      if (!orgId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No organization selected",
        });
      }

      const result = await ctx.db
        .select()
        .from(menuItem)
        .where(
          and(eq(menuItem.id, input.id), eq(menuItem.organizationId, orgId)),
        )
        .limit(1);

      if (!result[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Menu item not found",
        });
      }

      return result[0];
    }),

  // Create a new menu item
  createItem: protectedProcedure
    .input(
      z.object({
        sku: z.string().min(1),
        name: z.string().min(1),
        nameTh: z.string().optional(),
        description: z.string().optional(),
        price: z.string(), // numeric is returned as string
        category: z.string().optional(),
        isAvailable: z.boolean().default(true),
        sortOrder: z.number().default(0),
        branchId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const orgId = ctx.session?.activeOrganizationId;
      if (!orgId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No organization selected",
        });
      }

      const [newItem] = await ctx.db
        .insert(menuItem)
        .values({
          organizationId: orgId,
          branchId: input.branchId,
          sku: input.sku,
          name: input.name,
          nameTh: input.nameTh,
          description: input.description,
          price: input.price,
          category: input.category,
          isAvailable: input.isAvailable,
          sortOrder: input.sortOrder,
        })
        .returning();

      return newItem;
    }),

  // Update a menu item
  updateItem: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        sku: z.string().min(1).optional(),
        name: z.string().min(1).optional(),
        nameTh: z.string().optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        category: z.string().optional(),
        isAvailable: z.boolean().optional(),
        sortOrder: z.number().optional(),
        branchId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const orgId = ctx.session?.activeOrganizationId;
      if (!orgId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No organization selected",
        });
      }

      const [updated] = await ctx.db
        .update(menuItem)
        .set({
          sku: input.sku,
          name: input.name,
          nameTh: input.nameTh,
          description: input.description,
          price: input.price,
          category: input.category,
          isAvailable: input.isAvailable,
          sortOrder: input.sortOrder,
          branchId: input.branchId,
        })
        .where(
          and(eq(menuItem.id, input.id), eq(menuItem.organizationId, orgId)),
        )
        .returning();

      if (!updated) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Menu item not found",
        });
      }

      return updated;
    }),

  // Delete a menu item
  deleteItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const orgId = ctx.session?.activeOrganizationId;
      if (!orgId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No organization selected",
        });
      }

      const [deleted] = await ctx.db
        .delete(menuItem)
        .where(
          and(eq(menuItem.id, input.id), eq(menuItem.organizationId, orgId)),
        )
        .returning();

      if (!deleted) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Menu item not found",
        });
      }

      return deleted;
    }),

  // List all mappings for the current organization
  listMappings: protectedProcedure
    .input(z.object({ menuItemId: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const orgId = ctx.session?.activeOrganizationId;
      if (!orgId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No organization selected",
        });
      }

      const conditions = [eq(menuMapping.organizationId, orgId)];
      if (input?.menuItemId) {
        conditions.push(eq(menuMapping.menuItemId, input.menuItemId));
      }

      return ctx.db
        .select()
        .from(menuMapping)
        .where(and(...conditions));
    }),

  // Create or update a mapping
  upsertMapping: protectedProcedure
    .input(
      z.object({
        menuItemId: z.string(),
        platform: z.enum(["grab", "wongnai", "lineman"]),
        externalId: z.string(),
        externalName: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const orgId = ctx.session?.activeOrganizationId;
      if (!orgId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No organization selected",
        });
      }

      // Check if item exists and belongs to org
      const item = await ctx.db
        .select()
        .from(menuItem)
        .where(
          and(
            eq(menuItem.id, input.menuItemId),
            eq(menuItem.organizationId, orgId),
          ),
        )
        .limit(1);

      if (!item[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Menu item not found",
        });
      }

      const [upserted] = await ctx.db
        .insert(menuMapping)
        .values({
          organizationId: orgId,
          menuItemId: input.menuItemId,
          platform: input.platform,
          externalId: input.externalId,
          externalName: input.externalName,
        })
        .onConflictDoUpdate({
          target: [menuMapping.menuItemId, menuMapping.platform],
          set: {
            externalId: input.externalId,
            externalName: input.externalName,
            updatedAt: new Date(),
          },
        })
        .returning();

      return upserted;
    }),

  // Delete a mapping
  deleteMapping: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const orgId = ctx.session?.activeOrganizationId;
      if (!orgId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No organization selected",
        });
      }

      const [deleted] = await ctx.db
        .delete(menuMapping)
        .where(
          and(
            eq(menuMapping.id, input.id),
            eq(menuMapping.organizationId, orgId),
          ),
        )
        .returning();

      if (!deleted) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Mapping not found",
        });
      }

      return deleted;
    }),
});
