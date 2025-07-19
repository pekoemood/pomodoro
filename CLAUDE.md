# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code) への指針を提供します。

## 開発コマンド

### コア開発
- `npm run dev` - 開発サーバーを起動（高速ビルドのためTurbopackを使用）
- `npm run build` - プロダクションビルドを作成
- `npm run start` - プロダクションサーバーを起動
- `npm run lint` - ESLintチェックを実行
- `npm run check` - Biomeチェックを実行し、フォーマットを自動修正

## プロジェクトアーキテクチャ

### 技術スタック
- **Next.js 15.4.2** App RouterとReact 19.1.0
- **TypeScript** strict設定
- **Tailwind CSS v4** カスタムデザインシステム
- **shadcn/ui コンポーネント** "new-york"スタイルで設定
- **Biome** コードフォーマットとリンティング

### 主要ディレクトリ
- `src/app/` - Next.js App Routerのページとレイアウト
- `src/lib/` - ユーティリティ関数と共有ロジック
- `components.json` - shadcn/ui設定

### スタイリングシステム
- Tailwind CSS v4とCSSカスタムプロパティによるテーマ機能
- `.dark`クラスを使用したライト/ダークテーマサポート
- 一貫した色彩のためのOKLCH色空間
- 条件付きクラスのための`src/lib/utils.ts`の`cn()`ユーティリティ

### コンポーネント戦略
- パスエイリアスを使用したshadcn/ui：
  - `@/components` 一般的なコンポーネント用
  - `@/components/ui` UIコンポーネント用
  - `@/lib/utils` ユーティリティ用
- RSC（React Server Components）が有効

### 設定に関する注意事項
- 日本語設定（`lang="ja"`）とNoto Sans JPフォント
- パスエイリアス`@/*`は`./src/*`にマップ
- 開発ビルドでTurbopackが有効
- 幅広い互換性のためのES2017ターゲット

## 言語ガイダンス
- 全て日本語で回答してください

## インタラクションガイダンス
- あなたはシニアエンジニアとして私のコードにアドバイスをしてください

## コード生成ガイドライン
- コードは私が打つので、基本的にはコード生成は不要です