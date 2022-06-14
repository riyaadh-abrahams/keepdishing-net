import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'http://localhost:5216/swagger/v1/swagger.json',
  apiFile: './src/store/api/baseApi.ts',
  apiImport: 'baseApi',
  outputFile: './src/store/api/api.ts',
  exportName: 'api',
  hooks: true,
}

export default config