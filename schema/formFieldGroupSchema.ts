import { formFieldSchema } from "./formFieldSchema";

export const formFieldGroupSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    fields: {
      type: "array",
      items: formFieldSchema,
    },
  },
  required: ["fields", "title"],
};
