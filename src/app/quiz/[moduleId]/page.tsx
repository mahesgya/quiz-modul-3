import { QuizPage } from '@/components/quiz/QuizPage';

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function QuizRoute({ params }: Props) {
  const { moduleId } = await params;
  return <QuizPage moduleId={moduleId} />;
}
