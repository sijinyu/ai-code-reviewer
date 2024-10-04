├── app/                  #
│   ├── layout.tsx        # 전체 애플리케이션 레이아웃 설정
│   ├── page.tsx          # 메인 페이지 파일
│   └── api/              # Next.js API Routes (간단한 API 처리용)
│       └── lint/         # Lint와 관련된 API 처리
│           └── route.ts  # 코드 린팅 API 구현 파일
├── components/           # 재사용 가능한 UI 컴포넌트들
│   └── Editor.tsx        # Monaco Editor와 관련된 컴포넌트
├── public/               # 정적 파일 (이미지, 아이콘 등)
├── server/               # Express 서버 관련 파일
│   ├── server.ts         # Express 서버 진입 파일 (AI 모델 호출 기능 포함)
│   ├── routes/           # Express 라우트 관련 폴더
│   │   └── aiReview.ts   # AI 코드 리뷰와 관련된 라우트
│   └── middleware/       # 미들웨어 설정 폴더 (인증 등)
├── styles/               # 글로벌 스타일 및 Tailwind 설정
│   └── globals.css       # Tailwind 글로벌 스타일
├── utils/                # 공통 유틸리티 함수
│   └── apiHelper.ts      # API 요청을 처리하기 위한 헬퍼 함수
├── firebaseConfig.ts     # Firebase 초기 설정 파일
├── tailwind.config.js    # Tailwind 설정 파일
├── tsconfig.json         # TypeScript 설정 파일
├── next.config.js        # Next.js 설정 파일
└── package.json          # 프로젝트 종속성 관리 파일
