import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { projectId, dataset } from './env'

export default defineConfig({
  basePath: '/studio',
  name: 'zeta_studio',
  title: 'Zeta Digital — Content Studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool()],
})
