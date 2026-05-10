import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ModuleSelectScreen } from '@/components/quiz/ModuleSelectScreen';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col justify-center">
        <ModuleSelectScreen />
      </main>
      <Footer />
    </div>
  );
}
