document.addEventListener('DOMContentLoaded', () => {
  // 🎯 GESTION DU MENU HAMBURGER
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

  // 🎯 ANIMATION DU BOUTON HAMBURGER
  const hamburger = document.querySelector('.hamburger');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
    });
  }
})

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script de connexion chargé");

  const loginForm = document.querySelector("form"); // Si tu utilises une balise <form>
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Empêche la page de se recharger
    });
  }

  const loginButton = document.querySelector(".btn-login");
  if (!loginButton) {
    console.error("Bouton de connexion introuvable !");
    return;
  }

  document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://ecoride-production-f991.up.railway.app/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.session_id) {
        localStorage.setItem("session_id", data.session_id);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "profil.html"; // Redirection après connexion
    } else {
        alert(data.error);
    }
});
})
