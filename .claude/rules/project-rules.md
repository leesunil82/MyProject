# 프로젝트 규칙 및 가이드

## 프로젝트 개요
- **프로젝트명**: my-profile-site
- **유형**: 포트폴리오 웹사이트 (풀스택 개발자)
- **버전**: 1.0.0

## 기술 스택

### 빌드 및 개발
- **번들러**: Vite 5.0.8
- **개발 서버 포트**: 5173
- **모듈 시스템**: ES Module (type: "module")
- **배포 플랫폼**: Vercel

### 스타일링
- **CSS 프레임워크**: Tailwind CSS 3.4.1
- **CSS 전처리기**: PostCSS 8.4.32
- **자동 접두사**: Autoprefixer 10.4.16
- **다크 모드**: `class` 기반 (tailwind.config.js에서 `darkMode: 'class'`)

### 폰트
- **메인 폰트**: Montserrat (Google Fonts)
- **가중치**: 400, 500, 600, 700, 800, 900
- **설정**: `font-montserrat` 클래스로 사용

### 언어 및 지역화
- **HTML 언어**: 한국어 (`lang="ko"`)
- **기본 언어**: 한국어

## 디자인 시스템

### 색상 팔레트
```
배경색 (Dark Theme):
- Main Background: #101010
- Card Background: -
- Text Light: #EEEEEE
- Border: #393E46

Accent Color:
- Primary: #00ADB5 (시안/터콰이즈)
```

### 반응형 브레이크포인트
- **모바일**: 기본 (< md)
- **데스크톱**: `md` (768px 이상)
- 네비게이션은 `hidden md:flex` 또는 `md:hidden` 활용

### 레이아웃
- **최대 너비**: `max-w-6xl` (1152px)
- **패딩**: `px-6`
- **스무스 스크롤**: `scroll-smooth` (html 요소에 적용)

## JavaScript 아키텍처

### Class-Based 구조
모든 JavaScript 기능은 클래스로 구현되어 있습니다:

1. **ScrollProgressBar**
   - 스크롤 진행도를 상단 바로 표시
   - DOM 요소: `#scrollBar`
   - 이벤트: `scroll`

2. **ScrollReveal**
   - Intersection Observer를 사용한 스크롤 애니메이션
   - 대상 요소: `.reveal` 클래스
   - 임계값: `threshold: 0.1`, `rootMargin: '0px 0px -50px 0px'`
   - 활성화 클래스: `.active`

3. **ParallaxHandler**
   - 시차 스크롤 효과
   - 대상 요소: `#parallaxEmoji`
   - 변환: `translateY(scrollY * 0.3)` (느린 스크롤)

4. **MobileMenuManager**
   - 모바일 메뉴 토글
   - 토글 버튼: `#mobileMenuBtn`
   - 메뉴 요소: `#mobileMenu`
   - 상호작용: 버튼 클릭 또는 링크 클릭 시 닫기
   - 토글 클래스: `hidden`

5. **SmoothScrollHandler**
   - 앵커 링크(#)를 통한 부드러운 스크롤
   - 선택자: `a[href^="#"]`
   - 동작: `scrollIntoView({ behavior: 'smooth' })`

6. **updateYear()**
   - 푸터 연도 자동 업데이트
   - 대상 요소: `#year`

### 초기화 순서
모든 클래스와 함수는 `DOMContentLoaded` 이벤트에서 초기화됩니다:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  new ScrollProgressBar();
  new ScrollReveal();
  new ParallaxHandler();
  new MobileMenuManager();
  new SmoothScrollHandler();
  updateYear();
});
```

### Hot Module Replacement
개발 중 HMR 지원:
```javascript
if (import.meta.hot) {
  import.meta.hot.accept();
}
```

## HTML 구조

### 필수 DOM 요소
- `#scrollBar`: 스크롤 진행도 표시 바
- `#mobileMenuBtn`: 모바일 메뉴 버튼
- `#mobileMenu`: 모바일 메뉴 컨테이너
- `#parallaxEmoji`: 시차 효과를 받을 이모지 요소
- `#year`: 푸터 연도 표시 요소
- `.reveal`: 스크롤 애니메이션을 적용할 요소들
- `a[href^="#"]`: 부드러운 스크롤이 필요한 앵커 링크

### 페이지 섹션
- `#page1`: Home
- `#page2`: Skills
- `#page3`: Career
- `#page4`: Projects
- `#page5`: Contact

## 빌드 및 배포

### 빌드 명령어
```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 파일 미리보기
npm run preview
```

### Vercel 배포 설정
- **빌드 명령어**: `npm run build`
- **출력 디렉토리**: `dist`
- **프레임워크**: Vite
- **설정 파일**: `vercel.json`

## 스타일 파일

### CSS 파일 위치
- **메인 스타일**: `/src/style.css`
- **Tailwind 설정**: `tailwind.config.js`
- **PostCSS 설정**: `postcss.config.js`

### CSS 클래스 관례
- Tailwind 유틸리티 클래스 사용
- 인라인 스타일은 필요한 경우에만 사용
- 다크 모드 클래스: `dark:` 프리픽스

## 개발 규칙

### 코드 스타일
1. **JavaScript**
   - ES6+ 모듈 구문 사용
   - Class-based 구조 유지
   - 요소 선택은 ID 또는 class 선택자 사용

2. **HTML**
   - 의미론적 HTML5 마크업
   - 한국어 컨텐츠
   - 반응형 클래스 활용 (md 브레이크포인트)

3. **CSS**
   - Tailwind CSS 유틸리티 클래스 우선
   - 필요시 `src/style.css`에 커스텀 스타일 추가
   - 다크 테마 유지

### 새로운 기능 추가 시
1. 필요한 HTML 요소 추가 (적절한 ID 또는 class)
2. `src/main.js`에 새로운 클래스 또는 함수 작성
3. `DOMContentLoaded` 이벤트에 초기화 코드 추가
4. 필요시 `src/style.css`에 스타일 추가

### 반응형 디자인
- 기본: 모바일 우선
- `md:` 프리픽스: 768px 이상에서의 스타일
- 모바일 메뉴 토글을 위해 `hidden md:flex` / `md:hidden` 사용

## Git 규칙
- **커밋 메시지**: 영어 사용
- **주요 브랜치**: `main`
- **최근 커밋**:
  - `fb1c5e4`: Add Vercel configuration
  - `a03c1d1`: Initial commit: Add portfolio site

## 파일 구조
```
my-profile-site/
├── src/
│   ├── main.js           # 메인 JavaScript 로직
│   └── style.css         # 커스텀 CSS
├── index.html            # HTML 메인 파일
├── package.json          # 프로젝트 설정
├── package-lock.json     # 의존성 잠금 파일
├── vite.config.js        # Vite 설정
├── tailwind.config.js    # Tailwind CSS 설정
├── postcss.config.js     # PostCSS 설정
├── vercel.json           # Vercel 배포 설정
├── .gitignore            # Git 무시 파일
└── node_modules/         # 의존성 (커밋 제외)
```

## 접근성 및 성능

### 성능 최적화
- Intersection Observer 사용 (ScrollReveal)
- 이벤트 리스너 활용
- 부드러운 스크롤 애니메이션

### 브라우저 호환성
- 최신 브라우저 대응
- Intersection Observer API 지원 필수
- CSS Grid/Flexbox 지원

## 메타 정보
- **프로젝트 설명**: 이선일 - 풀스택 개발자 포트폴리오
- **파비콘**: 로켓 이모지 (🚀)
- **라이선스**: Private

---

*최종 업데이트: 2026-04-11*
