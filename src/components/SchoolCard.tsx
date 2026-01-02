import { School } from '@/types/school';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, ExternalLink, FileText, PenLine, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'MM月dd日', { locale: zhCN });
  };

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{school.name}</CardTitle>
          <Badge variant="secondary">限报 {school.limit} 所</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>招生计划：{school.plan} 人</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>出简章：{formatDate(school.brochureDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>报名：{formatDate(school.registrationStart)} - {formatDate(school.registrationEnd)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <PenLine className="h-4 w-4 text-primary" />
          <span className="font-medium text-primary">笔试：{formatDate(school.writtenExamDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MessageSquare className="h-4 w-4 text-green-600" />
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
