# rm2
부동산을 매매하고, 담보 대출과 프로젝트 파이낸싱을 운영하는 수업용 브라우저 게임입니다. 새 시뮬레이션에서 12·20·40분기를 선택할 수 있습니다.

## GitHub Pages 배포

1. GitHub 저장소의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택합니다.
2. 이 프로젝트를 저장소의 `main` 브랜치에 푸시합니다. 이미 푸시했다면 **Actions → Deploy Cheongun City → Run workflow**를 선택합니다.
3. 배포가 완료되면 **Settings → Pages** 또는 워크플로의 `github-pages` 환경에서 실제 접속 URL을 확인합니다.

게임 파일은 `dist/`에 있습니다. 별도 빌드나 API 키 없이 배포할 수 있습니다. 환율 API에 연결할 수 없으면 화면에 표시된 기준일의 저장값을 사용합니다. 게임 진행은 브라우저에 저장되며 Sites와 GitHub Pages는 각자의 진행 기록을 사용합니다. 배포 정책과 비공개 저장소 지원 여부는 [GitHub Pages 문서](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)를 참고하세요.

## 로컬 실행

이 폴더에서 다음 명령을 실행하고 `http://localhost:8000`을 엽니다.

```sh
python3 -m http.server 8000 --directory dist
```
