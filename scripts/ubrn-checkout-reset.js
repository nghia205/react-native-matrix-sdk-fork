const { existsSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');

const rustModuleDir = join(process.cwd(), 'rust_modules', 'matrix-rust-sdk');

if (!existsSync(rustModuleDir)) {
  process.exit(0);
}

const result = spawnSync(
  'git',
  ['-C', rustModuleDir, 'reset', '--hard', 'HEAD'],
  {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  }
);

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status === null ? 1 : result.status);
