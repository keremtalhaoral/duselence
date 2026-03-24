'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Settings, Calendar, Database, User, Pill, Stethoscope, Download, Upload, Save, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useProgressStore } from '@/store/useProgressStore';
import { userProfile } from '@/data/user';

export default function AyarlarPage() {
  const { programStartDate, setProgramStartDate, exportData, importData } = useProgressStore();
  const [startDate, setStartDate] = useState(programStartDate);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveDate = () => {
    setProgramStartDate(startDate);
  };

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `duselence-veri-${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const success = importData(text);
      setImportStatus(success ? 'success' : 'error');
      setTimeout(() => setImportStatus('idle'), 3000);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const appointmentDate = new Date(userProfile.psychiatristAppointment.date);
  const daysUntilAppointment = Math.ceil((appointmentDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Settings size={22} className="text-[var(--text-tertiary)]" />
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">Ayarlar</h1>
      </div>

      {/* Program Start Date */}
      <Card hover={false} padding="md">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} className="text-blue-500" />
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Program Başlangıç Tarihi</h2>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
          />
          <button
            onClick={handleSaveDate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-200 active:scale-[0.98]"
          >
            <Save size={14} />
            Kaydet
          </button>
        </div>
        <p className="text-xs text-[var(--text-tertiary)] mt-2">Mevcut: {programStartDate}</p>
      </Card>

      {/* Data Export/Import */}
      <Card hover={false} padding="md">
        <div className="flex items-center gap-2 mb-3">
          <Database size={16} className="text-violet-500" />
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Veri Yönetimi</h2>
        </div>
        <p className="text-xs text-[var(--text-secondary)] mb-3">
          Tüm ilerleme, antrenman ve haftalık değerlendirme verilerini dışa/içe aktar.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-200 active:scale-[0.98]"
          >
            <Download size={14} />
            Dışa Aktar
          </button>
          <label className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <div className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[var(--bg-secondary)] text-sm font-medium text-[var(--text-primary)] text-center cursor-pointer hover:bg-[var(--bg-tertiary)] transition-colors duration-200 active:scale-[0.98]">
              <Upload size={14} />
              İçe Aktar
            </div>
          </label>
        </div>
        {importStatus === 'success' && (
          <p className="text-xs text-emerald-600 mt-2 font-medium">Veriler başarıyla içe aktarıldı.</p>
        )}
        {importStatus === 'error' && (
          <p className="text-xs text-primary mt-2 font-medium">Geçersiz dosya formatı.</p>
        )}
      </Card>

      {/* User Profile */}
      <Card hover={false} padding="md">
        <div className="flex items-center gap-2 mb-3">
          <User size={16} className="text-emerald-500" />
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">Profil</h2>
        </div>
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
            <span className="text-[var(--text-primary)]">{userProfile.currentWeight}kg → {userProfile.targetWeight}kg, %{userProfile.currentBodyFat} → %{userProfile.targetBodyFat}</span>
          </div>
        </div>
      </Card>

      {/* Medication */}
      <Card hover={false} padding="md">
        <div className="flex items-center gap-2 mb-3">
          <Pill size={16} className="text-primary" />
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
          <Stethoscope size={16} className="text-amber-500" />
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
            <span className="text-emerald-600 font-medium">{userProfile.psychiatristAppointment.cost}</span>
          </div>
        </div>
        <div className="mt-3 p-3 rounded-xl bg-[var(--bg-secondary)]">
          <p className="text-xs font-medium text-[var(--text-primary)] mb-2">Götürülecekler:</p>
          <ul className="space-y-1">
            {userProfile.psychiatristAppointment.bringList.map((item, i) => (
              <li key={i} className="text-xs text-[var(--text-secondary)] flex gap-1.5">
                <span className="text-primary shrink-0">&bull;</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/periodizasyon">
          <Card padding="md" hover={true}>
            <p className="text-sm font-medium text-[var(--text-primary)]">Periyodizasyon</p>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5">12 haftalık plan</p>
          </Card>
        </Link>
        <Link href="/haftalik-degerlendirme">
          <Card padding="md" hover={true}>
            <p className="text-sm font-medium text-[var(--text-primary)]">Haftalık Değerlendirme</p>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5">Yorgunluk ve ağrı</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
