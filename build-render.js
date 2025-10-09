#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Render deployment build...');

// Set production environment
process.env.NODE_ENV = 'production';
process.env.SKIP_ENV_VALIDATION = 'true';
process.env.DISABLE_ESLINT_PLUGIN = 'true';

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci --production=false', { stdio: 'inherit' });
  
  // Generate Prisma client with explicit runtime
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate --generator-provider=node-api', { stdio: 'inherit' });
  
  // Build the application with error handling
  console.log('🏗️ Building application...');
  execSync('npx next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: '1',
    },
  });
  
  console.log('✅ Build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}