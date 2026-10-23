# infoenv-studio.com

情報環境スタジオ / Infoenv Studio の公式サイト。既存のCloudflare Pages Git連携で配信。

## 公開ページ

- `/`: 日本語トップ。Cookie / Accept-Language の言語判定はこの入口のみ。
- `/en/`: English homepage.
- `/rewatchkit/`: RewatchKit案内（Chrome Web Store公開準備中）。
- `/rewatchkit/privacy/`, `/rewatchkit/support/`: 日本語ポリシー・サポート。
- `/rewatchkit/en/`, `/rewatchkit/en/privacy/`, `/rewatchkit/en/support/`: English.

RewatchKitページは静的HTML/CSS/SVGのみ。独自解析・外部フォント・Cookie設定処理は追加しない。既存トップの言語Cookie・Google Fontsは変更しない。

## 配信と更新

GitHubのCloudflare Pages checkで対象SHAとPreview URLを確認し、プレビューを検証してからmainへ統合。DNS・メール設定の変更は不要。ルートをビルドなしで配信する既存構成を維持。

RewatchKitの公開文書は製品リポジトリの正本から生成し、このリポジトリには公開用のHTML/CSS/SVGのみを同期する。個人データ・製品ソース・バックアップ・内部QA文書は含めない。

ローカル確認: `python3 -m http.server 4175 --bind 127.0.0.1`。言語ルーティング回帰: `node --test tests/routing.test.mjs`。Cookie/Accept-Languageに関係なく、製品・ポリシー・サポートのURLを直接開けること。

## 製品の状態

- RewatchKit: Store公開準備中。案内ページの公開は拡張機能の配布・提出を意味しない。
- SnapDesk: 未公開。製品案内への既存リンクを保持。
- PauseTab: 新規配布休止中。既存のサポートURL・問い合わせ先を保持。

## ライセンス

Proprietary. 公開リポジトリであることはライセンスの変更を意味しない。
