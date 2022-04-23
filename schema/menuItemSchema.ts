import { formSchema } from "./formSchema";

export const menuItemSchema = (runFunctions: Array<string>) => ({
  type: "object",
  properties: {
    title: { type: "string" },
    isDivider: { type: "boolean" },
    image: {
      type: "object",
      properties: {
        src: { type: "string" },
      },
      required: ["src"],
    },
    paths: {
      type: "array",
      items: {
        type: "object",
        properties: {
          d: { type: "string" },
          fill: { type: "string" },
          stroke: { type: "string" },
          style: { type: "string" },
          transform: { type: "string" },
        },
        required: ["d"],
      },
    },
    secrets: {
      type: "object",
      additionalProperties: true,
    },
    forms: {
      type: "array",
      items: formSchema(runFunctions),
    },
  },
  required: ["title"],
});
