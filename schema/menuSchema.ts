import { menuItemSchema } from "./menuItemSchema";

export const menuSchema = (runFunctions: Array<string>) => ({
  type: "object",
  properties: {
    title: { type: "string" },
    items: {
      type: "array",
      items: menuItemSchema(runFunctions),
    },
  },
  required: ["title", "items"],
});
