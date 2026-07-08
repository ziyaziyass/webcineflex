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

function goToDetailStream(id) {
    if (!id || !allFilms[id]) return;
    window.location.href = `detailstream.html?id=${id}`;
}

(function () {
    const track = document.getElementById("tayangTrack");

    if (!track) return;

    const cards = Array.from(track.children);
    const prevBtn = document.getElementById("tayangPrev");
    const nextBtn = document.getElementById("tayangNext");
    const VISIBLE = 4;
    const STEP = 1;
    let index = 0;

    function update() {
        const gap = parseFloat(
            getComputedStyle(track.parentElement.parentElement)
                .getPropertyValue("--tayang-gap")
        ) || 0;
        const cardWidth = cards[0].getBoundingClientRect().width;
        const offset = index * (cardWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;
    }

    function goTo(i) {
        const max = Math.max(0, cards.length - VISIBLE);
        index = Math.max(0, Math.min(i, max));
        update();
    }

    prevBtn.addEventListener("click", () => goTo(index - STEP));
    nextBtn.addEventListener("click", () => goTo(index + STEP));
    window.addEventListener("resize", update);
    update();
})();

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".buttoncar, .buttoncars").forEach(button => {
        button.addEventListener("click", event => {
            event.stopPropagation();
            goToDetailStream(button.dataset.film);
        });
    });

    document.querySelectorAll(".carousel-item").forEach(item => {
        item.style.cursor = "pointer";
        item.addEventListener("click", event => {
            if (event.target.closest("button")) return;
            goToDetailStream(item.dataset.film);
        });
    });

    document.querySelectorAll(".tayang-card").forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", event => {
            if (event.target.closest("button")) return;
            goToDetailStream(card.dataset.film);
        });
    });

    document.querySelectorAll(".favorite-btn").forEach(button => {
        const card = button.closest(".tayang-card");
        const id = card?.dataset.film;

        if (!id) return;

        setFavoriteButtonState(button, getFavoriteIds().includes(id));

        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            setFavoriteButtonState(button, toggleFavorite(id));
        });
    });
});
