import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'twav4yff',
    dataset: 'production',
  },
  studioHost: 'bytefest',
  autoUpdates: true,
})
