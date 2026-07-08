document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const filmId = params.get("id") || "hyakuemu";
  const data = allFilms[filmId] || allFilms.hyakuemu;
  const poster = data.trailerThumb || data.poster;

  document.title = `${data.title} - Watch Party`;
  document.getElementById("partyTitle").textContent = data.title;
  document.getElementById("partyGenre").textContent = data.genre.split(",").slice(0, 2).map(item => item.trim()).join(", ");
  document.getElementById("partyDuration").textContent = data.duration || data.rating;

  const partyPoster = document.getElementById("partyPoster");
  partyPoster.src = poster;
  partyPoster.alt = data.title;

  const partyMainImage = document.getElementById("partyMainImage");
  partyMainImage.src = poster;
  partyMainImage.alt = data.title;

  document.querySelector(".chat-form").addEventListener("submit", event => {
    event.preventDefault();
  });

  document.getElementById("startParty").addEventListener("click", () => {
    window.location.href = `streamingfilm.html?id=${data.id}`;
  });
});
