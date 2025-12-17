import { Route, Routes } from 'react-router-dom';

import { ComponentShowcase } from '@/components/ComponentShowcase';
import AuthCallback from '@/pages/Auth/Callback';
import CreateNoticePage from '@/pages/NoticeBoard/Create';
import NoticeDetailPage from '@/pages/NoticeBoard/Detail';
import NoticeBoardListPage from '@/pages/NoticeBoard/List';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ComponentShowcase />} />
      <Route path="/notice-board" element={<NoticeBoardListPage />} />
      <Route
        path="/notice-board/create"
        element={<CreateNoticePage />}
      />
      <Route path="/notice-board/:id" element={<NoticeDetailPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
}

export default App;
