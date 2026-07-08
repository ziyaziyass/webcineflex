const movies = [
  {
    title: "Backroom",
    duration: "1 jam 45 menit",
    img: "https://images.unsplash.com/photo-1519074069390-8a9c7b1acce0?w=300&q=80",
    watched: false,
    category: "tayang"
  },
  {
    title: "Project Hail Mary",
    duration: "2 jam 15 menit",
    img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&q=80",
    watched: false,
    category: "tayang"
  },
  {
    title: "Chainsaw Man Reze Arc",
    duration: "1 jam 41 menit",
    img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&q=80",
    watched: false,
    category: "tayang"
  },
  {
    title: "Five Nights At Freddy's",
    duration: "1 jam 50 menit",
    img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=300&q=80",
    watched: true,
    category: "akan"
  }
];

const grid = document.getElementById("movieGrid");
const tabs = document.querySelectorAll(".tab");

function renderMovies(filter) {
  grid.innerHTML = "";
  const filtered = movies.filter(m => filter === "semua" ? true : m.category === filter);

  filtered.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <div class="poster-wrap" style="background-image:url('${movie.img}')">
        <div class="favorite-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 21s-7.5-4.6-10-9.3C.4 8.2 2 4.5 5.6 4 8 3.7 10 5 12 7.4 14 5 16 3.7 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"/>
          </svg>
        </div>
      </div>
      <div class="movie-info">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-duration ${movie.watched ? 'watched' : ''}">${movie.duration}</div>
      </div>
    `;

    const favIcon = card.querySelector(".favorite-icon");
    favIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      favIcon.classList.toggle("active");
    });

    grid.appendChild(card);
  });
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderMovies(tab.dataset.tab);
  });
});

renderMovies("semua");