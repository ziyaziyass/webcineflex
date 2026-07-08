function getFilmIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "hyakuemu";
}

function renderFilmDetail(data) {
  document.getElementById("filmTitle").textContent = data.title;
  document.getElementById("filmRating").textContent = data.rating;
  document.getElementById("filmGenre").textContent = data.genre;
  document.getElementById("filmScore").innerHTML = `${data.score} <span class="star">&#9733;</span>`;
  document.getElementById("filmDirector").textContent = data.director;
  document.getElementById("filmCast").textContent = data.cast;
  document.getElementById("filmSinopsis").textContent = data.sinopsis;

  const posterEl = document.getElementById("posterImg");
  posterEl.src = data.poster;
  posterEl.alt = `Poster ${data.title}`;

  const trailerThumbEl = document.getElementById("trailerThumb");
  trailerThumbEl.src = data.trailerThumb;
  trailerThumbEl.alt = `Trailer ${data.title}`;

  document.getElementById("trailerVideo").src = "";
  document.title = `${data.title} - Detail Streaming`;
}

document.addEventListener("DOMContentLoaded", () => {
  const filmId = getFilmIdFromUrl();
  const data = allFilms[filmId];

  if (!data) {
    document.querySelector(".info-col").innerHTML = "<p>Film tidak ditemukan.</p>";
    return;
  }

  renderFilmDetail(data);

  const trailerBox = document.getElementById("trailerBox");
  const playBtn = document.getElementById("playBtn");
  const video = document.getElementById("trailerVideo");
  const watchPartyBtn = document.getElementById("watchPartyBtn");

  function playTrailer() {
    if (trailerBox.classList.contains("playing")) return;

    trailerBox.classList.add("playing");
    video.style.display = "block";
    video.src = `${data.trailerVideo}?autoplay=1&mute=1`;
  }

  playBtn.addEventListener("click", event => {
    event.stopPropagation();
    playTrailer();
  });

  trailerBox.addEventListener("click", playTrailer);

  document.querySelector(".btn-stream").addEventListener("click", () => {
    window.location.href = `streamingfilm.html?id=${data.id}`;
  });

  watchPartyBtn.addEventListener("click", () => {
    window.location.href = `watchparty.html?id=${data.id}`;
  });
});
