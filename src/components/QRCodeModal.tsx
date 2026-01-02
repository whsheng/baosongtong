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
import wechatQrcode from '@/assets/wechat-qrcode.jpg';

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
          <img 
            src={wechatQrcode} 
            alt="微信二维码" 
            className="w-48 h-auto rounded-lg"
          />
          <p className="mt-4 text-sm text-muted-foreground text-center">
            长按识别或截图后扫描
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
