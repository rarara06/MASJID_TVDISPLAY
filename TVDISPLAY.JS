document.addEventListener("DOMContentLoaded", async function () {
  let jadwal = {}; // Jadwal shalat global

  // === Fungsi Ambil Waktu Shalat dari API ===
  function capitalizeFirst(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  async function fetchWaktuShalat() {
    try {
      const response = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Tasikmalaya&country=Indonesia&method=20");
      const data = await response.json();

      // Simpan jadwal
      jadwal = {
        shubuh: data.data.timings.Fajr,
        dzuhur: data.data.timings.Dhuhr,
        ashar: data.data.timings.Asr,
        maghrib: data.data.timings.Maghrib,
        isya: data.data.timings.Isha
      };

      // Tampilkan di HTML
      document.getElementById("shubuh").textContent = jadwal.shubuh;
      document.getElementById("dzuhur").textContent = jadwal.dzuhur;
      document.getElementById("ashar").textContent = jadwal.ashar;
      document.getElementById("maghrib").textContent = jadwal.maghrib;
      document.getElementById("isya").textContent = jadwal.isya;
    } catch (error) {
      console.error("Gagal ambil data waktu shalat:", error);
    }
  }

  // === Fungsi Hitung Waktu Menuju Shalat Berikutnya ===
  function getNextPrayer() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const entries = Object.entries(jadwal);

    for (let [name, time] of entries) {
      const [h, m] = time.split(':');
      const prayerTime = new Date(`${today}T${h}:${m}:00`);
      if (now < prayerTime) {
        return { name, time: prayerTime };
      }
    }

    // Semua lewat → kembali ke shubuh besok
    const [h, m] = jadwal.shubuh.split(':');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const prayerTime = new Date(`${tomorrow.toISOString().split('T')[0]}T${h}:${m}:00`);
    return { name: 'shubuh', time: prayerTime };
  }

  // === Countdown Menuju Waktu Shalat ===
  function updateCountdown() {
    const { name, time } = getNextPrayer();
    const now = new Date();
    const diff = time - now;

    const hours = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, '0');
    const minutes = String(Math.floor(diff / 1000 / 60) % 60).padStart(2, '0');
    const seconds = String(Math.floor(diff / 1000) % 60).padStart(2, '0');

    document.getElementById('countdown').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('next-shalat').textContent = capitalizeFirst(name);
  }

  // Quotes Carousel
  const quotes = [
    "Dirimu mungkin tak membangun masjid sepenuhnya, tapi setiap rupiah infaqmu ikut mendirikan istanamu di surga.",
    "Jangan takut memberi, karena sedekah tidak pernah mengurangi harta. Justru Allah akan melipatgandakan, membersihkan jiwa, dan membuka pintu-pintu rezeki yang tak disangka-sangka.",
    "Orang yang yakin pada janji Allah, tidak ragu untuk berinfaq. Karena ia tahu, setiap rupiah yang ia keluarkan bukan hilang, melainkan ditanam untuk panen di akhirat nanti.",
    "Shalat menegakkan hubungan kita dengan Allah. Tapi jangan lupa, kepedulian melalui infaq dan sedekah adalah bukti bahwa ibadah kita hidup dalam tindakan.",
    "Ketika kita wafat, semua amal terputus kecuali sedekah jariyah, ilmu yang bermanfaat, dan doa anak yang sholeh. Maka jadikan infaqmu bagian dari amalan abadi.",
    "Satu infaq di jalan Allah, seperti menanam satu biji yang tumbuh menjadi tujuh tangkai, dan tiap tangkai memiliki seratus biji. Allah lipat gandakan bagi siapa yang Dia kehendaki.",
    "Shalat menguatkan ruhani, infaq menguatkan ukhuwah. Saat keduanya berjalan seiring, maka hidup tak hanya dipenuhi keberkahan, tapi juga membawa manfaat untuk sesama.",
    "Tak ada satu rupiah pun yang kau infaqkan, kecuali dicatat oleh Allah. Sekecil apapun pemberianmu, selama dari hati yang ikhlas, pahalanya lebih besar dari dunia dan isinya.",
    "Tiada amal yang lebih dicintai Allah di hari Jumat selain sedekah.",
    "Saat Allah memberimu rezeki, itu bukan hanya untukmu. Di dalamnya ada hak orang lain. Maka berbagi bukan kehilangan, tapi wujud dari rasa syukur yang sebenarnya.",
    "Shalat mengajarkan kita tunduk kepada Allah, dan infaq mengajarkan kita peduli kepada sesama. Keduanya seperti dua sayap yang akan menerbangkan kita menuju ridha-Nya."
  ];

  const carouselContainer = document.getElementById("quote-carousel");
  carouselContainer.innerHTML = '';

  quotes.forEach((text, i) => {
    const div = document.createElement("div");
    div.classList.add("quote-item");
    if (i === 0) div.classList.add("active");
    div.textContent = text;
    carouselContainer.appendChild(div);
  });

  let currentQuoteIndex = 0;
  setInterval(() => {
    const items = document.querySelectorAll('.quote-item');
    items[currentQuoteIndex].classList.remove('active');
    currentQuoteIndex = (currentQuoteIndex + 1) % items.length;
    items[currentQuoteIndex].classList.add('active');
  }, 15000); // Ganti quote setiap 15 detik

  // === Jalankan ===
  await fetchWaktuShalat();
  setInterval(fetchWaktuShalat, 3600000); // update tiap jam
  setInterval(updateCountdown, 1000); // update detik
  updateCountdown();
});
