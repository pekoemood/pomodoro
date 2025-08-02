'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Play, Pause, RotateCcw } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { usePomodoro } from "@/hooks/usePomodoro";

export default function Pomodoro() {
  const { sessionCount,isRunning, remainingTime, progress, toggleTimer, resetTimer, mode } = usePomodoro()


  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">ポモドーロタイマー</CardTitle>
          <Badge variant="secondary" className="mx-auto mt-2">
            {mode === 'work' ? '作業時間' : '休憩時間' }
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* タイマー表示 */}
          <div className="text-center">
            <div className="text-6xl font-mono font-bold mb-4">
              {formatTime(remainingTime)}
            </div>
            <Progress value={progress} className="w-full h-2" />
          </div>

          <Separator />

          {/* 制御ボタン */}
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant={isRunning ? "secondary" : "default"}
              className="flex items-center gap-2"
              onClick={toggleTimer}
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4" />
                  停止
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  開始
                </>
              )}
            </Button>
            
            <Button size="lg" variant="outline" className="flex items-center gap-2" onClick={resetTimer}>
              <RotateCcw className="h-4 w-4" />
              リセット
            </Button>
          </div>

          <Separator />

          {/* セッション情報 */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">完了セッション</p>
            <div className="flex justify-center gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < sessionCount ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {sessionCount}/4 セッション
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}