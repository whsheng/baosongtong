import { useMemo, useState } from 'react';
import { TimelineEvent, School } from '@/types/school';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PenLine, MessageSquare } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TimelineProps {
  events: TimelineEvent[];
  schools: School[];
}

export function Timeline({ events, schools }: TimelineProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date('2026-01-01'));

  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const eventsOnDay = (day: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), day));
  };

  const getSchool = (schoolId: number) => {
    return schools.find((s) => s.id === schoolId);
  };

  const today = new Date();

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
          上月
        </Button>
        <h2 className="text-xl font-semibold">
          {format(currentMonth, 'yyyy年MM月', { locale: zhCN })}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          下月
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span>笔试</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span>面试</span>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Day Headers */}
          <div className="mb-2 grid grid-cols-[repeat(31,1fr)] gap-1">
            {daysInMonth.map((day) => (
              <div
                key={day.toISOString()}
                className={cn(
                  "text-center text-xs font-medium py-1 rounded",
                  isSameDay(day, today) && "bg-primary text-primary-foreground"
                )}
              >
                {format(day, 'd')}
              </div>
            ))}
          </div>

          {/* Events Row */}
          <div className="grid grid-cols-[repeat(31,1fr)] gap-1">
            {daysInMonth.map((day) => {
              const dayEvents = eventsOnDay(day);
              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "min-h-[80px] rounded border border-border p-1 space-y-1",
                    isSameDay(day, today) && "border-primary border-2"
                  )}
                >
                  {dayEvents.map((event) => {
                    const school = getSchool(event.schoolId);
                    return (
                      <Popover key={event.id}>
                        <PopoverTrigger asChild>
                          <button
                            className={cn(
                              "w-full rounded px-1 py-0.5 text-[10px] font-medium text-primary-foreground truncate cursor-pointer transition-opacity hover:opacity-80",
                              event.type === 'written' ? 'bg-primary' : 'bg-green-500'
                            )}
                            title={`${event.schoolName} - ${event.type === 'written' ? '笔试' : '面试'}`}
                          >
                            {event.schoolName.slice(0, 3)}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64" align="start">
                          <div className="space-y-2">
                            <div className="font-semibold">{event.schoolName}</div>
                            <Badge
                              variant={event.type === 'written' ? 'default' : 'secondary'}
                              className={event.type === 'interview' ? 'bg-green-500 text-primary-foreground' : ''}
                            >
                              {event.type === 'written' ? (
                                <><PenLine className="mr-1 h-3 w-3" /> 笔试</>
                              ) : (
                                <><MessageSquare className="mr-1 h-3 w-3" /> 面试</>
                              )}
                            </Badge>
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(event.date), 'yyyy年MM月dd日', { locale: zhCN })}
                            </div>
                            {school && (
                              <div className="text-sm space-y-1">
                                <div>招生计划：{school.plan} 人</div>
                                <div>限报：{school.limit} 所</div>
                              </div>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
