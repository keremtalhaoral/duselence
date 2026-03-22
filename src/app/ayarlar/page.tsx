'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useThemeStore } from '@/store/useThemeStore';
import { useProgressStore } from '@/store/useProgressStore';
import { userProfile } from '@/data/user';

export default function AyarlarPage() {
  const { isDark, toggle } = useThemeStore();
  const { programStartDate, setProgramStartDate } = useProgressStore();
  const [startDate, setStartDate] = useState(programStartDate);

  const handleSaveDate = () => {
    setProgramStartDate(startDate);
  };

  const appointmentDate = new Date(userProfile.psychiatristAppointment.date);
  const daysUntilAppointment = Math.ceil((appointmentDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold gradient-text">Ayarlar</h1>

      {/* Theme */}
      <Card hover={false} padding="md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Tema</h2>
            <p className="text-xs text-[var(--text-tertiary)]">{isDark ? 'Koyu mod aktif' : 'Açık mod aktif'}</p>
          </div>
          <button
            onClick={toggle}
            className="px-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-card)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
          >
            {isDark ? 'Açık Mod' : 'Koyu Mod'}
          </button>
        </div>
      </Card>

      {/* Program Start Date */}
      <Card hover={false} padding="md">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Program Başlangıç Tarihi</h2>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-card)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
          />
          <button
            onClick={handleSaveDate}
            className="px-4 py-2 rounded-xl bg-accent-blue text-white text-sm font-medium hover:bg-accent-blue/90 transition-colors"
          >
            Kaydet
          </button>
        </div>
        <p className="text-xs text-[var(--text-tertiary)] mt-2">Mevcut: {programStartDate}</p>
      </Card>

      {/* User Profile */}
      <Card hover={false} padding="md">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Profil</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Ad</span>
            <span className="text-[var(--text-primary)] font-medium">{userProfile.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Yaş</span>
            <span className="text-[var(--text-primary)]">{userProfile.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Üniversite</span>
            <span className="text-[var(--text-primary)]">{userProfile.university}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Boy</span>
            <span className="text-[var(--text-primary)]">{userProfile.height}cm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Sporlar</span>
            <div className="flex gap-1">
              {userProfile.sports.map(s => <Badge key={s} variant="blue">{s}</Badge>)}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Hedef</span>
            <span className="text-[var(--text-primary)]">{userProfile.currentWeight}kg - {userProfile.targetWeight}kg, %{userProfile.currentBodyFat} - %{userProfile.targetBodyFat}</span>
          </div>
        </div>
      </Card>

      {/* Medication */}
      <Card hover={false} padding="md">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">İlaç Bilgisi</h2>
          <Badge variant="critical">Kritik</Badge>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">İlaç</span>
            <span className="text-[var(--text-primary)] font-medium">{userProfile.medication.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Doz</span>
            <span className="text-[var(--text-primary)]">{userProfile.medication.currentDose}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Durum</span>
            <span className="text-[var(--text-primary)]">{userProfile.medication.condition}</span>
          </div>
        </div>
      </Card>

      {/* Psychiatrist Appointment */}
      <Card hover={false} padding="md">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Psikiyatrist Randevusu</h2>
          {daysUntilAppointment > 0 && (
            <Badge variant="orange">{daysUntilAppointment} gün kaldı</Badge>
          )}
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Doktor</span>
            <span className="text-[var(--text-primary)]">{userProfile.psychiatristAppointment.doctor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Hastane</span>
            <span className="text-[var(--text-primary)] text-right text-xs">{userProfile.psychiatristAppointment.hospital}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Tarih</span>
            <span className="text-[var(--text-primary)]">
              {format(appointmentDate, 'd MMMM yyyy', { locale: tr })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--text-tertiary)]">Ücret</span>
            <span className="text-accent-green font-medium">{userProfile.psychiatristAppointment.cost}</span>
          </div>
        </div>
        <div className="mt-3 p-3 rounded-xl bg-[var(--bg-secondary)]">
          <p className="text-xs font-medium text-[var(--text-primary)] mb-2">Götürülecekler:</p>
          <ul className="space-y-1">
            {userProfile.psychiatristAppointment.bringList.map((item, i) => (
              <li key={i} className="text-xs text-[var(--text-secondary)] flex gap-1.5">
                <span className="text-accent-blue">*</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/periodizasyon">
          <Card padding="md">
            <p className="text-sm font-medium text-[var(--text-primary)]">Periodizasyon</p>
            <p className="text-xs text-[var(--text-tertiary)]">12 haftalık plan</p>
          </Card>
        </Link>
        <Link href="/haftalik-degerlendirme">
          <Card padding="md">
            <p className="text-sm font-medium text-[var(--text-primary)]">Haftalık Değerlendirme</p>
            <p className="text-xs text-[var(--text-tertiary)]">Yorgunluk ve ağrı</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
