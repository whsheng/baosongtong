import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

type CardSize = 'square' | 'vertical' | 'horizontal';

interface ShareCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: 'wechat' | 'xiaohongshu' | 'weibo' | 'douyin';
  schoolCount: number;
  year: number;
}

const platformConfig = {
  wechat: { name: '微信', defaultSize: 'square' as CardSize },
  xiaohongshu: { name: '小红书', defaultSize: 'vertical' as CardSize },
  weibo: { name: '微博', defaultSize: 'horizontal' as CardSize },
  douyin: { name: '抖音', defaultSize: 'horizontal' as CardSize },
};

const sizeConfig = {
  square: { width: 400, height: 400, label: '1:1 方形' },
  vertical: { width: 360, height: 480, label: '3:4 竖版' },
  horizontal: { width: 480, height: 270, label: '16:9 横版' },
};

export function ShareCardModal({
  open,
  onOpenChange,
  platform,
  schoolCount,
  year,
}: ShareCardModalProps) {
  const [cardSize, setCardSize] = useState<CardSize>(platformConfig[platform].defaultSize);
  const [generating, setGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const generateCard = async () => {
    if (!cardRef.current) return;

    setGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `保送通-${year}年保送日历.png`;
      link.href = dataUrl;
      link.click();

      toast({
        title: '图片已生成',
        description: `请在${platformConfig[platform].name}中分享此图片`,
      });
    } catch (error) {
      toast({
        title: '生成失败',
        description: '请重试或截图分享',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  const { width, height } = sizeConfig[cardSize];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>生成{platformConfig[platform].name}分享卡片</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 尺寸选择 */}
          <div className="flex gap-2">
            {(Object.keys(sizeConfig) as CardSize[]).map((size) => (
              <Button
                key={size}
                variant={cardSize === size ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCardSize(size)}
              >
                {sizeConfig[size].label}
              </Button>
            ))}
          </div>

          {/* 卡片预览 */}
          <div className="flex justify-center overflow-auto py-4">
            <div
              ref={cardRef}
              style={{ width: `${width}px`, height: `${height}px` }}
              className="relative flex flex-col items-center justify-between rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 text-primary-foreground shadow-xl"
            >
              {/* 装饰背景 */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10" />
              </div>

              {/* 内容 */}
              <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 text-center">
                {/* Logo 和标题 */}
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-xl font-bold">
                    保
                  </div>
                  <span className="text-2xl font-bold">保送通</span>
                </div>

                <p className="text-sm opacity-90">助您保送之路畅通无阻</p>

                {/* 主要信息 */}
                <div className="mt-2 space-y-1">
                  <div className="text-3xl font-bold">{year}年保送日历</div>
                  <div className="text-lg">覆盖 {schoolCount} 所高校</div>
                </div>

                <div className="mt-2 rounded-full bg-white/20 px-4 py-1.5 text-sm">
                  笔试/面试时间全掌握
                </div>
              </div>

              {/* 底部 */}
              <div className="relative z-10 mt-4 flex items-center gap-3 text-sm opacity-80">
                <span>扫码或搜索「保送通」查看详情</span>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button onClick={generateCard} disabled={generating} className="gap-2">
              <Download className="h-4 w-4" />
              {generating ? '生成中...' : '下载图片'}
            </Button>
          </div>

          {/* 分享提示 */}
          <p className="text-center text-sm text-muted-foreground">
            下载图片后，在{platformConfig[platform].name}中分享即可
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
