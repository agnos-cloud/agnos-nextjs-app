import { formFieldGroupSchema } from "./formFieldGroupSchema";
import { formFieldSchema } from "./formFieldSchema";

export const formSchema = (runFunctions: Array<string>) => ({
  type: "object",
  properties: {
    title: { type: "string" },
    disableNavigation: { type: "boolean" },
    actions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          run: { type: "string", enum: runFunctions },
          transform: { type: "string", enum: runFunctions },
        },
        required: ["title", "run"],
      },
    },
    fields: {
      type: "array",
      items: {
        oneOf: [formFieldSchema, formFieldGroupSchema],
      },
    },
  },
  required: ["title"],
});
