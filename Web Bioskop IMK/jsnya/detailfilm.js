// =========================
// DETAIL FILM
// Menggunakan data dari films.js
// =========================

// Ambil id film dari URL
function getFilmIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Render data film
function renderFilmDetail(data) {
    document.getElementById("filmTitle").textContent = data.title;
    document.getElementById("filmRating").textContent = data.rating;
    document.getElementById("filmGenre").textContent = data.genre;

    document.getElementById("filmScore").innerHTML =
        `${data.score} <span class="star">★</span>`;

    document.getElementById("filmDirector").textContent = data.director;
    document.getElementById("filmCast").textContent = data.cast;
    document.getElementById("filmSinopsis").textContent = data.sinopsis;

    const posterEl = document.getElementById("posterImg");
    posterEl.src = data.poster;
    posterEl.alt = `Poster ${data.title}`;

    const trailerThumbEl = document.getElementById("trailerThumb");
    trailerThumbEl.src = data.trailerThumb;
    trailerThumbEl.alt = `Trailer ${data.title}`;

    const trailer = document.getElementById("trailerVideo");
    trailer.src = "";

    document.title = `${data.title} - Detail Film`;
}

// =========================
// Saat halaman dibuka
// =========================
document.addEventListener("DOMContentLoaded", () => {

    // Ambil id film
    const filmId = getFilmIdFromUrl();

    // Ambil data dari films.js
    const data = allFilms[filmId];

    // Jika film tidak ditemukan
    if (!data) {
        document.querySelector(".info-col").innerHTML =
            "<p>Film tidak ditemukan.</p>";
        return;
    }

    // Tampilkan data
    renderFilmDetail(data);

    // =========================
    // Trailer
    // =========================
    const trailerBox = document.getElementById("trailerBox");
    const playBtn = document.getElementById("playBtn");
    const video = document.getElementById("trailerVideo");

    function playTrailer() {
        if (trailerBox.classList.contains("playing")) return;

        trailerBox.classList.add("playing");

        video.style.display = "block";
        video.src = `${data.trailerVideo}?autoplay=1&mute=1`;
    }

    playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        playTrailer();
    });

    trailerBox.addEventListener("click", playTrailer);

    // =========================
    // Tombol Pesan Tiket
    // =========================
    const btnJadwal = document.querySelector(".btn-jadwal");

    btnJadwal.addEventListener("click", () => {
        window.location.href = `jadwal.html?id=${data.id}`;
    });

});