# Firebase 설정 가이드

서버가 Firebase 프로젝트와 통신할 수 있도록 하려면 관리자(Admin) 자격 증명을 제공해야 합니다.

## 1단계: 서비스 계정 키 생성

1. [Firebase 콘솔](https://console.firebase.google.com/)로 이동합니다.
2. 프로젝트를 선택합니다.
3. **프로젝트 설정** (톱니바퀴 아이콘) > **서비스 계정** 탭으로 이동합니다.
4. **새 비공개 키 생성**을 클릭합니다.
5. 자격 증명이 포함된 JSON 파일이 다운로드됩니다.

## 2단계: 서버 설정

### 옵션 A: 환경 변수 사용 (권장)

1. 다운로드한 JSON 파일을 컴퓨터의 안전한 경로에 저장합니다.
2. `GOOGLE_APPLICATION_CREDENTIALS` 환경 변수를 해당 파일의 절대 경로로 설정합니다.

**Mac/Linux:**

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/Users/사용자이름/경로/serviceAccountKey.json"
npm run start:dev
```

### 옵션 B: 프로젝트 루트에 위치 (개발용)

1. 다운로드한 파일의 이름을 `serviceAccountKey.json`으로 변경합니다.
2. 이 파일을 `apps/server` 디렉토리로 이동시킵니다.
   - _참고: `serviceAccountKey.json`은 `.gitignore`에 추가되어 있으므로 실수로 커밋될 위험이 없습니다._
3. 환경 변수가 이 파일을 가리키도록 설정합니다:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="./serviceAccountKey.json"
   ```

## 3단계: 확인

서버를 재시작합니다 (`npm run dev:server` 또는 `npm run start:dev`). 로그에 "Firebase Module Initialized"가 표시되고 에러가 없다면 설정이 성공적으로 완료된 것입니다.
