# ポモドーロタイマー実装方法の概要

## 1. 状態管理の設計

### 必要な状態
```typescript
// タイマーの基本状態
const [timeLeft, setTimeLeft] = useState(1500) // 秒数（25分 = 1500秒）
const [isRunning, setIsRunning] = useState(false)
const [currentMode, setCurrentMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work')
const [completedSessions, setCompletedSessions] = useState(0)
```

## 2. useEffectでタイマー処理

### タイマーのコアロジック
- `setInterval`で1秒ごとに`timeLeft`を減算
- `isRunning`がtrueの時のみ動作
- `timeLeft`が0になったら次の状態に切り替え

### クリーンアップ
- コンポーネントのアンマウント時にintervalをクリア
- 依存配列の適切な管理

## 3. ユーティリティ関数

### 時間フォーマット関数
```typescript
// 秒数を "MM:SS" 形式に変換
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
```

### プログレス計算
```typescript
// 残り時間から進捗率を計算（0-100）
const calculateProgress = (timeLeft: number, totalTime: number) => {
  return ((totalTime - timeLeft) / totalTime) * 100
}
```

## 4. モード切り替えロジック

### 状態遷移パターン
1. 作業時間(25分) → 短い休憩(5分)
2. 短い休憩 → 作業時間
3. 4セッション完了後 → 長い休憩(15分)
4. 長い休憩 → 作業時間（セッションカウントリセット）

## 5. イベントハンドラー

### ボタン操作
- **開始/停止**: `isRunning`の切り替え
- **リセット**: 現在のモードの初期時間に戻す
- **モード強制切り替え**（オプション）

## 6. カスタムフック化（推奨）

```typescript
// usePomodoro.ts
export const usePomodoro = () => {
  // 全ての状態とロジックをここに集約
  return {
    timeLeft,
    isRunning,
    currentMode,
    completedSessions,
    progress,
    start,
    pause,
    reset,
    formatTime
  }
}
```

## 7. 通知機能（拡張）

- ブラウザの`Notification API`
- タイマー完了時の音声再生
- ドキュメントタイトルでの残り時間表示

この構造で実装すれば、保守性と拡張性の高いポモドーロタイマーが作れます！