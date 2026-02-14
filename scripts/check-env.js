const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

console.log(`${colors.cyan}Checking Firebase Environment Configuration...${colors.reset}\n`);

const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

// Check .env.local file existence
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log(`${colors.yellow}Warning: .env.local file not found!${colors.reset}`);
  console.log('Ensure you have environment variables set in your system or create a .env.local file.\n');
} else {
  console.log(`${colors.green}Found .env.local file.${colors.reset}\n`);
}

// Load env vars (simple parser for this script)
// Note: In a real Next.js app, these are loaded automatically. 
// This script simulates checking the values that would be available.
require('dotenv').config({ path: '.env.local' });

let missingCount = 0;

requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    console.log(`${colors.red}MISSING: ${varName}${colors.reset}`);
    missingCount++;
  } else {
    // Check if value is a placeholder
    if (process.env[varName].includes('your-')) {
        console.log(`${colors.yellow}WARNING: ${varName} appears to be a placeholder value: ${process.env[varName]}${colors.reset}`);
    } else {
        console.log(`${colors.green}OK: ${varName}${colors.reset}`);
    }
  }
});

console.log('\n--- Summary ---');
if (missingCount === 0) {
  console.log(`${colors.green}All required Firebase environment variables are set!${colors.reset}`);
  console.log('If you are still experiencing issues, check that the values match your Firebase Console project settings.');
} else {
  console.error(`${colors.red}Found ${missingCount} missing environment variables.${colors.reset}`);
  console.log('Please add these to your .env.local file or deployment settings.');
  process.exit(1);
}
