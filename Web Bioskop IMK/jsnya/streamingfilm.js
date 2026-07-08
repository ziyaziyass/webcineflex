document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const filmId = params.get("id") || "hyakuemu";
  const data = allFilms[filmId] || allFilms.hyakuemu;
  const heroImage = document.getElementById("heroImage");

  function setImage(element, src, title) {
    element.src = src;
    element.alt = title;
  }

  document.title = `${data.title} - Streaming`;
  document.getElementById("movieTitle").textContent = data.title;
  document.getElementById("movieDuration").textContent = (data.duration || data.rating).toLowerCase();
  document.getElementById("movieDescription").textContent = data.sinopsis;

  setImage(heroImage, data.trailerThumb || data.poster, data.title);

  document.querySelector(".play-control").addEventListener("click", () => {
    const trailer = document.createElement("iframe");
    trailer.className = "hero-video";
    trailer.src = `${data.trailerVideo}?autoplay=1&mute=1`;
    trailer.title = `Streaming ${data.title}`;
    trailer.allow = "autoplay; encrypted-media";
    trailer.allowFullscreen = true;
    trailer.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0;background:#000;";

    document.getElementById("heroPlayer").appendChild(trailer);
    document.querySelector(".play-control").style.display = "none";
  });

  document.getElementById("openWatchParty").addEventListener("click", () => {
    window.location.href = `watchparty.html?id=${data.id}`;
  });

  const recommendations = Object.values(allFilms).filter(film => film.id !== data.id).slice(0, 5);
  const recommendationRow = document.getElementById("recommendationRow");

  recommendations.forEach(film => {
    const link = document.createElement("a");
    link.className = "recommendation-card";
    link.href = `detailstream.html?id=${film.id}`;
    link.innerHTML = `
      <img src="${film.trailerThumb || film.poster}" alt="${film.title}">
      <h3>${film.title}</h3>
    `;
    recommendationRow.appendChild(link);
  });
});
