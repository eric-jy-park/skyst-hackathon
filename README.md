# 🎸 Skyst Hackathon 프로젝트 문서

## 🚀 프로젝트 개요

**청춘무대**는 음악 밴드들의 공연 비디오를 공유하고 투표할 수 있는 플랫폼입니다. 이 플랫폼은 시즌제로 운영되며, 각 시즌은 **예선과 결승** 단계로 구성됩니다. 사용자들은 밴드들의 공연 영상을 감상하고, 투표하며 댓글을 통해 참여할 수 있습니다.

---

## 🛠 기술 스택

* **Backend**: TypeScript 기반 NestJS 프레임워크
* **Database**: PostgreSQL (ORM: TypeORM)
* **API 문서화**: Swagger
* **배포 환경**: Docker & Docker Compose

---

## 📐 시스템 아키텍처

### 🔗 핵심 엔티티

* **User**

  * 사용자 계정 관리
  * 투표 및 댓글 기능

* **Band**

  * 밴드 정보 (이름, 이미지, 소개)
  * 비디오 연결

* **Video**

  * 공연 영상 정보 (URL, 앨범 커버, 곡 설명)
  * 시즌 및 밴드와 연결
  * 투표 및 댓글 수집

* **Season**

  * 시즌 기간 설정
  * 예선/결승 단계 구분
  * 사용자 투표 제한 설정

* **Vote**

  * 사용자 투표 기록 및 선택적 코멘트

* **Comment**

  * 사용자 댓글 관리

---

## 💡 주요 기능

### 📅 시즌 관리

* 시즌 생성 및 관리
* 예선 및 결승 단계 확인
* 시즌별 투표 한도 관리

### 🎬 비디오 관리

* 예선 단계: 비디오 랜덤 노출
* 결승 단계: 투표 수 기반 정렬
* 시즌별, 밴드별 비디오 관리

### 🗳 사용자 투표 시스템

* 시즌별 사용자 투표 제한
* 투표 수 집계 및 관리
* 선택적 투표 코멘트 기능

### 💬 댓글 시스템

* 비디오에 댓글 작성 및 관리

---

## 🛠 설치 및 실행 방법

### 📋 사전 요구사항

* Node.js
* Docker & Docker Compose
* PostgreSQL

### 🚧 환경 설정

1. 저장소 복제 및 이동

```bash
git clone [저장소 URL]
cd skyst-hackathon
```

2. 환경 변수 설정
   `.env` 파일을 생성하고 다음 설정을 추가합니다.

```env
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=postgres
PORT=3000
```

3. 데이터베이스 컨테이너 실행

```bash
docker-compose up -d db
```

4. 애플리케이션 실행

```bash
npm install
npm run start:dev
```

5. API 문서 접근
   브라우저에서 [Swagger 문서](http://localhost:3000/api)로 접속합니다.

---

## 🌐 API 엔드포인트

주요 API 엔드포인트:

* `/users`: 사용자 관리
* `/bands`: 밴드 정보 관리
* `/videos`: 비디오 조회 및 관리
* `/seasons`: 시즌 관리
* `/votes`: 투표 관리
* `/comments`: 댓글 관리

자세한 API 스펙은 Swagger 문서(`/api`)에서 확인 가능합니다.

---

## 🗃️ 프로젝트 디렉토리 구조

```
src/
├── bands/            # 밴드 관리 모듈
├── comments/         # 댓글 관리 모듈
├── common/           # 공통 기능 및 유틸리티
├── seasons/          # 시즌 관리 모듈
├── users/            # 사용자 관리 모듈
├── videos/           # 비디오 관리 모듈
├── votes/            # 투표 관리 모듈
├── app.module.ts     # 애플리케이션 메인 모듈
└── main.ts           # 애플리케이션 진입점
```

---
