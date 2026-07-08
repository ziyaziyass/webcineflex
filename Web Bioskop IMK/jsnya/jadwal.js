
const tanggalList = [
  { day: "Senin", date: "29 Juni" },
  { day: "Selasa", date: "30 Juni" },
  { day: "Rabu", date: "1 Juli" },
  { day: "Kamis", date: "2 Juli" },
  { day: "Jumat", date: "3 Juli" },
  { day: "Sabtu", date: "4 Juli" },
  { day: "Minggu", date: "5 Juli" }
];

const waktuList = ["12.30", "15.00", "17.30", "20.00"];

// ============ HELPER ============
function getFilmIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

let selectedTanggal = null;
let selectedWaktu = null;

function updateKursiButton() {
  const btn = document.getElementById("btnKursi");
  btn.disabled = !(selectedTanggal && selectedWaktu);
}

function renderFilmInfo(data) {
  document.getElementById("filmTitle").textContent = data.title;
  document.getElementById("filmCinema").textContent = data.cinema;
  document.getElementById("filmSinopsis").textContent = data.sinopsis;

  const posterEl = document.getElementById("filmPoster");
  posterEl.src = data.poster;
  posterEl.alt = `Poster ${data.title}`;

  document.getElementById("filmCard").style.setProperty("--poster-bg", `url(${data.poster})`);
  document.title = `Jadwal - ${data.title}`;
}

function renderTanggal() {
  const row = document.getElementById("tanggalRow");
  row.innerHTML = "";

  tanggalList.forEach((item) => {
    const box = document.createElement("button");
    box.className = "option-box";
    box.innerHTML = `<span class="day">${item.day}</span><span>${item.date}</span>`;

    box.addEventListener("click", () => {
      row.querySelectorAll(".option-box").forEach((b) => b.classList.remove("selected"));
      box.classList.add("selected");
      selectedTanggal = `${item.day}, ${item.date}`;
      updateKursiButton();
    });

    row.appendChild(box);
  });
}

function renderWaktu() {
  const row = document.getElementById("waktuRow");
  row.innerHTML = "";

  waktuList.forEach((jam) => {
    const box = document.createElement("button");
    box.className = "option-box waktu";
    box.textContent = jam;

    box.addEventListener("click", () => {
      row.querySelectorAll(".option-box.waktu").forEach((b) => b.classList.remove("selected"));
      box.classList.add("selected");
      selectedWaktu = jam;
      updateKursiButton();
    });

    row.appendChild(box);
  });
}

// ============ JALANKAN SAAT HALAMAN DIBUKA ============
document.addEventListener("DOMContentLoaded", () => {
  const filmId = getFilmIdFromUrl();
  const data = allFilms[filmId];

  if (!data) {
    document.querySelector(".jadwal-wrapper").innerHTML = "<p>Film tidak ditemukan.</p>";
    return;
  }

  renderFilmInfo(data);
  renderTanggal();
  renderWaktu();
  updateKursiButton();

  document.getElementById("btnKursi").addEventListener("click", () => {
    if (!selectedTanggal || !selectedWaktu) return;
    const params = new URLSearchParams({
      id: filmId,
      tanggal: selectedTanggal,
      waktu: selectedWaktu
    });
    window.location.href = `pilihkursi.html?${params.toString()}`;
  });
});
