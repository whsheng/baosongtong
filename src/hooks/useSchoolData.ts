import { useState, useMemo } from 'react';
import schoolData from '@/data/schools.json';
import { School, SchoolData, TimelineEvent } from '@/types/school';

interface Filters {
  searchQuery: string;
  dateRange: { start: string; end: string } | null;
  maxLimit: number | null;
}

export function useSchoolData() {
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    dateRange: null,
    maxLimit: null,
  });

  const data = schoolData as SchoolData;

  const filteredSchools = useMemo(() => {
    return data.schools.filter((school) => {
      // Search filter
      if (filters.searchQuery && !school.name.includes(filters.searchQuery)) {
        return false;
      }

      // Limit filter
      if (filters.maxLimit !== null && school.limit > filters.maxLimit) {
        return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const { start, end } = filters.dateRange;
        const writtenDate = new Date(school.writtenExamDate);
        const interviewDate = new Date(school.interviewDate);
        const startDate = new Date(start);
        const endDate = new Date(end);

        const hasEventInRange =
          (writtenDate >= startDate && writtenDate <= endDate) ||
          (interviewDate >= startDate && interviewDate <= endDate);

        if (!hasEventInRange) {
          return false;
        }
      }

      return true;
    });
  }, [data.schools, filters]);

  const timelineEvents = useMemo(() => {
    const events: TimelineEvent[] = [];
    
    filteredSchools.forEach((school) => {
      events.push({
        id: `${school.id}-written`,
        schoolId: school.id,
        schoolName: school.name,
        date: school.writtenExamDate,
        type: 'written',
      });
      events.push({
        id: `${school.id}-interview`,
        schoolId: school.id,
        schoolName: school.name,
        date: school.interviewDate,
        type: 'interview',
      });
    });

    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredSchools]);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return {
    year: data.year,
    schools: filteredSchools,
    timelineEvents,
    filters,
    updateFilters,
  };
}
