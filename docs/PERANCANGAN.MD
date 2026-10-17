PERANCANGAN SISTEM INFORMASI AKADEMIK (SIAKAD)

Milestone 1 — Perencanaan Menu (.md) & UI Wireframing (Stitch / Figma)

1. Hirarki Menu Sidebar/Navbar

Sistem Informasi Akademik (SIAKAD) mengimplementasikan arsitektur Role-Based Access Control (RBAC) yang membagi hak akses ke dalam tiga peran utama: Mahasiswa, Dosen, dan Admin (BAAK), dengan akses masuk terpusat.

Struktur Menu

SIAKAD KAMPUS
│
├── Login Multi-Role
├── Gate Launcher Hub (SSO)
│
├── Mahasiswa
│   ├── Dashboard Mahasiswa
│   ├── KRS Online
│   ├── KHS & Transkrip
│   ├── Presensi Mahasiswa
│   └── SIM Keuangan (Tagihan UKT)
│
├── Dosen
│   ├── Dashboard Dosen PA
│   ├── Presensi Kelas (QR Code)
│   └── Lembar Penilaian
│
└── Admin (BAAK)
    ├── Dashboard Admin
    ├── Master Data Mata Kuliah
    ├── Master Data Dosen & Pengampu
    └── Master Penjadwalan & Ruang


Role Mahasiswa

Mahasiswa berfokus pada perencanaan studi per semester, peninjauan hasil studi dan transkrip, presensi perkuliahan mandiri, serta pengecekan administrasi pembayaran UKT.

graph TD
    A[MAHASISWA] --> B[Dashboard Mahasiswa]
    A --> C[KRS Online]
    A --> D[KHS & Transkrip]
    A --> E[Presensi Mahasiswa]
    A --> F[SIM Keuangan]


Role Dosen

Dosen berfokus pada fungsi pembimbingan akademik (Dosen PA), penerbitan presensi kelas berbasis QR Code dinamis, dan penginputan lembar nilai mutu perkuliahan.

graph TD
    A[DOSEN] --> B[Dashboard Dosen PA]
    A --> C[Presensi Kelas]
    A --> D[Lembar Penilaian]


Role Admin (BAAK)

Admin BAAK bertanggung jawab atas pemeliharaan katalog data master akademik, penugasan dosen pengampu, serta alokasi ruang dan waktu perkuliahan.

graph TD
    A[ADMIN BAAK] --> B[Dashboard Admin]
    A --> C[Master Data]
    C --> C1[Master Data Mata Kuliah]
    C --> C2[Master Data Dosen & Pengampu]
    C --> C3[Master Penjadwalan & Ruang]


Fungsi Setiap Menu

Menu

Role

Fungsi

Login Multi-Role

Semua Role

Autentikasi tunggal akun civitas akademika dengan validasi kredensial dan pengamanan OTP/2FA.

Gate Launcher Hub

Semua Role

Portal Single Sign-On (SSO) untuk navigasi cepat menuju subsistem SIAKAD, LMS, Library, dan Karir.

Dashboard Mahasiswa

Mahasiswa

Menyajikan ringkasan profil, IPK kumulatif, total SKS lulus, grafik tren IPS, dan kartu jadwal harian.

KRS Online

Mahasiswa

Memilih kelas mata kuliah semester aktif, validasi prasyarat otomatis, dan pengajuan persetujuan ke Dosen PA.

KHS & Transkrip

Mahasiswa

Menampilkan rincian nilai mutu semesteran dan fasilitas cetak dokumen transkrip nilai sementara.

Presensi Mahasiswa

Mahasiswa

Memindai kode QR absensi kehadiran tatap muka pada ruang kelas perkuliahan.

SIM Keuangan

Mahasiswa

Memeriksa rincian tagihan UKT, kode Virtual Account (VA), dan bukti pelunasan digital.

Dashboard Dosen PA

Dosen

Memantau grafik performa IPK mahasiswa asuh dan mengelola antrean verifikasi persetujuan KRS.

Presensi Kelas

Dosen

Mengaktifkan sesi perkuliahan tatap muka dengan membuat kode QR absensi dinamis di kelas.

Lembar Penilaian

Dosen

Menginput komponen nilai (Tugas, Kuis, UTS, UAS) dengan konversi otomatis ke bobot huruf mutu.

Master Data Mata Kuliah

Admin BAAK

Mengelola CRUD mata kuliah, penetapan bobot SKS, sifat wajib/pilihan, semester paket, dan prasyarat.

Master Dosen & Pengampu

Admin BAAK

Mengalokasikan penugasan dosen pengajar ke masing-masing kelas paralel perkuliahan.

Master Penjadwalan & Ruang

Admin BAAK

Menentukan jadwal hari, jam kuliah, alokasi ruang teori/laboratorium, dan validasi bentrok jadwal.

2. Konsep Relasi Database Sederhana (ER-D Mermaid.js)

Bagan ER-D berikut menggambarkan entitas data inti beserta relasi kardinalitas antartabel di dalam basis data SIAKAD:

erDiagram
    MAHASISWA ||--o{ KRS : "mengajukan"
    MATAKULIAH ||--o{ KRS : "terdaftar_di"
    DOSEN ||--o{ MATAKULIAH : "mengampu"
    DOSEN ||--o{ MAHASISWA : "membimbing_PA"
    MAHASISWA ||--o{ TAGIHAN : "memiliki"
    RUANG ||--o{ JADWAL : "digunakan"
    MATAKULIAH ||--o{ JADWAL : "dijadwalkan"
    MAHASISWA ||--o{ PRESENSI : "mencatatkan"
    JADWAL ||--o{ PRESENSI : "memiliki_sesi"

    MAHASISWA {
        string nim PK
        string nama
        string program_studi
        int angkatan
        float ipk_kumulatif
        string status_registrasi
        string nidn_dosen_pa FK
    }

    DOSEN {
        string nidn PK
        string nama_lengkap
        string program_studi
        string email_institusi
    }

    MATAKULIAH {
        string kode_mk PK
        string nama_matakuliah
        int bobot_sks
        int semester_paket
        string sifat_mk
    }

    KRS {
        string id_krs PK
        string nim FK
        string kode_mk FK
        string tahun_akademik
        string status_approval
        float nilai_angka
        string nilai_huruf
    }

    TAGIHAN {
        string id_tagihan PK
        string nim FK
        decimal total_nominal
        string nomor_va
        date batas_pembayaran
        string status_lunas
    }

    RUANG {
        string kode_ruang PK
        string nama_ruang
        string gedung
        int kapasitas
    }

    JADWAL {
        string id_jadwal PK
        string kode_mk FK
        string kode_ruang FK
        string hari
        time jam_mulai
        time jam_selesai
    }

    PRESENSI {
        string id_presensi PK
        string nim FK
        string id_jadwal FK
        datetime waktu_presensi
        string status_kehadiran
    }


3. Keterangan Entitas

Entitas

Fungsi

MAHASISWA

Menyimpan identitas data pokok mahasiswa, status akademik aktif/cuti, dan relasi Dosen PA.

DOSEN

Menyimpan biodata tenaga pengajar, email institusi, dan program studi naungan.

MATAKULIAH

Menyimpan katalog kurikulum mata kuliah, semester paket, dan bobot kredit SKS.

KRS

Menyimpan data pengambilan kelas mata kuliah per semester, status verifikasi, dan perolehan nilai.

TAGIHAN

Menyimpan faktur tagihan UKT, batas tempo pelunasan, dan kode bayar Virtual Account.

RUANG

Menyimpan inventaris ruangan perkuliahan, kode gedung, dan batas kapasitas mahasiswa.

JADWAL

Menyimpan penetapan jadwal perkuliahan terintegrasi antara mata kuliah, ruang, hari, dan jam.

PRESENSI

Menyimpan rekaman presensi kehadiran mahasiswa pada setiap sesi jadwal kelas tatap muka.

4. Relasi Utama Antarentitas

DOSEN dapat menjadi pembimbing akademik (PA) bagi banyak MAHASISWA.

DOSEN dapat ditugaskan untuk mengampu satu atau lebih MATAKULIAH.

MAHASISWA dapat mengajukan banyak mata kuliah ke dalam lembar KRS.

MATAKULIAH dapat tercantum pada banyak lembar KRS mahasiswa.

MAHASISWA memiliki satu atau banyak kewajiban pembayaran pada tabel TAGIHAN.

MATAKULIAH dialokasikan waktu pelaksanaannya ke dalam satu atau lebih jadwal perkuliahan (JADWAL).

RUANG digunakan untuk memfasilitasi banyak pertemuan sesi kelas perkuliahan pada JADWAL.

MAHASISWA mencatatkan riwayat presensi kehadiran pada tabel PRESENSI sesuai sesi JADWAL yang aktif.

5. UI Wireframing & Prototyping (Google Stitch)

Tahap perancangan antarmuka awal dieksplorasi secara tangkas menggunakan Google Stitch:

Penyusunan Tata Letak Cepat: Merancang kerangka visual dan hierarki tata letak halaman secara instan sebelum masuk ke tahap styling detail.

Skema Komponen Polimorfik: Menguji fleksibilitas tata letak komponen tabel data, kartu matriks informasi, dan formulir isian pada berbagai resolusi.

Pemetaan User Flow Antarmuka Admin: Merancang alur transisi interaksi dari katalog Master Data menuju formulir penambahan mata kuliah dan pop-up dialog konfirmasi hapus data.

6. Design System & Spesifikasi UI (Figma)

Desain antarmuka difinalisasi di Figma menggunakan tema Frosted Glassmorphism, memadukan visual kontainer kaca semi-transparan dengan aksen latar perpustakaan akademik modern:

A. Palet Warna (Color Palettes)

Primary Color (#0055A5): Royal Blue — Warna primer identitas kampus untuk tombol aksi utama (primary button), navigasi aktif, dan kartu fokus.

Dark Text (#0F172A): Slate Dark — Warna utama tipografi judul dan teks tabel data demi keterbacaan optimal sesuai standar kontras WCAG.

Success Color (#10B981): Emerald Green — Indikator status lunas UKT, verifikasi KRS disetujui, dan badge kehadiran mahasiswa.

Danger Color (#E11D48): Crimson Red — Tombol aksi destruktif (hapus/batal), peringatan tunggakan, dan penolakan berkas.

Glass Container: Kontainer semi-transparan rgba(255, 255, 255, 0.75) dengan filter backdrop-filter: blur(16px) serta garis tepi tipis 1px solid rgba(255, 255, 255, 0.4).

B. Skala Tipografi (Typography Hierarchy)

Font Family: Inter / Plus Jakarta Sans

Heading 1: 24px • Bold • Line-height 120% (Judul Halaman Kerja)

Heading 2: 18px • SemiBold • Line-height 130% (Judul Bagian/Kartu Modul & Header Tabel)

Body Text: 14px • Regular • Line-height 150% (Isi Data Tabel & Formulir Isian)

Caption / Meta: 12px • Medium • Line-height 140% (Label Badge, Tanggal, dan Kode Singkat)

C. Komponen Modular Reusable (UI Kit)

Primary Button: Latar solid #0055A5, teks tebal putih, dan kelengkungan sudut (border-radius) 10–12px.

Danger Button: Latar solid #E11D48, teks tebal putih, untuk aksi pembatalan atau hapus data.

Form Input Field: Kolom isian formulir dan pencarian berlatar semi-transparan dengan garis batas tipis serta ikon pendukung.

Frosted Glass Card: Kontainer kartu semi-transparan modular untuk mengelompokkan tabel data, metrik grafik, dan formulir pop-up.

7. Tautan Publik Proyek Figma

Seluruh kanvas rancangan High-Fidelity UI, alur layar (user flow), serta lembar acuan Design System dapat diakses secara interaktif melalui tautan publik berikut:

🔗 Link Figma Project:

[https://www.figma.com/design/e5p5K1YObMiKH3ejAiLm72/Untitled?node-id=0-1&t=aqj4J2iqFoWx85Mm-1]

(Pengaturan akses: Anyone with the link can view)

8. Dokumentasi Visual Antarmuka (High-Fidelity UI)

Berikut dokumentasi tangkapan layar implementasi antarmuka yang dirancang menggunakan Google Stitch dan disusun pada kanvas Figma:

A. Lembar Acuan Design System & UI Kit

B. High-Fidelity UI — Halaman Dashboard Mahasiswa

C. High-Fidelity UI — Halaman Data Master Mata Kuliah

D. Gambaran Kanvas Keseluruhan (All Screens & User Flow)