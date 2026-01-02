import { School } from '@/types/school';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, ExternalLink, FileText, PenLine, MessageSquare, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface SchoolCardProps {
  school: School;
}

const tagColors: Record<string, string> = {
  '985': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  '211': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  '双一流': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
};

export function SchoolCard({ school }: SchoolCardProps) {
  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'MM月dd日', { locale: zhCN });
  };

  const getAmapUrl = (address: string) => {
    return `https://uri.amap.com/search?keyword=${encodeURIComponent(address)}`;
  };

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg leading-tight">{school.name}</CardTitle>
            <Badge variant="secondary" className="shrink-0">限报 {school.limit} 所</Badge>
          </div>
          {school.tags && school.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {school.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${tagColors[tag] || 'bg-muted text-muted-foreground'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 shrink-0" />
          <span>招生计划：{school.plan} 人</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4 shrink-0" />
          <span>出简章：{formatDate(school.brochureDate)}</span>
          <a
            href={school.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline ml-1"
          >
            <ExternalLink className="h-3 w-3" />
            <span className="text-xs">官方</span>
          </a>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 shrink-0" />
          <span className="break-all">报名：{formatDate(school.registrationStart)} - {formatDate(school.registrationEnd)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <a
            href={getAmapUrl(school.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline break-all"
          >
            {school.address}
          </a>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <PenLine className="h-4 w-4 text-primary shrink-0" />
          <span className="font-medium text-primary">笔试：{formatDate(school.writtenExamDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MessageSquare className="h-4 w-4 text-green-600 shrink-0" />
          <span className="font-medium text-green-600">面试：{formatDate(school.interviewDate)}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full"
          onClick={() => window.open(school.officialUrl, '_blank')}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          访问官网
        </Button>
      </CardContent>
    </Card>
  );
}
