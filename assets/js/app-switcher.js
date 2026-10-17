/**
 * SIAKAD Floating App & Role Switcher Component
 * 9 Modul Lengkap + Safe Relative Paths + Modal Roadmap Fase 2
 */

(function () {
  const isInsidePages = window.location.pathname.includes('/pages/');
  const pagePrefix = isInsidePages ? '' : 'pages/';
  
  // PERBAIKAN: Arahkan langsung ke portal.html, bukan ke index.html login
  const rootPortal = isInsidePages ? 'portal.html' : 'pages/portal.html';
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  // 1. Inisialisasi Database Default jika belum ada
  const STORAGE_KEY = 'siakad_data_studi';
  if (!localStorage.getItem(STORAGE_KEY)) {
    const defaultData = [
      { kode: "IF2104", nama: "Sistem Basis Data", sks: 3, dosen: "Dr. Ir. Hendra Wijaya, M.T.", presensi: 90, tugas: 85, uts: 80, uas: 85, nilaiAkhir: 84.0, huruf: "A-", bobot: 3.70 }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  }

  // 2. Baca Role Aktif
  const currentRole = localStorage.getItem('siakad_role') || 'mahasiswa';
  const dashboardLink = currentRole === 'dosen' ? `${pagePrefix}dashboard-dosen.html` : `${pagePrefix}dashboard.html`;
  const gradeLink = currentRole === 'dosen' ? `${pagePrefix}nilai-dosen.html` : `${pagePrefix}khs.html`;
  const gradeTitle = currentRole === 'dosen' ? 'Input Nilai' : 'Hasil Studi';
  const gradeSub = currentRole === 'dosen' ? 'DPNA Dosen' : 'KHS Mahasiswa';

  // 3. Template HTML
  const popoverHTML = `
  <!-- OVERLAY SWITCHER UTAMA -->
  <div id="appSwitcherOverlay" class="fixed inset-0 z-[999] hidden select-none">
    <div class="fixed inset-0 bg-slate-950/40 backdrop-blur-[3px] transition-opacity cursor-pointer" onclick="window.toggleAppSwitcher()"></div>

    <div class="fixed top-[84px] left-[92px] z-[1000] w-[370px] p-5 rounded-[26px] bg-white/95 backdrop-blur-2xl border border-white/90 shadow-2xl shadow-slate-900/30 flex flex-col gap-3.5 animate-in fade-in zoom-in-95 duration-150">
      <div class="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0055A5] to-transparent opacity-60"></div>

      <!-- Header Popover -->
      <div class="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="flex h-2.5 w-2.5 rounded-full ${currentRole === 'dosen' ? 'bg-amber-500' : 'bg-[#0055A5]'} animate-pulse"></span>
          <h2 class="text-sm font-extrabold text-[#0F172A] tracking-tight">Pindah Akses & Modul</h2>
        </div>
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${currentRole === 'dosen' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-[#0055A5] border-blue-200'} border">
          ${currentRole === 'dosen' ? '👨‍🏫 Akun Dosen' : '🎓 Akun Mahasiswa'}
        </span>
      </div>

      <!-- Sakelar Ganti Peran -->
      <div class="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200/80">
        <button type="button" onclick="window.gantiRoleSiakad('mahasiswa')" class="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${currentRole === 'mahasiswa' ? 'bg-white text-[#0055A5] shadow-xs' : 'text-slate-500 hover:text-slate-800'}">
          <span>🎓</span> Mahasiswa
        </button>
        <button type="button" onclick="window.gantiRoleSiakad('dosen')" class="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${currentRole === 'dosen' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}">
          <span>👨‍🏫</span> Dosen
        </button>
      </div>

      <!-- Grid 9 Modul -->
      <div class="grid grid-cols-3 gap-2">
        <!-- 1. Admin BAAK -->
        <a href="${pagePrefix}data-master.html" class="flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition hover:-translate-y-0.5 group ${currentFile === 'data-master.html' ? 'bg-blue-50/80 border-[#0055A5]' : 'bg-slate-50/80 hover:bg-white border-slate-200/70'}">
          <div class="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          </div>
          <span class="text-[11px] font-bold text-[#0F172A] truncate w-full">Admin BAAK</span>
          <span class="text-[9px] text-slate-500 font-medium">Master Data</span>
        </a>

        <!-- 2. E-Learning -->
        <a href="${pagePrefix}modul-preview.html?modul=E-Learning LMS" class="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/70 text-center transition hover:-translate-y-0.5 group cursor-pointer">
          <div class="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
          </div>
          <span class="text-[11px] font-bold text-[#0F172A] truncate w-full">E-Learning</span>
          <span class="text-[9px] text-slate-500 font-medium">Kuliah Online</span>
        </a>

        <!-- 3. SIM Akademik Dashboard -->
        <a href="${dashboardLink}" class="flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition hover:-translate-y-0.5 group ${currentFile.includes('dashboard') ? 'bg-blue-50/80 border-[#0055A5]' : 'bg-slate-50/80 hover:bg-white border-slate-200/70'}">
          <div class="w-9 h-9 rounded-xl bg-blue-500/10 text-[#0055A5] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          </div>
          <span class="text-[11px] font-bold text-[#0F172A] truncate w-full">SIM Akademik</span>
          <span class="text-[9px] text-[#0055A5] font-semibold">${currentRole === 'dosen' ? 'Dosen Hub' : 'Portal Utama'}</span>
        </a>

        <!-- 4. Penjadwalan -->
        <a href="${pagePrefix}penjadwalan.html" class="flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition hover:-translate-y-0.5 group ${currentFile === 'penjadwalan.html' ? 'bg-blue-50/80 border-[#0055A5]' : 'bg-slate-50/80 hover:bg-white border-slate-200/70'}">
          <div class="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect height="18" rx="2" width="18" x="3" y="4"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
          </div>
          <span class="text-[11px] font-bold text-[#0F172A] truncate w-full">Penjadwalan</span>
          <span class="text-[9px] text-slate-500 font-medium">Jadwal Kuliah</span>
        </a>

        <!-- 5. KHS / Nilai Dosen -->
        <a href="${gradeLink}" class="flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition hover:-translate-y-0.5 group ${(currentFile === 'khs.html' || currentFile === 'nilai-dosen.html') ? 'bg-blue-50/80 border-[#0055A5]' : 'bg-slate-50/80 hover:bg-white border-slate-200/70'}">
          <div class="w-9 h-9 rounded-xl ${currentRole === 'dosen' ? 'bg-amber-500/10 text-amber-600' : 'bg-teal-500/10 text-teal-600'} flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
          </div>
          <span class="text-[11px] font-bold text-[#0F172A] truncate w-full">${gradeTitle}</span>
          <span class="text-[9px] ${currentRole === 'dosen' ? 'text-amber-600 font-bold' : 'text-slate-500'} font-medium">${gradeSub}</span>
        </a>

        <!-- 6. Keuangan -->
        <a href="${pagePrefix}modulSIM.html" class="flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition hover:-translate-y-0.5 group ${currentFile === 'modulSIM.html' ? 'bg-blue-50/80 border-[#0055A5]' : 'bg-slate-50/80 hover:bg-white border-slate-200/70'}">
          <div class="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
          </div>
          <span class="text-[11px] font-bold text-[#0F172A] truncate w-full">Keuangan</span>
          <span class="text-[9px] text-slate-500 font-medium">UKT & Biaya</span>
        </a>

        <!-- 7. SIM SDM -->
        <a href="${pagePrefix}modul-preview.html?modul=SIM Kepegawaian (SDM)" class="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/70 text-center transition hover:-translate-y-0.5 group cursor-pointer">
          <div class="w-9 h-9 rounded-xl bg-amber-600/10 text-amber-700 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <span class="text-[11px] font-bold text-[#0F172A] truncate w-full">SIM SDM</span>
          <span class="text-[9px] text-slate-500 font-medium">Dosen & Staff</span>
        </a>

        <!-- 8. SIM PMB -->
        <a href="${pagePrefix}modul-preview.html?modul=SIM Admisi PMB" class="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/70 text-center transition hover:-translate-y-0.5 group cursor-pointer">
          <div class="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          </div>
          <span class="text-[11px] font-bold text-[#0F172A] truncate w-full">SIM PMB</span>
          <span class="text-[9px] text-slate-500 font-medium">Maba Online</span>
        </a>

        <!-- 9. MBKM -->
        <a href="${pagePrefix}modul-preview.html?modul=SIM MBKM (Kampus Merdeka)" class="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/70 text-center transition hover:-translate-y-0.5 group cursor-pointer">
          <div class="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
          </div>
          <span class="text-[11px] font-bold text-[#0F172A] truncate w-full">MBKM</span>
          <span class="text-[9px] text-slate-500 font-medium">Kampus Merdeka</span>
        </a>
      </div>

      <!-- Tombol Kembali ke Gate Launcher Hub (Menuju portal.html) -->
      <div class="pt-2 border-t border-slate-200/70">
        <a href="${rootPortal}" class="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-[#0055A5]/10 border border-slate-200 flex items-center justify-center gap-2 text-xs font-bold text-[#0055A5] transition cursor-pointer">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span>Kembali ke Gate Launcher Hub</span>
        </a>
      </div>
    </div>
  </div>
  `;

  function initSwitcher() {
    if (!document.getElementById('appSwitcherOverlay')) {
      document.body.insertAdjacentHTML('beforeend', popoverHTML);
    }

    const aside = document.querySelector('aside');
    if (aside) {
      const triggerBtn = aside.querySelector('a, button');
      if (triggerBtn) {
        triggerBtn.removeAttribute('href');
        triggerBtn.setAttribute('type', 'button');
        triggerBtn.style.cursor = 'pointer';
        triggerBtn.onclick = function (e) {
          e.preventDefault();
          e.stopPropagation();
          window.toggleAppSwitcher();
        };
      }
    }
  }

  // Fungsi Ganti Role
  window.gantiRoleSiakad = function (role) {
    localStorage.setItem('siakad_role', role);
    if (role === 'dosen') {
      window.location.href = `${pagePrefix}dashboard-dosen.html`;
    } else {
      window.location.href = `${pagePrefix}dashboard.html`;
    }
  };

  // Toggle Switcher Popover
  window.toggleAppSwitcher = function () {
    const overlay = document.getElementById('appSwitcherOverlay');
    if (overlay) overlay.classList.toggle('hidden');
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('appSwitcherOverlay');
      if (overlay && !overlay.classList.contains('hidden')) overlay.classList.add('hidden');
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwitcher);
  } else {
    initSwitcher();
  }
})();