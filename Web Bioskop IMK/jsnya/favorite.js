const FAVORITE_KEY = "cineflexFavorites";

function getFavoriteIds() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveFavoriteIds(ids) {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(ids));
}

function removeFavorite(id) {
  saveFavoriteIds(getFavoriteIds().filter(item => item !== id));
  renderFavorites();
}

function getShortGenre(genre) {
  return genre.split(",").slice(0, 2).map(item => item.trim()).join(", ");
}

function getDurationText(duration) {
  if (!duration || duration === "TBA") return "TBA";
  return duration.replace(" Menit", " Mins");
}

function getAddedDate(index) {
  return `Ditambahkan ${index + 1} Juli 2026`;
}

function createFavoriteCard(film, index) {
  const card = document.createElement("article");
  card.className = "favorite-card";
  card.dataset.type = "film";

  card.innerHTML = `
    <button class="favorite-heart" type="button" aria-label="Hapus ${film.title} dari favorit">♥</button>
    <div class="favorite-main">
      <img class="favorite-poster" src="${film.poster}" alt="Poster ${film.title}">
      <div class="favorite-info">
        <a class="favorite-title" href="detailfilm.html?id=${film.id}">${film.title}</a>
        <div class="favorite-rating">★ 4.7 <small>(2.4k)</small></div>
        <p class="favorite-meta">${getShortGenre(film.genre)}</p>
        <p class="favorite-meta">${getDurationText(film.duration)}</p>
        <p class="favorite-meta">${film.rating}</p>
      </div>
    </div>
    <div class="card-actions">
      <a class="detail-btn" href="detailfilm.html?id=${film.id}">Detail</a>
      <button class="remove-btn" type="button">Hapus dari Favorit</button>
    </div>
    <p class="favorite-date">${getAddedDate(index)}</p>
  `;

  card.querySelector(".favorite-heart").addEventListener("click", () => removeFavorite(film.id));
  card.querySelector(".remove-btn").addEventListener("click", () => removeFavorite(film.id));

  return card;
}

function updateFilterCounts(favoriteCount) {
  document.querySelector('[data-filter="semua"]').textContent = `Semua (${favoriteCount})`;
  document.querySelector('[data-filter="film"]').textContent = `Film (${favoriteCount})`;
  document.querySelector('[data-filter="tv"]').textContent = "TV Show (0)";
  document.querySelector('[data-filter="streaming"]').textContent = "Streaming (0)";
}

function applyFilter(filter) {
  const cards = document.querySelectorAll(".favorite-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const show = filter === "semua" || card.dataset.type === filter;
    card.style.display = show ? "" : "none";
    if (show) visibleCount++;
  });

  document.getElementById("emptyState").style.display = visibleCount ? "none" : "block";
}

function renderFavorites() {
  const grid = document.getElementById("favoriteGrid");
  const subtitle = document.getElementById("favoriteSubtitle");
  const ids = getFavoriteIds().filter(id => allFilms[id]);
  const activeFilter = document.querySelector(".filter-tab.active")?.dataset.filter || "semua";

  saveFavoriteIds(ids);
  grid.innerHTML = "";

  ids.forEach((id, index) => {
    grid.appendChild(createFavoriteCard(allFilms[id], index));
  });

  subtitle.textContent = `Kelola film dan acara favoritmu. Kamu memiliki ${ids.length} film favorit.`;
  updateFilterCounts(ids.length);
  applyFilter(activeFilter);
}

document.addEventListener("DOMContentLoaded", () => {
  renderFavorites();

  document.querySelectorAll(".filter-tab").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach(tab => tab.classList.remove("active"));
      button.classList.add("active");
      applyFilter(button.dataset.filter);
    });
  });

  document.getElementById("searchInput").addEventListener("input", event => {
    const keyword = event.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".favorite-card");
    let visibleCount = 0;

    cards.forEach(card => {
      const title = card.querySelector(".favorite-title").textContent.toLowerCase();
      const show = title.includes(keyword);
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    document.getElementById("emptyState").style.display = visibleCount ? "none" : "block";
  });
});
