# PRD: Website "Confession Page" (Nembak Gebetan)

## 1. Latar Belakang & Tujuan
Membuat website personal, romantis, dan interaktif untuk menyatakan perasaan ke seseorang secara kreatif. Website ini hanya akan diakses oleh 2 orang: pengirim (owner) dan penerima (target/gebetan). Tujuan utama: memberikan pengalaman yang berkesan, DAN memastikan pengirim bisa mengetahui jawaban penerima secara otomatis tanpa harus menunggu di depan layar.

## 2. Target Pengguna
- **Pengirim**: pemilik web, hanya butuh akses ke halaman admin/notifikasi.
- **Penerima**: menerima link unik, mengalami flow cerita → pertanyaan → konfirmasi.

## 3. User Flow
Flow dibuat singkat & to the point — tanpa halaman story/cerita atau galeri foto, langsung ke inti.

1. **Landing Page** — tampilan bersih, sapaan singkat personal, satu tombol "Buka" untuk lanjut. Tanpa foto carousel, tanpa musik, tanpa ilustrasi berlebihan.
2. **The Question Page** — pertanyaan inti (mis. "Maukah kamu jadi pacarku?") dengan 2 tombol:
   - Tombol **"Iya"** — normal, statis.
   - Tombol **"Nggak"** — playful: menghindar/pindah posisi setiap kali kursor/jari mendekat (di mobile: teleport ke posisi random tiap tap-miss). Tombol "Iya" boleh membesar sedikit tiap tombol "Nggak" gagal diklik.
3. **Response Capture** — begitu tombol ditekan (Iya, atau Nggak jika akhirnya berhasil diklik), simpan jawaban ke database beserta timestamp, lalu redirect ke halaman hasil.
4. **Result Page** — beda animasi & copy tergantung jawaban:
   - **Jika "Iya"**: full-screen animasi kembang api / burst hati (pakai library seperti `canvas-confetti`), teks singkat & bold (mis. "Yeay!").
   - **Jika "Nggak"**: animasi berbeda, lebih tenang — partikel jatuh/fade (bukan kembang api), teks netral singkat (mis. "Oke, makasih ya").
5. **Notifikasi ke Pengirim** — begitu response tersimpan, trigger notifikasi otomatis ke pengirim (lihat Section 6).
6. **Admin/Recap Page** (khusus pengirim, protected) — halaman terpisah (mis. `/admin` atau `/lihat-jawaban`), password sederhana, tampilan netral (putih/abu, beda tema dari halaman utama), menampilkan jawaban + waktu dijawab. Berguna sebagai backup kalau notifikasi gagal.

## 4. Fitur Wajib (Must Have)
- [ ] Landing page singkat & bersih (sapaan personal, satu tombol lanjut, tanpa elemen berlebihan)
- [ ] Halaman pertanyaan dengan tombol "Nggak" yang menghindar (playful UX)
- [ ] Animasi hasil yang berbeda untuk tiap jawaban: kembang api/burst hati untuk "Iya", partikel jatuh/fade untuk "Nggak"
- [ ] Penyimpanan jawaban ke database (bukan cuma di frontend/localStorage — harus persist di server)
- [ ] Notifikasi otomatis ke pengirim saat dijawab (Telegram Bot / Email — lihat Section 6)
- [ ] Halaman admin dengan proteksi password sederhana untuk cek ulang jawaban
- [ ] Mobile-first & responsive (asumsi penerima buka dari HP)
- [ ] Anti-duplikat sederhana: setelah dijawab, halaman pertanyaan tidak bisa dijawab ulang dari device yang sama (opsional, pakai cookie/localStorage flag)

## 5. Fitur Opsional (Nice to Have)
- [ ] Countdown/reveal effect singkat sebelum pertanyaan muncul
- [ ] Custom kolom pesan balasan dari penerima (textarea opsional sebelum submit)
- [ ] Dark/light theme toggle
- [ ] Sound effect singkat (bukan musik latar) saat animasi hasil muncul

## 6. Mekanisme Notifikasi Jawaban (PENTING)
Karena pengirim tidak akan standby menunggu di browser, gunakan salah satu (rekomendasi: opsi A):

**Opsi A — Telegram Bot (Rekomendasi, gratis & realtime)**
- Buat bot via @BotFather, dapatkan `BOT_TOKEN` dan `CHAT_ID` pengirim.
- Saat jawaban disubmit, backend (API route / Supabase Edge Function) memanggil Telegram Bot API `sendMessage` berisi: jawaban + waktu + pesan opsional dari penerima.
- Pengirim langsung dapat notifikasi di HP seperti chat biasa.

**Opsi B — Email (Resend / EmailJS)**
- Saat submit, trigger email otomatis ke alamat email pengirim berisi ringkasan jawaban.
- Cocok kalau tidak mau setup bot Telegram.

**Opsi C — Admin Dashboard saja (fallback minimal)**
- Tidak ada notifikasi push, pengirim harus cek manual ke `/admin` pakai password.
- Paling simpel tapi butuh cek manual berkala.

> Rekomendasi: pakai **Opsi A + C sekaligus** — notifikasi instan lewat Telegram, dan dashboard admin sebagai cadangan kalau notifikasi gagal terkirim.

## 7. Struktur Data (Database)
Tabel `responses`:
| Field | Tipe | Keterangan |
|---|---|---|
| id | uuid | primary key |
| answer | text | 'yes' / 'no' |
| message | text (nullable) | pesan opsional dari penerima |
| answered_at | timestamp | waktu jawaban disubmit |
| dodged_count | integer (nullable) | opsional: berapa kali tombol "Nggak" berhasil dihindari, buat lucu-lucuan di notifikasi |

## 8. Tech Stack yang Disarankan
- **Frontend**: Next.js (App Router) + Tailwind CSS + Framer Motion (untuk animasi)
- **Database**: Supabase (Postgres) — sudah familiar dengan stack ini
- **Notifikasi**: Telegram Bot API (via Supabase Edge Function atau Next.js API Route)
- **Hosting**: Vercel (deploy gratis, custom domain opsional)
- **Auth halaman admin**: simple password gate (env variable), tidak perlu auth system kompleks karena cuma 1 user

## 9. Non-Functional Requirements
- Load time cepat (< 2 detik di koneksi mobile biasa)
- Tidak boleh ada indexing oleh search engine (tambahkan `robots.txt` disallow / meta noindex) — ini halaman privat
- Link akses sebaiknya pakai slug unik/acak (bukan domain root), supaya tidak sembarang orang bisa buka
- Semua environment secret (Telegram token, DB key) disimpan di environment variables, TIDAK di-hardcode di kode frontend

## 10. Kriteria Sukses (Definition of Done)
- Penerima bisa membuka link dari HP tanpa error, semua animasi jalan mulus
- Jawaban tersimpan permanen di database walau browser ditutup setelahnya
- Pengirim menerima notifikasi dalam < 1 menit setelah dijawab
- Pengirim bisa cek ulang jawaban kapan saja lewat halaman admin

## 11. Placeholder yang Perlu Diisi Sebelum Development
- Nama pengirim: `[NAMA_KAMU]`
- Nama penerima: `[NAMA_GEBETAN]`
- Pesan/isi cerita di landing & story page: `[CERITA_KAMU]`
- Foto-foto yang mau dipakai
- Pertanyaan final: `[PERTANYAAN]` (default: "Maukah kamu jadi pacarku?")
