/**
 * SIAKAD Modern - Shared Application Logic
 * Folder: assets/js/app.js
 */

// 1. Cek Posisi Folder (Apakah di root index.html atau di dalam folder pages/)
const isInPagesFolder = window.location.pathname.includes('/pages/');
const loginPath = isInPagesFolder ? '../index.html' : 'index.html';
const portalPath = isInPagesFolder ? 'portal.html' : 'pages/portal.html';

// 2. Ambil Data Mahasiswa yang Sedang Aktif
function getActiveUser() {
  const data = localStorage.getItem("siakad_active_user");
  return data ? JSON.parse(data) : null;
}

// 3. Proteksi Halaman (Wajib Login untuk Halaman di dalam pages/)
function protectPage() {
  // Hanya kunci halaman jika berada di dalam folder pages/
  if (isInPagesFolder) {
    const user = getActiveUser();
    if (!user) {
      alert("Akses ditolak! Silakan masuk melalui form login terlebih dahulu.");
      window.location.href = loginPath;
    }
  }
}

// 4. Inisialisasi Tampilan Data Mahasiswa di Semua Halaman
function renderUserData() {
  const user = getActiveUser();
  if (!user) return;

  // Buat 2 huruf inisial dari nama
  const initials = user.nama 
    ? user.nama.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() 
    : 'AF';

  // Sinkronkan ke berbagai elemen ID jika ada di halaman tersebut
  const elMap = {
    'user-display-name': user.nama,
    'user-initial': initials,
    'dock-avatar': initials,
    'dash-greeting': `Selamat Datang, ${user.nama}`,
    'dash-nim': user.nim,
    'dash-jurusan': user.jurusan || 'Teknik Informatika (S1)',
    'dash-semester': user.semester ? `Semester ${user.semester}` : 'Semester 4',
    'krs-nama': user.nama,
    'krs-nim': user.nim,
    'welcome-title': `Selamat Datang, ${user.nama}! 👋`,
    'welcome-sub': `${user.jurusan || 'Teknik Informatika'} • ${user.semester || 'Semester 4'}`
  };

  for (const [id, value] of Object.entries(elMap)) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }
}

// 5. Fungsi Keluar / Logout Universal
function handleLogout() {
  localStorage.removeItem("siakad_active_user");
  window.location.href = loginPath;
}

// 6. Update Jam Realtime di Dock Footer (Jika Elemen Tersedia)
function initRealtimeClock() {
  const clockEl = document.getElementById('dock-clock') || 
                  document.querySelector('[data-purpose="quick-dock-bar"] strong:last-of-type');
  
  if (clockEl) {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      clockEl.innerHTML = `Server: <strong>${h}:${m} WIB</strong>`;
    };
    updateTime();
    setInterval(updateTime, 30000); // Perbarui tiap 30 detik
  }
}

// Jalankan otomatis saat halaman selesai dimuat (DOM Ready)
document.addEventListener("DOMContentLoaded", () => {
  protectPage();
  renderUserData();
  initRealtimeClock();
});