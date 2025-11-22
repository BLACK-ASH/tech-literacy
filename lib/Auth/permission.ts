import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/admin/access";

// ✅ 1. Merge your custom statements safely
const statements = {
  ...defaultStatements,
  event: ["create", "update", "delete", "share"],
} as const;

// ✅ 2. Initialize access control
export const ac = createAccessControl(statements);

// ✅ 3. Define roles using `ac.newRole`
export const admin = ac.newRole({
  event: ["create", "update", "delete", "share"],
});

export const editor = ac.newRole({
  event: ["create", "update"],
});

export const user = ac.newRole({
  event: ["create"],
});
