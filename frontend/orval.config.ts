import { defineConfig } from 'orval'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
    client: {
        input: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/openapi.json`,
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
