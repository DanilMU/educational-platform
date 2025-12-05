import { defineConfig } from 'orval'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
    client: {
        input: './openapi.local.json',
        output: {
            target: './src/api/client.ts',
            schemas: './src/api/types',
            client: 'axios',
            override: {
                mutator: {
                    path: './src/api/axios-instance-wrapper.ts',
                    name: 'customInstance'
                }
            }
        }
    }
})
