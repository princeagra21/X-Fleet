#!/usr/bin/env node
const { spawnSync } = require('child_process');

const isWin = process.platform === 'win32';
const cmd = isWin ? 'npx.cmd' : 'npx';
const args = ['prisma', 'db', 'seed', '--schema=prisma/primary.prisma'];

const result = spawnSync(cmd, args, { stdio: 'inherit' });
process.exit(result.status ?? 1);
