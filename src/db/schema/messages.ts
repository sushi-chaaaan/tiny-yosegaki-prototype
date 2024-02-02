import { users } from "@/db/schema/users"
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

export const messages = pgTable(
  "messages",
  {
    attachmentFileName: text("attachment_file_name"),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    id: uuid("id").defaultRandom().primaryKey(),
    isAccepted: boolean("is_accepted").notNull().default(false),
    updatedAt: timestamp("updated_at").defaultNow(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
  },
  (table) => {
    return {
      userIdx: index("user_id_idx").on(table.userId),
    }
  },
)
