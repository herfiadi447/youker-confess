# Prompt untuk Stitch — Desain UI Web "Confession Page" (Revisi: Simple & To The Point)

Copy-paste teks di bawah ini ke Stitch. Ganti bagian `[...]` sesuai kebutuhan.

---

**PROMPT:**

Design a clean, minimal, mobile-first web app for a confession page (asking someone to be a girlfriend). Style: simple and modern, not overly cute or cheesy — soft neutral background (white/off-white or light pink), clean sans-serif typography, minimal decoration, generous white space. Think clean modern app UI, not a greeting card.

Design the following screens only:

1. **Landing Screen** — Full-screen, centered short greeting text (e.g. "Hi [Nama Gebetan]"), one short line of subtext, one clear "Buka" (Open) button. No illustrations, no clutter.

2. **The Question Screen** — Center of the screen: the question in large bold text (e.g. "Maukah kamu jadi pacarku?"). Below it, two buttons: a solid primary button "Iya" and a secondary outline button "Nggak". Keep it minimal — no decorative hearts or confetti on this screen, just clean layout.

3. **Answered "Yes" Screen** — Full-screen celebratory animation placeholder: fireworks-style burst of hearts/particles across the whole screen, short bold confirmation text in the center (e.g. "Yeay!"), one button to close/exit.

4. **Answered "No" Screen** — A different, distinct full-screen animation placeholder (not sad, not fireworks — something like a gentle falling/fading particle effect, muted color), short neutral text (e.g. "Oke, makasih ya"), one button to close/exit.

5. **Admin/Recap Screen** (utility screen, neutral tone: white/gray, no pastel) — Simple password input, then after login a card showing: the answer received and timestamp.

General UI notes:
- Mobile-first (390px width primary frame), adapts to desktop.
- Consistent button style (rounded, solid pill), one accent color only (e.g. rose/pink), rest neutral.
- Typography: one clean sans-serif font throughout, no script/cursive fonts.
- Annotate where animation happens (fireworks/hearts burst on Yes, falling particles on No) since Stitch generates static screens.
- No stock illustrations, no story/memories/photo-gallery screens — keep the flow to just: Landing → Question → Yes/No result.

---

### Tips pakai hasil dari Stitch
- Setelah dapat hasil desain, ambil style token-nya (warna, spacing, font), kasih ke AI coding agent bareng PRD biar hasil coding-nya konsisten.
- Buat animasi "Yes" (fireworks/hearts burst) dan "No" (falling/fading particles) nanti diimplementasikan pakai library animasi (misal canvas-confetti untuk Yes, particle sederhana untuk No) — Stitch cuma kasih gambaran statis layoutnya.
