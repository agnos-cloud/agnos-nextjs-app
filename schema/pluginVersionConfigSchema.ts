import { menuSchema } from "./menuSchema";

export const pluginVersionSchema = (runFunctions: Array<string>) => ({
  uri: "http://agnos.cloud/schema/plugin-version.json",
  fileMatch: ["*"],
  schema: {
    type: "object",
    properties: {
      menus: {
        type: "array",
        items: menuSchema(runFunctions),
      },
    },
  },
});
