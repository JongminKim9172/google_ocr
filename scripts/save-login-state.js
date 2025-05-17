// scripts/save-login-state.js
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://memo.naver.com/');
  // ✨ 직접 로그인 (수동 입력)
  console.log('🔐 로그인 후 수동으로 완료되면 Enter를 누르세요...');
  await page.pause();

  // 💾 저장
  const storagePath = path.resolve(__dirname, '../auth/storageState.json');
  await context.storageState({ path: storagePath });
  console.log('✅ storageState.json 저장 완료');

  await browser.close();
})();
