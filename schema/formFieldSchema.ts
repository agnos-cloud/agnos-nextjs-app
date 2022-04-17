const htmlInputTypes = [
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "text",
  "time",
  "url",
  "week",
];

export const formFieldSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    title: { type: "string" },
    default: {
      anyOf: [
        {
          type: "string",
        },
        {
          type: "number",
        },
        {
          type: "integer",
        },
        {
          type: "boolean",
        },
        // {
        //   type: "object",
        // },
        // {
        //   type: "array",
        // },
        // {
        //   type: "null",
        // },
      ],
    },
    required: { type: "boolean" },
    type: { type: "string", enum: htmlInputTypes },
  },
  required: ["name", "title"],
};
