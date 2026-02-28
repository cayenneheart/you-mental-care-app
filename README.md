# 優〜YOU〜メンタルケア

毎日の気分を記録し、AIがウェルビーイング（心身の健康状態）をサポートするメンタルケア・チェックアプリです。

## 主な機能
- **コンディション・チェック機能**: 毎日の気分（ストレス状態〜とても良い）を簡単に5段階で記録。
- **AI ウェルビーイング・サポーター**: 今の気分に合わせた励ましや、日々のモヤモヤを聞いてくれるチャット機能。
- **チャット履歴一覧**: 過去のコンディション・セッションを振り返ることができます。
- **モバイルファーストなデザイン設計**: PWAやスマホからのアクセスを意識したクリーンでモダンなUI（shadcn/ui採用）。

## 開発技術 (Tech Stack)
- **Frontend Framework**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

## ローカルでの動かし方

```bash
# パッケージのインストール
npm install

# ローカルサーバー立ち上げ
npm run dev
```

ブラウザで `http://localhost:8107` （ポート番号は環境により異なります）を開いて確認してください。
