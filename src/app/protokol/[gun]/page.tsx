import { weekSchedule } from '@/data/schedules';
import { ProtocolContent } from './ProtocolContent';

export function generateStaticParams() {
  return weekSchedule.map((d) => ({ gun: d.id }));
}

export default async function GunDetayPage({ params }: { params: Promise<{ gun: string }> }) {
  const { gun } = await params;
  return <ProtocolContent gun={gun} />;
}
