// ==============================
// Slider Sedang Tayang
// ==============================

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


// ==============================
// Navigasi Film
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Tombol Detail Film
    // ==========================

    document.querySelectorAll(".buttoncars").forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.film;

            if (!id) return;

            window.location.href = `detailfilm.html?id=${id}`;

        });

    });


    // ==========================
    // Tombol Pesan Tiket
    // ==========================

    document.querySelectorAll(".buttoncar").forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.film;

            if (!id) return;

            window.location.href = `jadwal.html?id=${id}`;

        });

    });


    // ==========================
    // Klik Card Film
    // ==========================

    document.querySelectorAll(".tayang-card").forEach(card => {

        card.style.cursor = "pointer";

        card.addEventListener("click", (e) => {

            // Jika klik link di dalam card, biarkan default
            if (e.target.closest("a")) return;

            const id = card.dataset.film;

            if (!id) return;

            window.location.href = `detailfilm.html?id=${id}`;

        });

    });

    document.querySelectorAll(".favorite-btn").forEach(button => {

        const card = button.closest(".tayang-card");
        const id = card?.dataset.film;

        if (!id) return;

        setFavoriteButtonState(button, getFavoriteIds().includes(id));

        button.addEventListener("click", (e) => {

            e.preventDefault();
            e.stopPropagation();

            setFavoriteButtonState(button, toggleFavorite(id));

        });

    });

});
