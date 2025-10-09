#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Render deployment build...');

// Set production environment
process.env.NODE_ENV = 'production';

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });
  
  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Build the application
  console.log('🏗️ Building application...');
  execSync('npx next build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}