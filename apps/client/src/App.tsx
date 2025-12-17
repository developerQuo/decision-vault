import { Route, Routes } from 'react-router-dom';

import { ComponentShowcase } from '@/components/ComponentShowcase';
import CreateNoticePage from '@/pages/NoticeBoard/Create';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ComponentShowcase />} />
      <Route
        path="/notice-board/create"
        element={<CreateNoticePage />}
      />
    </Routes>
  );
}

export default App;
