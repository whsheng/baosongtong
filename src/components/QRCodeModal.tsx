import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function QRCodeModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <QrCode className="h-4 w-4" />
          <span className="hidden sm:inline">联系我们</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>联系我们</DialogTitle>
          <DialogDescription>
            扫描二维码添加微信，获取更多保送资讯
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          {/* 占位二维码 */}
          <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center text-muted-foreground">
              <QrCode className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">二维码占位</p>
              <p className="text-xs">稍后替换为真实二维码</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground text-center">
            长按识别或截图后扫描
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
