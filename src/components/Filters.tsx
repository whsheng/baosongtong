import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface FiltersProps {
  searchQuery: string;
  dateRange: { start: string; end: string } | null;
  maxLimit: number | null;
  onSearchChange: (value: string) => void;
  onDateRangeChange: (range: { start: string; end: string } | null) => void;
  onMaxLimitChange: (limit: number | null) => void;
}

export function Filters({
  searchQuery,
  dateRange,
  maxLimit,
  onSearchChange,
  onDateRangeChange,
  onMaxLimitChange,
}: FiltersProps) {
  const clearFilters = () => {
    onSearchChange('');
    onDateRangeChange(null);
    onMaxLimitChange(null);
  };

  const hasFilters = searchQuery || dateRange || maxLimit !== null;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="grid gap-4 md:grid-cols-4">
        {/* School Search */}
        <div className="space-y-2">
          <Label htmlFor="search">学校名称</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder="搜索学校..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label htmlFor="startDate">开始日期</Label>
          <Input
            id="startDate"
            type="date"
            lang="zh-CN"
            value={dateRange?.start || ''}
            onChange={(e) =>
              onDateRangeChange(
                e.target.value
                  ? { start: e.target.value, end: dateRange?.end || e.target.value }
                  : null
              )
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">结束日期</Label>
          <Input
            id="endDate"
            type="date"
            lang="zh-CN"
            value={dateRange?.end || ''}
            onChange={(e) =>
              onDateRangeChange(
                e.target.value
                  ? { start: dateRange?.start || e.target.value, end: e.target.value }
                  : null
              )
            }
          />
        </div>

        {/* Limit Filter */}
        <div className="space-y-2">
          <Label htmlFor="limit">限报数量</Label>
          <Select
            value={maxLimit?.toString() || 'all'}
            onValueChange={(value) => onMaxLimitChange(value === 'all' ? null : parseInt(value))}
          >
            <SelectTrigger id="limit">
              <SelectValue placeholder="全部" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="1">限报 1 所</SelectItem>
              <SelectItem value="2">限报 2 所及以下</SelectItem>
              <SelectItem value="3">限报 3 所及以下</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-2 h-4 w-4" />
            清除筛选
          </Button>
        </div>
      )}
    </div>
  );
}
