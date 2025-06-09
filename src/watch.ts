import watch from 'node-watch';
import { spawn } from 'child_process';

let app: any;

function startApp() {
  if (app) app.kill();
  app = spawn('ts-node', ['src/index.ts'], { stdio: 'inherit', shell: true });
}

watch('src', { recursive: true, filter: /\.ts$/ }, () => {
  console.log('🔁 Code changed. Restarting...');
  startApp();
});

startApp();
