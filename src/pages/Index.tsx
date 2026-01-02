import { useState } from 'react';
import { useSchoolData } from '@/hooks/useSchoolData';
import { Timeline } from '@/components/Timeline';
import { SchoolCard } from '@/components/SchoolCard';
import { Filters } from '@/components/Filters';
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/types/school';
import { CalendarDays, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ShareButton } from '@/components/ShareButton';
import { QRCodeModal } from '@/components/QRCodeModal';

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const { year, schools, timelineEvents, filters, updateFilters } = useSchoolData();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
                保送通 · 助您保送之路畅通无阻
              </h1>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                查看{year}年各院校笔试、面试时间安排，助您合理规划备考
              </p>
            </div>
            <div className="flex items-center gap-2">
              <QRCodeModal />
              <ShareButton />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Filters */}
        <Filters
          searchQuery={filters.searchQuery}
          dateRange={filters.dateRange}
          maxLimit={filters.maxLimit}
          onSearchChange={(value) => updateFilters({ searchQuery: value })}
          onDateRangeChange={(range) => updateFilters({ dateRange: range })}
          onMaxLimitChange={(limit) => updateFilters({ maxLimit: limit })}
        />

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            共 {schools.length} 所院校
          </div>
          <div className="flex rounded-lg border border-border p-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2",
                viewMode === 'timeline' && "bg-muted"
              )}
              onClick={() => setViewMode('timeline')}
            >
              <CalendarDays className="h-4 w-4" />
              时间线
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2",
                viewMode === 'cards' && "bg-muted"
              )}
              onClick={() => setViewMode('cards')}
            >
              <LayoutGrid className="h-4 w-4" />
              卡片
            </Button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'timeline' ? (
          <Timeline events={timelineEvents} schools={schools} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {schools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        )}

        {schools.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            没有找到符合条件的院校
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
