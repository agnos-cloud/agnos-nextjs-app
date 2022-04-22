export const testDataSchema = {
  uri: "http://agnos.cloud/schema/test-data.json",
  fileMatch: ["*"],
  schema: {
    type: "object",
    properties: {
      form: {
        type: "object",
        additionalProperties: true,
      },
    },
    required: ["form"],
  },
};
