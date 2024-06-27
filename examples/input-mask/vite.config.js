import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                imask: resolve(__dirname, 'imask/index.html'),
                maskito: resolve(__dirname, 'maskito/index.html'),
            },
        },
    },
})