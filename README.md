# 🔍 UI 시각 기반 테스트 자동화 (Playwright + Google OCR + pixelmatch)

본 프로젝트는 DOM 검사만으로는 부족한 UI 테스트 정확도를 향상시키기 위해  
**Playwright**, **Google Cloud Vision OCR**, **pixelmatch**를 활용하여  
실제 사용자 눈에 보이는 시각적 변화를 자동화 테스트로 검증하는 구조입니다.

---

## 참고 사이트

https://velog.io/@jongmin9172/QA-단순-DOM-자동화에서-시각적-인식-자동화로-Pixelmatch와-Google-OCR-활용기

---

## 📁 폴더 구조
project-root/
├── tests/
│ └── tc_text_size_check.spec.js # 메인 테스트 스크립트
│
├── compare_tools/
│ ├── ocr_utils.js # Google Vision OCR 유틸
│ └── pixelmatch_utils.js # 이미지 비교 및 diff 생성 유틸
│
├── screenshots/
│ ├── before.png # 스타일 변경 전 캡처 이미지
│ ├── after.png # 스타일 변경 후 캡처 이미지
│ └── diff.png # pixelmatch 결과 diff 이미지
└── playwright.config.js # Playwright 설정 (선택)


---

## ✅ 핵심 기능

- [x] **Playwright 기반 UI 자동화 테스트**
- [x] 텍스트 입력 후 스타일(글자 크기) 변경 테스트
- [x] DOM 기반 style 속성 확인 (`font-size: 32px`)
- [x] **pixelmatch로 시각적 변화 감지**
- [x] **Google OCR로 텍스트 내용 및 높이 수치 검증**
- [x] OCR 결과 콘솔 출력 (실제 인식된 텍스트 확인)

---

## 🔧 사용 기술 스택

- Node.js + Playwright
- Google Cloud Vision API (OCR)
- pixelmatch + pngjs

---

## 🚀 실행 방법

1. 필요한 라이브러리 설치
   ```bash
   npm install

2. Google API 키 준비 (vision-api-user.json)

3. 테스트 실행 (npx playwright test tests/tc_text_size_check.spec.js)

📌 기타 참고

Google Vision API를 사용하기 위해선 GCP 프로젝트와 청구 설정이 필요합니다.
google-api-key.json 파일은 절대 공개 저장소에 업로드하지 마세요.

✍️ 작성자

김종민 (Jongmin Kim)
Test Automation & QA Engineer
