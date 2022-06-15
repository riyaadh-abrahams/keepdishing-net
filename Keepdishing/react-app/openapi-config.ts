import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "http://localhost:5216/swagger/v1/swagger.json",
  apiFile: "./store/api/baseApi.ts",
  apiImport: "baseApi",
  outputFile: "./store/api/generatedApi.ts",
  exportName: "generatedApi",
  hooks: true,
};

export default config;
