# BusinessCanvas_Assignment

비즈니스 캔버스 FE 인턴 과제 - 최익

## 개발 환경

- 코어 : `React`, `TypeScript`
- 상태 관리: `ContextAPI`
- 스타일링: `TailwindCSS`
- 포맷팅: `ESLint`, `Prettier`
- 패키지 매니저: `pnpm`
- 번들러: `vite`
- 그 외: `antd`, `dayjs`, `lucide-react`

## 프로젝트 구조

```
📦src
┣ 📂assets
┃ ┗ 📜react.svg
┣ 📂components // 공통 컴포넌트를 조합한 컴포넌트 + 특정 페이지에 의존한 컴포넌트
┃ ┣ 📂FilterBar // 테이블 상단 필터링 기능을 지원하는 레코드 헤더
┃ ┃ ┣ 📜FilterItem.tsx
┃ ┃ ┣ 📜FilterMenu.tsx
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂Record // 여러 field를 나타내며 수정/삭제가 가능한 레코드
┃ ┃ ┣ 📜EditableField.tsx
┃ ┃ ┣ 📜RecordMenu.tsx
┃ ┃ ┗ 📜index.tsx
┃ ┗ 📂RecordForm // 데이터 등록 폼(모달)
┃ ┃ ┣ 📜FormFiled.tsx
┃ ┃ ┗ 📜index.tsx
┣ 📂constants // 중복해서 쓰이는 상수
┃ ┣ 📜field.ts
┃ ┣ 📜record.ts
┃ ┗ 📜storageKey.ts
┣ 📂hooks
┃ ┣ 📂context // Context API 가드 훅
┃ ┃ ┣ 📜useModalContext.ts
┃ ┃ ┗ 📜useSelectContext.ts
┃ ┣ 📜useArrayStorage.tsx // useStorage의 배열 연산을 지원하는 헬퍼
┃ ┣ 📜useCallbackRef.tsx // 최신 콜백 함수를 안정적으로 참조하는 함수 반환하는 훅(+ 불필요한 재렌더링 방지)
┃ ┣ 📜useControllableState.tsx // 상위에서 제어/비제어를 핸들링 할 수 있도록 지원하는 훅
┃ ┗ 📜useStorage.tsx // 스토리지 핸들러 훅
┣ 📂types
┃ ┣ 📜field.ts
┃ ┣ 📜record.ts
┃ ┗ 📜storage.ts
┣ 📂ui // 서비스 전반적으로 공통으로 쓰이는 작은 단위의 컴포넌트 모음
┃ ┣ 📂Modal
┃ ┃ ┣ 📜Close.tsx
┃ ┃ ┣ 📜Content.tsx
┃ ┃ ┣ 📜Footer.tsx
┃ ┃ ┣ 📜Header.tsx
┃ ┃ ┣ 📜Overlay.tsx
┃ ┃ ┣ 📜Protal.tsx
┃ ┃ ┣ 📜Store.tsx
┃ ┃ ┣ 📜Trigger.tsx
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📂Select
┃ ┃ ┣ 📜Content.tsx
┃ ┃ ┣ 📜Item.tsx
┃ ┃ ┣ 📜Store.tsx
┃ ┃ ┣ 📜Trigger.tsx
┃ ┃ ┗ 📜index.tsx
┃ ┣ 📜Button.tsx
┃ ┣ 📜CheckBox.tsx
┃ ┣ 📜Icon.tsx
┃ ┣ 📜Input.tsx
┃ ┣ 📜Label.tsx
┃ ┗ 📜Textarea.tsx
┣ 📂utils // 두 군데 이상에서 쓰이는 유틸 함수 모음
┃ ┣ 📜arrayStorage.ts
┃ ┣ 📜fieldMapping.ts
┃ ┣ 📜storage.ts
┃ ┗ 📜tailwind.ts
┣ 📜App.tsx
┣ 📜index.css
┣ 📜main.tsx
┗ 📜vite-env.d.ts
```

## 과제 요구사항 반영

과제에서 요구하는 사항은 모두 반영하였습니다.

- 추가 버튼 클릭 시 입력 폼(모달) 생성 및 데이터 추가
- 여러 필드를 나타내는 레코드 구현 및 수정/삭제
- 필드 filtering 기능 구현

#### 중점 사항

컴포넌트와 유틸 함수, 훅을 여러 곳에서 사용할 수 있도록 최대한 추상화 하는 것에 집중하였습니다.

- ui 패키지(컴포넌트), hook, utils, type을 여러 곳에서 사용할 수 있도록 추상화 하는 데 집중하였습니다.
