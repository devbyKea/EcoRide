document.addEventListener("DOMContentLoaded", () => {
  console.log("Script de connexion chargé");

  // GESTION DU MENU HAMBURGER
  const menuBtn = document.querySelector(".menu-btn");
  const dropdownNav = document.querySelector(".dropdown-menu");

  if (menuBtn && dropdownNav) {
    menuBtn.addEventListener("click", () => {
      dropdownNav.style.display =
        dropdownNav.style.display === "block" ? "none" : "block";
    });

    dropdownNav.addEventListener("mouseleave", () => {
      dropdownNav.style.display = "none";
    });
  }

  // ANIMATION DU BOUTON HAMBURGER
  const hamburger = document.querySelector(".hamburger");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
    });
  }

  document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://ecoride-production-f991.up.railway.app/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.status === "success") {
        // Stocker les infos utilisateur dans localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirection vers profil.html
        window.location.href = "profil.html";
    } else {
        alert("Erreur : " + data.message);
    }
});
})
