import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@tailus-ui': '/src/tailus-ui',
			'@utils': '/src/utils',
		},
	},
	plugins: [react()],
});
