Project Title
Hacking EXperience


Technologies
Frontend: React.js
Backend: Node.js with Express
Database: MySQL
Deployment: AWS (Amazon Web Services)

Project Structure
프로젝트는 크게 두 부분으로 나뉩니다: 프론트엔드(React)와 백엔드(Node.js, Express).

Frontend
KoreaMap.js:

대한민국 지도를 표시하고, 사용자가 지역을 선택할 수 있게 합니다.
선택된 지역에 대한 문제(데이터)를 서버에서 불러와 모달을 통해 표시합니다.
MapComponent.js:

amCharts 라이브러리를 사용하여 지도를 구성합니다.
지도의 각 지역을 클릭할 수 있도록 이벤트 핸들러를 설정합니다.
Modal.js:

선택된 지역의 문제들을 상세하게 보여주는 모달 컴포넌트입니다.
문제의 제목, 설명, 카테고리 등의 정보를 동적으로 로드하여 표시합니다.
Backend
server.js:

Express 서버의 주 구성 파일입니다.
CORS 문제를 해결하기 위한 미들웨어 설정과 라우팅을 관리합니다.
solveRouter.js:

지역별 문제 데이터를 관리하는 라우트를 정의합니다.
MySQL 데이터베이스에서 문제 정보를 조회하여 응답합니다.
Database
MySQL을 사용하여 지역별 문제 정보를 저장합니다.
각 문제는 title, description, category 등의 필드를 포함합니다.
Installation and Setup
Prerequisites
Node.js
MySQL
npm
Setup
클론 : 
git clone https://github.com/yourusername/koreamap.git
cd koreamap
의존성 설치: 
npm install

환경 설정 파일 (.env):
DB_HOST=localhost
DB_USER=myUser
DB_PASS=myPassword
DB_NAME=koreamap
Running Locally

서버 실행:
node server.js
리액트 앱 실행:
npm start

Usage
지도 위의 지역을 클릭하여 해당 지역에 대한 문제를 확인할 수 있습니다. 문제의 정답을 입력하여 지역을 정복해 보세요!