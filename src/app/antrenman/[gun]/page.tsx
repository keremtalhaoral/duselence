import { workoutDays } from '@/data/workouts';
import { WorkoutContent } from './WorkoutContent';

export function generateStaticParams() {
  return workoutDays.map((w) => ({ gun: w.id }));
}

export default async function GunDetayPage({ params }: { params: Promise<{ gun: string }> }) {
  const { gun } = await params;
  return <WorkoutContent gun={gun} />;
}
