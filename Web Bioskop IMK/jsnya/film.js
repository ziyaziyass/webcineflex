document.addEventListener("DOMContentLoaded", () => {
  const FAVORITE_KEY = "cineflexFavorites";
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".film-card");

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

  function setFavoriteButtonState(button, liked) {
    button.classList.toggle("liked", liked);
    button.querySelector("span").textContent = liked ? "\u2665" : "\u2661";
  }

  function toggleFavorite(id) {
    const ids = getFavoriteIds();
    const exists = ids.includes(id);
    const next = exists ? ids.filter(item => item !== id) : [...ids, id];

    saveFavoriteIds(next);
    return !exists;
  }

  filterButtons.forEach((button, index) => {
    const filters = ["semua", "tayang", "akan"];
    button.dataset.filter = filters[index];

    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      cards.forEach(card => {
        const show = filter === "semua" || card.dataset.status === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  document.querySelectorAll(".favorite-btn").forEach(button => {
    const card = button.closest(".film-card");
    const id = card?.dataset.film;

    if (!id) return;

    setFavoriteButtonState(button, getFavoriteIds().includes(id));

    button.addEventListener("click", event => {
      event.stopPropagation();
      setFavoriteButtonState(button, toggleFavorite(id));
    });
  });

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.film;

      if (!id) return;

      window.location.href = `detailfilm.html?id=${id}`;
    });
  });
});
