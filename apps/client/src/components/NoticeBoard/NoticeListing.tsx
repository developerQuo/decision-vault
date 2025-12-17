import { useInfiniteQuery } from '@tanstack/react-query';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface FetchNoticesResponse {
  data: Notice[];
  nextCursor?: string;
}

const PAGE_SIZE = 20;

async function fetchNotices({
  pageParam,
}: {
  pageParam?: string;
}): Promise<FetchNoticesResponse> {
  const params = new URLSearchParams();
  params.append('pageSize', PAGE_SIZE.toString());
  if (pageParam) {
    params.append('lastCreatedAt', pageParam);
  }

  const response = await fetch(
    `/api/notice-board?${params.toString()}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch notices');
  }
  const data = await response.json();

  let nextCursor = undefined;
  if (data.length === PAGE_SIZE) {
    const lastItem = data[data.length - 1];
    nextCursor = lastItem.createdAt;
  }

  return { data, nextCursor };
}

export function NoticeListing() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['notices', 'infinite'],
    queryFn: fetchNotices,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  });

  const lastElementRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  if (status === 'pending') {
    return (
      <div className="text-muted-foreground p-8 text-center">
        Loading notices...
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-destructive p-8 text-center">
        Error loading notices: {error.message}
      </div>
    );
  }

  const notices = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <Card className="shadow-sm">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 h-14">
              <TableHead className="w-[100px] text-lg font-semibold">
                Status
              </TableHead>
              <TableHead className="w-[30%] text-lg font-semibold">
                Title
              </TableHead>
              <TableHead className="text-lg font-semibold">
                Content
              </TableHead>
              <TableHead className="w-[200px] text-right text-lg font-semibold">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notices.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground h-32 text-center"
                >
                  No notices found.
                </TableCell>
              </TableRow>
            ) : (
              notices.map((notice) => (
                <TableRow
                  key={notice.id}
                  className="hover:bg-muted/30 h-20 cursor-pointer text-base"
                >
                  <TableCell className="py-4">
                    <Badge
                      variant="outline"
                      className="px-3 py-1 text-sm font-normal opacity-80"
                    >
                      Notice
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground py-4 text-lg font-semibold">
                    {notice.title}
                  </TableCell>
                  <TableCell
                    className="text-muted-foreground max-w-[400px] truncate py-4"
                    title={notice.content}
                  >
                    {notice.content}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-4 text-right tabular-nums">
                    {notice.createdAt
                      ? new Date(notice.createdAt).toLocaleString()
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            )}
            {/* Loading indicator row */}
            {(isFetchingNextPage || hasNextPage) && (
              <TableRow>
                <TableCell colSpan={4} className="p-4 text-center">
                  <div
                    ref={lastElementRef}
                    className="text-muted-foreground flex min-h-[100px] items-center justify-center py-8"
                  >
                    {isFetchingNextPage
                      ? 'Loading more...'
                      : 'Load more'}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
