import { useMemo, useState } from 'react';
import { TimelineEvent, School } from '@/types/school';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isSameMonth, isToday } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PenLine, MessageSquare, CalendarClock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface MobileTimelineProps {
  events: TimelineEvent[];
  schools: School[];
}

export function MobileTimeline({ events, schools }: MobileTimelineProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date('2026-01-01'));
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const today = new Date();

  const daysWithEvents = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const allDays = eachDayOfInterval({ start, end });
    
    return allDays
      .map((day) => ({
        date: day,
        events: events.filter((event) => isSameDay(new Date(event.date), day)),
      }))
      .filter((day) => day.events.length > 0);
  }, [currentMonth, events]);

  const getSchool = (schoolId: number) => {
    return schools.find((s) => s.id === schoolId);
  };

  const goToToday = () => {
    setCurrentMonth(today);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentMonth(addMonths(currentMonth, 1));
    } else {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {format(currentMonth, 'yyyy年MM月', { locale: zhCN })}
          </h2>
          {!isSameMonth(currentMonth, today) && (
            <Button variant="ghost" size="sm" onClick={goToToday}>
              <CalendarClock className="h-4 w-4 mr-1" />
              今日
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span>笔试</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span>面试</span>
        </div>
      </div>

      {/* Timeline List */}
      <div 
        className="space-y-3"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const startX = touch.clientX;
          const handleTouchEnd = (endEvent: TouchEvent) => {
            const endX = endEvent.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
              handleSwipe(diff > 0 ? 'left' : 'right');
            }
            document.removeEventListener('touchend', handleTouchEnd);
          };
          document.addEventListener('touchend', handleTouchEnd);
        }}
      >
        {daysWithEvents.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            本月暂无安排
          </div>
        ) : (
          daysWithEvents.map((day) => (
            <div key={day.date.toISOString()} className="relative">
              {/* Today Marker */}
              {isToday(day.date) && (
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-destructive rounded-full" />
              )}
              
              <div className={cn(
                "pl-2",
                isToday(day.date) && "pl-4"
              )}>
                {/* Date Header */}
                <div className={cn(
                  "flex items-center gap-2 mb-2",
                  isToday(day.date) && "text-destructive font-semibold"
                )}>
                  <span className="text-lg font-bold">
                    {format(day.date, 'd日')}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {format(day.date, 'EEEE', { locale: zhCN })}
                  </span>
                  {isToday(day.date) && (
                    <Badge variant="destructive" className="text-xs">今天</Badge>
                  )}
                </div>

                {/* Events */}
                <div className="space-y-2">
                  {day.events.map((event) => {
                    const school = getSchool(event.schoolId);
                    const isExpanded = expandedEvent === event.id;

                    return (
                      <Collapsible
                        key={event.id}
                        open={isExpanded}
                        onOpenChange={() => setExpandedEvent(isExpanded ? null : event.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <Card className={cn(
                            "cursor-pointer transition-all active:scale-[0.98]",
                            event.type === 'written' 
                              ? "border-l-4 border-l-primary" 
                              : "border-l-4 border-l-green-500"
                          )}>
                            <CardContent className="py-3 px-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  {event.type === 'written' ? (
                                    <PenLine className="h-4 w-4 text-primary shrink-0" />
                                  ) : (
                                    <MessageSquare className="h-4 w-4 text-green-500 shrink-0" />
                                  )}
                                  <span className="font-medium truncate">
                                    {event.schoolName}
                                  </span>
                                </div>
                                <Badge
                                  variant={event.type === 'written' ? 'default' : 'secondary'}
                                  className={cn(
                                    "shrink-0 ml-2",
                                    event.type === 'interview' && 'bg-green-500 text-primary-foreground hover:bg-green-600'
                                  )}
                                >
                                  {event.type === 'written' ? '笔试' : '面试'}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          {school && (
                            <Card className="mt-1 bg-muted/50">
                              <CardContent className="py-3 px-4 text-sm space-y-2">
                                <div className="flex items-center gap-4">
                                  <span>招生计划：<strong>{school.plan}</strong> 人</span>
                                  <span>限报：<strong>{school.limit}</strong> 所</span>
                                </div>
                                {school.tags.length > 0 && (
                                  <div className="flex gap-1">
                                    {school.tags.map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                                {school.address && (
                                  <div className="text-muted-foreground">
                                    📍 {school.address}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
