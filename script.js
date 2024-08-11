document.addEventListener("DOMContentLoaded", () => {
    // Toggle navigation menu
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Skills animation
    const skillBars = document.querySelectorAll(".progress-bar");

    skillBars.forEach(skillBar => {
        const progress = skillBar.querySelector(".progress");
        setTimeout(() => {
            progress.style.width = progress.classList.contains("html") ? "90%" :
                                  progress.classList.contains("css") ? "80%" :
                                  progress.classList.contains("js") ? "70%" : "0";
        }, 500);
    });

    // Simple Game
    const gameContainer = document.getElementById("game-container");
    const gameButton = document.createElement("button");
    gameButton.textContent = "Jugar";
    gameContainer.appendChild(gameButton);

    let score = 0;
    gameButton.addEventListener("click", () => {
        score++;
        gameButton.textContent = `Puntaje: ${score}`;
        if (score >= 10) {
            alert("¡Has ganado! Comienza de nuevo.");
            score = 0;
            gameButton.textContent = "Jugar";
        }
    });

    // Fetching News
    const newsContainer = document.getElementById("news-container");
    fetch("https://api.currentsapi.services/v1/latest-news", {
        method: "GET",
        headers: {
            "Authorization": "YOUR_API_KEY"
        }
    })
    .then(response => response.json())
    .then(data => {
        data.news.forEach(article => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");
            newsItem.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Leer más</a>
            `;
            newsContainer.appendChild(newsItem);
        });
    })
    .catch(error => {
        console.error("Error fetching news:", error);
    });
});
