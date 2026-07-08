const TICKET_PRICE = 40000;
const SERVICE_FEE = 5000;
const DISCOUNT = 10000;

const query = new URLSearchParams(window.location.search);
const filmId = query.get("id") || "hailmary";
const seats = (query.get("kursi") || "D2,D3,D6,D7")
  .split(",")
  .map(seat => seat.trim())
  .filter(Boolean);

function rupiah(value) {
  return `Rp. ${value.toLocaleString("id-ID")}`;
}

function getDateText() {
  const rawDate = query.get("tanggal") || "Sabtu, 4 Juli 2026";
  return rawDate.includes("2026") ? rawDate : `${rawDate} 2026`;
}

function getTimeText() {
  return (query.get("waktu") || "17:30").replace(".", ":");
}

function renderPaymentSummary() {
  const film = allFilms[filmId] || allFilms.hailmary || Object.values(allFilms)[0];
  const ticketSubtotal = seats.length * TICKET_PRICE;
  const total = ticketSubtotal + SERVICE_FEE - DISCOUNT;
  const seatText = seats.join(", ");
  const dateText = getDateText();
  const timeText = getTimeText();

  document.title = `Ringkasan Pembayaran - ${film.title}`;

  const poster = document.getElementById("filmPoster");
  poster.src = film.poster;
  poster.alt = `Poster ${film.title}`;

  document.getElementById("filmTitle").textContent = film.title;
  document.getElementById("filmSchedule").textContent = `${dateText} - ${timeText}`;
  document.getElementById("seatList").textContent = seatText;
  document.getElementById("ticketCount").textContent = seats.length;
  document.getElementById("ticketPrice").textContent = `${rupiah(TICKET_PRICE)} x ${seats.length}`;
  document.getElementById("ticketSubtotal").textContent = rupiah(ticketSubtotal);
  document.getElementById("serviceFee").textContent = rupiah(SERVICE_FEE);
  document.getElementById("discount").textContent = `- ${rupiah(DISCOUNT)}`;
  document.getElementById("totalPayment").textContent = rupiah(total);

  document.getElementById("sideFilmTitle").textContent = film.title;
  document.getElementById("sideDate").textContent = dateText;
  document.getElementById("sideTime").textContent = timeText;
  document.getElementById("sideSeats").textContent = seatText;
}

document.addEventListener("DOMContentLoaded", renderPaymentSummary);
