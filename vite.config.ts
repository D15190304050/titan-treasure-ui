import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    // Load environment configurations and set it as proxy target.
    const env: Record<string, string> = loadEnv(mode, "./env");

    return {
        envDir: "./env",
        plugins: [react()],
        resolve: {
            alias: {
                // 在这里配置别名
                '@': resolve(process.cwd(), 'src'),
            },
        },
        server: {
            host: '127.0.0.1',
            port: 3710,
            open: true,
            cors: true,
            proxy:
                {
                    "/api":
                        {
                            target: env.VITE_API_URL || 'http://localhost:8080',
                            changeOrigin: true,
                            rewrite: (path) => path.replace(/^\/api/, "")
                        }
                }
        }
    }
})