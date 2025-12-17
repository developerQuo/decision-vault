import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

async function fetchNotice(id: string): Promise<Notice> {
  const response = await fetch(`/api/notice-board/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch notice');
  }
  return response.json();
}

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: notice,
    status,
    error,
  } = useQuery({
    queryKey: ['notice', id],
    queryFn: () => fetchNotice(id!),
    enabled: !!id,
  });

  if (status === 'pending') {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="bg-muted h-8 w-2/3 rounded" />
            <div className="bg-muted mt-2 h-4 w-1/3 rounded" />
          </CardHeader>
          <CardContent>
            <div className="bg-muted h-40 rounded" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <Card className="border-destructive">
          <CardContent className="text-destructive p-8 text-center">
            <p className="text-lg font-semibold">
              Error loading notice
            </p>
            <p className="text-muted-foreground mt-2">
              {error.message}
            </p>
            <Link to="/notice-board" className="mt-4 inline-block">
              <Button variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Back to List
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6">
        <Link to="/notice-board">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="size-4" />
            Back to List
          </Button>
        </Link>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="space-y-4 border-b pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm font-normal"
              >
                Notice
              </Badge>
              <CardTitle className="text-3xl font-bold">
                {notice?.title}
              </CardTitle>
            </div>
          </div>
          <CardDescription className="text-base">
            {notice?.createdAt && (
              <time dateTime={notice.createdAt}>
                Created: {new Date(notice.createdAt).toLocaleString()}
              </time>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="prose prose-neutral dark:prose-invert max-w-none pt-6">
          <div className="text-foreground text-lg leading-relaxed whitespace-pre-wrap">
            {notice?.content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
