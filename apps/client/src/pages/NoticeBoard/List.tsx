import { Link } from 'react-router-dom';

import { NoticeListing } from '@/components/NoticeBoard/NoticeListing';
import { Button } from '@/components/ui/button';

export default function NoticeBoardListPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notice Board</h1>
        <Link to="/notice-board/create">
          <Button>Create Notice</Button>
        </Link>
      </div>

      <NoticeListing />
    </div>
  );
}
