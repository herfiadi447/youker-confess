'use client';

import React, { useState, useEffect } from 'react';
import { CONFESSION_CONFIG } from '@/config/confession';
import { ConfessionResponse } from '@/types/confession';
import { CustomDialog } from '@/components/CustomDialog';


export const AdminDashboard: React.FC = () => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<ConfessionResponse[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin/responses');
      if (res.ok) {
        const json = await res.json();
        setResponses(json.responses || []);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.warn('Session check warning:', e);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) return;

    setIsLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        await fetchAdminData();
      } else {
        setAuthError(data.error || 'PIN tidak cocok.');
      }
    } catch (err) {
      setAuthError('Gagal menghubungi server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/${CONFESSION_CONFIG.UNIQUE_SLUG}`;
    navigator.clipboard?.writeText(fullUrl);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  const [dialogInfo, setDialogInfo] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    icon?: string;
  } | null>(null);

  const handleResetSession = () => {
    try {
      localStorage.removeItem('youker_confession_answer');
      localStorage.removeItem('youker_confession_dodged');
    } catch (e) {}
    setDialogInfo({
      isOpen: true,
      title: 'Sesi Disetel Ulang',
      message: 'Sesi lokal pada perangkat ini telah berhasil disetel ulang.',
      icon: 'restart_alt',
    });
  };


  const latestResponse = responses.length > 0 ? responses[0] : null;

  return (
    <div className="w-full max-w-[420px] min-h-[100dvh] bg-[#FCFAF9] flex flex-col relative shadow-[0_0_50px_rgba(28,25,23,0.03)] mx-auto">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 pt-safe bg-[#FCFAF9]/80 backdrop-blur-xl border-b border-[#F3E8E8]">
        <div className="h-14 px-6 flex items-center justify-between">
          <span className="text-[20px] font-semibold text-[#1a1b22] tracking-tight">
            History Recap
          </span>
          <div className="w-8 h-8 rounded-full bg-[#b80035] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[18px]">
              person
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full px-6 pt-4 pb-20 bg-[#FCFAF9] space-y-6">
        {/* Console Title Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="font-mono text-[12px] text-[#A8A29E] tracking-wider uppercase">
              Console Pengirim
            </span>
            <h2 className="text-[24px] font-semibold text-[#1C1917] tracking-tight mt-1">
              Status Respon
            </h2>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#eeedf7] flex items-center justify-center text-[#515f74] shadow-sm">
            <span className="material-symbols-outlined text-[19px]">
              admin_panel_settings
            </span>
          </div>
        </div>

        {/* SECTION A: Password Verification Form */}
        <section className="w-full bg-white rounded-2xl p-5 shadow-sm border border-[#F3E8E8]">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-[#b80035] text-[20px]">
                {isAuthenticated ? 'lock_open' : 'lock'}
              </span>
              <span className="text-[15px] font-semibold text-[#1C1917]">
                Verifikasi Kredensial
              </span>
            </div>
            <span
              className={`font-mono text-[12px] px-2 py-0.5 rounded-full ${
                isAuthenticated
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-[#eeedf7] text-[#78716C]'
              }`}
            >
              {isAuthenticated ? 'Terbuka' : 'Terkunci'}
            </span>
          </div>

          <p className="text-[13px] text-[#78716C] mb-4">
            {isAuthenticated
              ? 'Autentikasi terverifikasi. Sesi konsol admin aktif.'
              : 'Masukkan PIN otoritas pengirim untuk mengakses riwayat respons penerima secara aman.'}
          </p>

          {!isAuthenticated && (
            <form onSubmit={handleLogin} className="flex flex-col space-y-3">
              <div className="relative w-full">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-[50px] px-5 bg-[#f4f2fd] rounded-full font-mono text-[13px] tracking-widest text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:bg-[#eeedf7] border border-[#E4DCDC]"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#1C1917] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPin ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {authError && (
                <span className="text-[12px] text-red-600 font-medium px-2">
                  {authError}
                </span>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[48px] bg-[#b80035] hover:bg-[#920028] text-white rounded-full font-semibold text-[15px] flex items-center justify-center space-x-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  verified_user
                </span>
                <span>{isLoading ? 'Memeriksa...' : 'Masuk Konsol'}</span>
              </button>
            </form>
          )}
        </section>

        {/* SECTION B: Verified Recap Dashboard Card */}
        {isAuthenticated && (
          <section className="w-full flex flex-col space-y-4">
            {/* Main Result Card */}
            <div className="w-full bg-white rounded-2xl p-6 shadow-sm flex flex-col relative overflow-hidden border border-[#F3E8E8]">
              {/* Top Status Ribbon */}
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-mono text-[12px] text-[#78716C] uppercase tracking-wider">
                    Status Jawaban
                  </span>
                </div>
                <div className="flex items-center px-2.5 py-1 rounded-full bg-[#f4f2fd] text-[#1a1b22] space-x-1">
                  <span
                    className="material-symbols-outlined text-[#b80035] text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                  <span className="font-mono text-[12px] font-semibold">
                    {latestResponse ? 'Terkonfirmasi' : 'Menunggu'}
                  </span>
                </div>
              </div>

              {/* Hero Metric */}
              <div className="bg-[#f4f2fd] rounded-2xl p-5 mb-5 flex items-center justify-between border border-[#E4DCDC]">
                <div className="flex flex-col">
                  <span className="font-mono text-[12px] text-[#A8A29E]">
                    Target Penerima
                  </span>
                  <span className="text-[20px] text-[#1C1917] font-bold mt-0.5">
                    {CONFESSION_CONFIG.TARGET_NAME}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[12px] text-[#A8A29E]">
                    Jawaban Diterima
                  </span>
                  <div className="flex items-center space-x-1.5 mt-0.5 bg-white px-3 py-1 rounded-full shadow-sm border border-[#F3E8E8]">
                    {latestResponse ? (
                      latestResponse.answer === 'yes' ? (
                        <>
                          <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                            check_circle
                          </span>
                          <span className="text-[18px] text-emerald-600 font-bold tracking-wide">
                            IYA
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-stone-500 text-[18px]">
                            info
                          </span>
                          <span className="text-[18px] text-stone-600 font-bold tracking-wide">
                            NGGAK
                          </span>
                        </>
                      )
                    ) : (
                      <span className="text-[15px] text-[#78716C] font-medium">
                        Belum diisi
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Monospace Metadata */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 bg-[#FCFAF9] px-3 rounded-lg border border-[#F3E8E8]">
                  <div className="flex items-center space-x-2 text-[#78716C]">
                    <span className="material-symbols-outlined text-[16px]">
                      schedule
                    </span>
                    <span className="font-mono text-[12px]">Waktu Respons</span>
                  </div>
                  <span className="font-mono text-[12px] text-[#1C1917] font-medium">
                    {latestResponse?.answered_at
                      ? new Date(latestResponse.answered_at).toLocaleString('id-ID', {
                          timeZone: 'Asia/Jakarta',
                        }) + ' WIB'
                      : '-'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 bg-[#FCFAF9] px-3 rounded-lg border border-[#F3E8E8]">
                  <div className="flex items-center space-x-2 text-[#78716C]">
                    <span className="material-symbols-outlined text-[16px]">
                      ads_click
                    </span>
                    <span className="font-mono text-[12px]">Tombol Dodged</span>
                  </div>
                  <span className="font-mono text-[12px] text-[#1C1917] font-medium">
                    {latestResponse?.dodged_count !== undefined
                      ? `${latestResponse.dodged_count} kali`
                      : '-'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 bg-[#FCFAF9] px-3 rounded-lg border border-[#F3E8E8]">
                  <div className="flex items-center space-x-2 text-[#78716C]">
                    <span className="material-symbols-outlined text-[16px]">
                      link
                    </span>
                    <span className="font-mono text-[12px]">Slug Aktif</span>
                  </div>
                  <span className="font-mono text-[12px] text-[#b80035] font-medium">
                    /{CONFESSION_CONFIG.UNIQUE_SLUG}
                  </span>
                </div>
              </div>

              {/* Action Utilities Pill Group */}
              <div className="pt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`h-[46px] w-full rounded-full font-semibold text-[13px] flex items-center justify-center space-x-1.5 active:scale-95 transition-all cursor-pointer ${
                    copySuccess
                      ? 'bg-[#ffdada] text-[#920028]'
                      : 'bg-[#eeedf7] hover:bg-[#e8e7f1] text-[#1a1b22]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">
                    link
                  </span>
                  <span>{copySuccess ? 'Tersalin!' : 'Salin Tautan'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetSession}
                  className="h-[46px] w-full bg-[#f4f2fd] hover:bg-[#eeedf7] text-[#78716C] hover:text-red-600 rounded-full font-semibold text-[13px] flex items-center justify-center space-x-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]">
                    restart_alt
                  </span>
                  <span>Reset Sesi</span>
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="w-full bg-white rounded-2xl p-5 shadow-sm space-y-3 border border-[#F3E8E8]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-[#A8A29E] uppercase tracking-wider">
                  Aktivitas Terakhir
                </span>
                <span className="material-symbols-outlined text-[#A8A29E] text-[18px]">
                  history
                </span>
              </div>

              <div className="space-y-2.5">
                {latestResponse && (
                  <div className="flex items-start space-x-3 p-2.5 rounded-lg bg-[#FCFAF9] border border-[#F3E8E8]">
                    <div className="w-7 h-7 rounded-full bg-[#b80035]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[#b80035] text-[15px]">
                        done_all
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="text-[13px] font-semibold text-[#1C1917] truncate">
                          Pilihan &apos;{latestResponse.answer.toUpperCase()}&apos; Dipilih
                        </span>
                        <span className="font-mono text-[12px] text-[#A8A29E]">
                          {new Date(latestResponse.answered_at || '').toLocaleTimeString('id-ID', {
                            timeZone: 'Asia/Jakarta',
                          })}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#78716C] truncate">
                        Penerima menekan tombol konfirmasi.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3 p-2.5 rounded-lg bg-[#FCFAF9] border border-[#F3E8E8]">
                  <div className="w-7 h-7 rounded-full bg-[#eeedf7] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[#515f74] text-[15px]">
                      drafts
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-semibold text-[#1C1917] truncate">
                        Tautan Siap Dipergunakan
                      </span>
                      <span className="font-mono text-[12px] text-[#A8A29E]">
                        Aktif
                      </span>
                    </div>
                    <p className="text-[12px] text-[#78716C] truncate">
                      Pesan confession aktif pada slug acak.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <CustomDialog
        isOpen={Boolean(dialogInfo?.isOpen)}
        title={dialogInfo?.title}
        message={dialogInfo?.message || ''}
        icon={dialogInfo?.icon}
        onClose={() => setDialogInfo(null)}
      />
    </div>
  );
};

