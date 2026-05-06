import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ModuleSelectScreen } from './components/quiz/ModuleSelectScreen';
import { QuizPage } from './components/quiz/QuizPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />
            <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col justify-center">
              <ModuleSelectScreen />
            </main>
            <Footer />
          </div>
        }
      />
      <Route path="/quiz/:moduleId" element={<QuizPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
