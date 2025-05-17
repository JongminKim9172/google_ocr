# 0. Getting Started (시작하기)
[참고 페이지] https://velog.io/@jongmin9172/QA-단순-DOM-자동화에서-시각적-인식-자동화로-Pixelmatch와-Google-OCR-활용기

<br/>
<br/>

# 1. Project Overview (프로젝트 개요)
- 프로젝트 이름: UI 시각 기반 테스트 자동화 (Playwright + Google OCR + pixelmatch)

<br/>
<br/>

# 2. Project Structure (프로젝트 구조)

```plaintext
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
│
└── playwright.config.js # Playwright 설정 (선택)
```

<br/>
<br/>

# 3. 기술 스택
- Node.js + Playwright
- Google Cloud Vision API (OCR)
- pixelmatch + pngjs

<br/>
<br/>

# 4. 기타 참고

Google Vision API를 사용하기 위해선 GCP 프로젝트와 청구 설정이 필요합니다. <br>
google-api-key.json 파일은 절대 공개 저장소에 업로드하지 마세요.
