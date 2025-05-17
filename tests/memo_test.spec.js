const { test, expect } = require('@playwright/test');
const path = require('path');
const { client } = require('../compare_tools/ocr_utils');
const { compareImages } = require('../compare_tools/pixelmatch_utils');

const screenshotDir = path.resolve(__dirname, '../screenshots');
const beforeImg = path.join(screenshotDir, 'before.png');
const afterImg = path.join(screenshotDir, 'after.png');

test('TC: Naver 메모 - 글자 크기(아주 크게) 스타일 적용 검증', async ({ page }) => {
  await test.step('1️⃣ Naver 메모 페이지 진입', async () => {
    await page.goto('https://memo.naver.com/');
    await page.waitForLoadState('domcontentloaded');
  });

  await test.step('2️⃣ 메모 쓰기 버튼 클릭', async () => {
    const writeButton = page.locator('.btn_write');
    await expect(writeButton).toBeVisible();
    await writeButton.click();
    await page.waitForSelector('.workseditor-content');
    console.log('에디터 진입 성공');
  });

  let editor;
  await test.step('3️⃣ 텍스트 입력: "테스트 중입니다."', async () => {
    editor = page.locator('.workseditor-content');
    await editor.click();
    await editor.fill('테스트 중입니다.');
    await page.waitForTimeout(300);
  });

  await test.step('4️⃣ 스타일 적용 전 스크린샷 저장', async () => {
    await editor.screenshot({ path: beforeImg });
  });

  await test.step('5️⃣ Ctrl + A 전체 선택', async () => {
    await page.keyboard.down('Meta');
    await page.keyboard.press('A');
    await page.keyboard.up('Meta');
  });

  await test.step('6️⃣ 글자 크기 → "아주 크게" 선택', async () => {
    const fontSizeBtn = page.locator('button.font_size');
    await fontSizeBtn.click();
    const veryLarge = page.locator('button.btn_context_item.x_large');
    await expect(veryLarge).toBeVisible();
    await veryLarge.click();
    console.log('"아주 크게" 클릭 완료');
  });

  await test.step('7️⃣ 스타일 적용 후 스크린샷 저장', async () => {
    await editor.click();
    await page.waitForTimeout(500);
    await editor.screenshot({ path: afterImg });
  });

  await test.step('8️⃣ DOM 검사 - font-size: 32px', async () => {
    const appliedFontSize = await page.evaluate(() => {
      const span = document.querySelector('.workseditor-content span');
      return span ? getComputedStyle(span).fontSize : '없음';
    });
    expect(appliedFontSize).toBe('32px');
    console.log(`[DOM] font-size 확인: ${appliedFontSize}`);
  });

  await test.step('9️⃣ OCR로 텍스트 높이 및 내용 확인', async () => {
    const [ocrResult] = await client.textDetection(afterImg);
    const detections = ocrResult.textAnnotations;
  
    if (!detections || detections.length === 0) {
      throw new Error('OCR 실패: 텍스트 인식 결과 없음');
    }
  
    // ✅ 콘솔에 텍스트 전체 출력
    const fullText = detections[0].description;
    console.log('\n[OCR] 인식된 텍스트:\n' + fullText);
  
    // 🔍 특정 텍스트 기준 높이 계산
    const detected = detections.find(d => d.description.includes('테스트'));
    if (!detected) throw new Error('OCR 실패: "테스트" 텍스트 인식 안 됨');
  
    const box = detected.boundingPoly.vertices;
    const height = Math.abs(box[3].y - box[0].y);
    console.log(`OCR 인식 높이: ${height}px`);
    expect(height).toBeGreaterThanOrEqual(28);
    console.log('[OCR] 텍스트 높이 검증 통과');
  });

  await test.step('🔟 pixelmatch로 시각적 변화 확인', async () => {
    const diffPixels = await compareImages(beforeImg, afterImg);
    console.log(`pixelmatch 결과: ${diffPixels} pixels`);
    expect(diffPixels).toBeGreaterThan(100);
    console.log('[pixelmatch] 시각적 변화 검출 성공');
  });

  console.log('🎉 최종 결과: 모든 검증 항목 통과');
});
