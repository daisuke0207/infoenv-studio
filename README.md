# infoenv-studio.com

情報環境スタジオ / Information Environment Studio の公式サイト。

## 構成

```
/              → index.html（JP：情報環境スタジオ ブランドサイト）
/en            → en.html  （EN：Software studio overview）
```

製品 LP は別 subdomain で運用（このリポジトリには含まない）：

- `https://snapdesk.infoenv-studio.com` — SnapDesk（macOS デスクトップツール）
- `https://pausetab.infoenv-studio.com` — PauseTab（Chrome 拡張）

## 言語ルーティング

`functions/_middleware.js`（Cloudflare Pages Functions）が処理：

1. Cookie `lang=en` → `/en` にリダイレクト
2. Cookie `lang=ja` → JP（`/`）に留まる
3. Cookie なし → `Accept-Language` ヘッダで自動判定（`ja` 優先 → JP、それ以外 → `/en`）
4. 各ページ右上の言語トグルボタン → Cookie をセットしてリダイレクト

## デプロイ（Cloudflare Pages）

### 方法 A: GitHub 連携（推奨、自動 deploy）

1. このリポジトリを GitHub に push（新規 repo: `infoenv-studio-site` 等）
2. Cloudflare ダッシュボード → Workers & Pages → Create → Pages → **Connect to Git**
3. リポジトリ選択
4. ビルド設定：
   - Framework preset: **None**
   - Build command: 空白
   - Build output directory: 空白（ルートをそのまま deploy）
5. **Save and Deploy**
6. `infoenv-studio-site.pages.dev` で公開確認
7. **Custom domains** タブ → `infoenv-studio.com` を追加（既存の Squarespace から切替）

### 方法 B: Direct Upload

ダッシュボードから手動アップロード。GitHub 連携できない場合のみ。

## カスタムドメインの切替（Squarespace → Cloudflare Pages）

`infoenv-studio.com` は現状 Squarespace のプレースホルダ。Cloudflare Pages に切替手順：

1. Cloudflare ダッシュボード → DNS → `infoenv-studio.com` の現在の A / CNAME レコードを確認
2. Cloudflare Pages の Custom domains で `infoenv-studio.com` を追加 → DNS が自動更新（既に Cloudflare 管理下なら）
3. SSL 証明書発行（数分〜10分）
4. ブラウザキャッシュクリアして表示確認

サブドメイン `snapdesk.infoenv-studio.com` / `pausetab.infoenv-studio.com` は別 Pages プロジェクトなので影響なし。

## 埋める必要があるプレースホルダ

`index.html` 内：

- なし（メディアセクションは「準備中」、メールアドレスは `contact@infoenv-studio.com` 設定済み）
- 将来、YouTube/Kindle/note の URL が確定したら Media セクションを書き換える

`en.html` 内：

- なし（最小構成）

## メンテナンス

- スタイル: `styles.css` 共通、CSS 変数で配色管理
- フォント: Google Fonts の Inter を読み込み
- 製品が増えた時：`index.html` / `en.html` の Software セクションにカード追加 + 必要なら `card-grid` の grid 幅調整

## ライセンス

Proprietary（公開リポジトリ化する際は別途検討）
