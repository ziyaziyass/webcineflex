const PRICE = 40000;
const ROWS = ["A", "B", "C", "D", "E", "F", "G"];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8];
const OCCUPIED = ["E3", "E4", "E7", "E8"];
const DEFAULT_SELECTED = ["D2", "D3", "D6", "D7"];

const params = new URLSearchParams(window.location.search);
const filmId = params.get("id") || "hailmary";
const selectedSeats = new Set(DEFAULT_SELECTED);

function rupiah(value) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function getScheduleText() {
  const rawTanggal = params.get("tanggal") || "Sabtu, 4 Juli 2026";
  const rawWaktu = params.get("waktu") || "17:30";
  const tanggal = rawTanggal.includes("2026") ? rawTanggal : `${rawTanggal} 2026`;
  const waktu = rawWaktu.replace(".", ":");
  return `${tanggal}<br>${waktu}`;
}

function renderFilm() {
  const film = allFilms[filmId] || allFilms.hailmary || Object.values(allFilms)[0];

  document.title = `Pilih Kursi - ${film.title}`;
  document.getElementById("filmTitle").textContent = film.title;
  document.getElementById("filmGenre").textContent = film.genre;
  document.getElementById("filmSchedule").innerHTML = getScheduleText();

  const poster = document.getElementById("filmPoster");
  poster.src = film.poster;
  poster.alt = `Poster ${film.title}`;
}

function createSeatButton(code) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "seat";
  button.dataset.seat = code;
  button.setAttribute("aria-label", `Kursi ${code}`);

  if (OCCUPIED.includes(code)) {
    button.classList.add("occupied");
    button.disabled = true;
    button.setAttribute("aria-label", `Kursi ${code} terisi`);
  }

  if (selectedSeats.has(code)) {
    button.classList.add("selected");
  }

  button.addEventListener("click", () => {
    if (button.classList.contains("occupied")) return;

    if (selectedSeats.has(code)) {
      selectedSeats.delete(code);
      button.classList.remove("selected");
    } else {
      selectedSeats.add(code);
      button.classList.add("selected");
    }

    renderSummary();
  });

  return button;
}

function renderSeatMap() {
  const map = document.getElementById("seatMap");
  map.innerHTML = "";

  ROWS.forEach(row => {
    const label = document.createElement("div");
    label.className = "row-label";
    label.textContent = row;
    map.appendChild(label);

    COLS.forEach(col => {
      if (col === 5) {
        const aisle = document.createElement("div");
        map.appendChild(aisle);
      }

      map.appendChild(createSeatButton(`${row}${col}`));
    });
  });

  const blank = document.createElement("div");
  map.appendChild(blank);

  COLS.forEach(col => {
    if (col === 5) {
      const aisle = document.createElement("div");
      map.appendChild(aisle);
    }

    const label = document.createElement("div");
    label.className = "col-label";
    label.textContent = col;
    map.appendChild(label);
  });
}

function renderSummary() {
  const seats = Array.from(selectedSeats).sort();
  const selectedWrap = document.getElementById("selectedSeats");
  const total = seats.length * PRICE;

  selectedWrap.innerHTML = "";

  if (!seats.length) {
    const empty = document.createElement("span");
    empty.className = "empty-selected";
    empty.textContent = "Belum ada kursi dipilih";
    selectedWrap.appendChild(empty);
  } else {
    seats.forEach(seat => {
      const chip = document.createElement("span");
      chip.className = "selected-chip";
      chip.textContent = seat;
      selectedWrap.appendChild(chip);
    });
  }

  document.getElementById("ticketFormula").textContent = `${seats.length} x Rp.40.000`;
  document.getElementById("ticketSubtotal").textContent = rupiah(total);
  document.getElementById("paymentTotal").textContent = rupiah(total);
  document.getElementById("payBtn").disabled = seats.length === 0;
}

function clearSeats() {
  selectedSeats.clear();
  document.querySelectorAll(".seat.selected").forEach(seat => {
    seat.classList.remove("selected");
  });
  renderSummary();
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilm();
  renderSeatMap();
  renderSummary();

  document.getElementById("clearSeats").addEventListener("click", clearSeats);
  document.getElementById("payBtn").addEventListener("click", () => {
    const seats = Array.from(selectedSeats).sort();

    if (!seats.length) return;

    const nextParams = new URLSearchParams({
      id: filmId,
      tanggal: params.get("tanggal") || "Sabtu, 4 Juli 2026",
      waktu: params.get("waktu") || "17:30",
      kursi: seats.join(",")
    });

    window.location.href = `ringkasanpembayaran.html?${nextParams.toString()}`;
  });
});
