import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('aiOutput', {
    id: serial('id').primaryKey(),
    formData: varchar('formData').notNull(),
    aiResponse: text('aiResponse'),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    templateSlug: varchar('templateSlug').notNull(),
})