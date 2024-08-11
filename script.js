document.addEventListener("DOMContentLoaded", () => {
    // Toggle navigation menu
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Animar barras de progreso de habilidades
    const skillBars = document.querySelectorAll(".progress-bar");

    skillBars.forEach(skillBar => {
        const progress = skillBar.querySelector(".progress");
        setTimeout(() => {
            progress.style.width = skillBar.dataset.progress + "%";
        }, 500);
    });

    // Juego básico en canvas
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const player = {
        x: 50,
        y: 50,
        width: 20,
        height: 20,
        dx: 5,
        dy: 4
    };

    function drawPlayer() {
        ctx.fillStyle = "#00ffae";
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update() {
        clear();
        drawPlayer();

        player.x += player.dx;
        player.y += player.dy;

        // Rebotar en los bordes
        if (player.x + player.width > canvas.width || player.x < 0) {
            player.dx *= -1;
        }

        if (player.y + player.height > canvas.height || player.y < 0) {
            player.dy *= -1;
        }

        requestAnimationFrame(update);
    }

    document.getElementById("startGame").addEventListener("click", () => {
        update();
    });

    // Cargar noticias desde una API
    const apiKey = 'tu_api_key_aqui';
    const newsContainer = document.getElementById("news-container");

    async function loadNews() {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`);
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            newsContainer.innerHTML = "<p>Error al cargar las noticias.</p>";
        }
    }

    function displayNews(articles) {
        articles.forEach(article => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");
            newsItem.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Leer más</a>
            `;
            newsContainer.appendChild(newsItem);
        });
    }

    loadNews();
});
