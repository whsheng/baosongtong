import { useState } from 'react';
import { Share2, Copy, Check, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { ShareCardModal } from './ShareCardModal';

// 社交平台图标组件
const WechatIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088v-.035h-.407zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
  </svg>
);

const WeiboIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.443h-.002zm-.977-7.726c-2.539.256-4.427 1.839-4.215 3.535.21 1.695 2.397 2.822 4.936 2.566 2.536-.258 4.422-1.84 4.211-3.54-.21-1.693-2.396-2.818-4.932-2.56v-.001zm1.366 4.631c-.903.203-1.741-.149-1.862-.773-.12-.627.515-1.279 1.418-1.475.911-.197 1.746.164 1.868.79.12.634-.515 1.263-1.424 1.458zm1.655-2.396c-.349.07-.648-.045-.674-.259-.023-.213.229-.439.576-.515.349-.075.65.039.674.252.025.22-.227.446-.576.522zm11.196-2.352c-.209-.861-.912-1.443-1.693-1.443-.109 0-.218.012-.326.035-1.106.236-1.805 1.332-1.561 2.451.242 1.119 1.326 1.826 2.432 1.59 1.106-.239 1.39-1.514 1.148-2.633zm-1.083-.292c.215-.048.439.089.5.307.063.215-.063.438-.279.486-.213.047-.438-.093-.5-.305-.064-.217.063-.439.279-.488zm-5.227-4.353c-.202-.062-.41.05-.464.248-.05.202.063.409.264.47.208.063.412-.05.464-.249.053-.2-.063-.406-.264-.469zm.791-1.154c-.54-.164-1.148-.03-1.584.367-.436.399-.571 1.012-.395 1.588.17.573.65 1.005 1.25 1.102.598.103 1.217-.164 1.534-.659.323-.493.302-1.136-.087-1.589-.182-.211-.436-.375-.718-.496v-.313zm-9.69 7.593c-.011-.105-.023-.212-.04-.317-.084-.579-.268-1.113-.542-1.588-.276-.474-.63-.892-1.057-1.235-.856-.686-1.919-1.083-3.045-1.083-.316 0-.628.03-.933.088-.298.059-.586.147-.859.26-.275.113-.538.256-.784.424-.24.164-.464.352-.669.561-.41.419-.739.9-.976 1.428-.237.528-.373 1.1-.412 1.692-.039.593.023 1.198.176 1.768.152.57.394 1.104.714 1.57.326.466.725.864 1.181 1.167.457.302.969.499 1.498.583.27.043.543.064.815.064.316 0 .629-.03.934-.089.298-.058.587-.146.861-.259.275-.113.538-.255.784-.423.241-.166.465-.354.67-.562.41-.418.739-.899.976-1.427.237-.528.373-1.1.412-1.692.028-.432.003-.867-.072-1.285-.017.002-.035.008-.053.012-.085.02-.172.033-.259.05.063.348.097.706.087 1.066-.02.729-.196 1.422-.518 2.039-.32.617-.778 1.156-1.329 1.558-.549.401-1.182.658-1.846.739-.664.082-1.339-.016-1.959-.285-.621-.27-1.179-.707-1.611-1.263-.432-.557-.733-1.219-.871-1.925-.137-.709-.111-1.45.08-2.152.193-.702.544-1.354 1.015-1.899.477-.55 1.067-.985 1.728-1.269.664-.284 1.391-.41 2.111-.367.734.043 1.444.263 2.065.639.262.16.509.346.728.561-.06-.136-.11-.279-.163-.42l.037.009z"/>
  </svg>
);

const XiaohongshuIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 14.5h-7v-1h7v1zm0-2.5h-7v-1h7v1zm0-2.5h-7v-1h7v1zm0-2.5h-7v-1h7v1z"/>
  </svg>
);

const DouyinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

interface ShareButtonProps {
  title?: string;
  description?: string;
  url?: string;
  schoolCount?: number;
  year?: number;
}

export function ShareButton({
  title = '保送通 - 助您保送之路畅通无阻',
  description = '查看各院校笔试、面试时间安排，助您合理规划备考',
  url = typeof window !== 'undefined' ? window.location.href : '',
  schoolCount = 0,
  year = new Date().getFullYear(),
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sharePlatform, setSharePlatform] = useState<'wechat' | 'xiaohongshu' | 'weibo' | 'douyin'>('wechat');

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: '链接已复制',
        description: '可以粘贴分享给好友',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: '复制失败',
        description: '请手动复制链接',
        variant: 'destructive',
      });
    }
  };

  const shareToWeibo = () => {
    const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(`${title} ${description}`)}`;
    window.open(weiboUrl, '_blank', 'width=600,height=500');
  };

  const openShareCard = (platform: 'wechat' | 'xiaohongshu' | 'weibo' | 'douyin') => {
    setSharePlatform(platform);
    setShareModalOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">分享</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => openShareCard('wechat')} className="gap-2 cursor-pointer">
            <WechatIcon />
            微信分享卡片
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openShareCard('xiaohongshu')} className="gap-2 cursor-pointer">
            <XiaohongshuIcon />
            小红书分享卡片
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openShareCard('weibo')} className="gap-2 cursor-pointer">
            <WeiboIcon />
            微博分享卡片
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openShareCard('douyin')} className="gap-2 cursor-pointer">
            <DouyinIcon />
            抖音分享卡片
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={shareToWeibo} className="gap-2 cursor-pointer">
            <WeiboIcon />
            直接分享到微博
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyLink} className="gap-2 cursor-pointer">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? '已复制' : '复制链接'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ShareCardModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        platform={sharePlatform}
        schoolCount={schoolCount}
        year={year}
      />
    </>
  );
}
