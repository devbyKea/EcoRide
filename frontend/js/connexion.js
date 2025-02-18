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

  loginButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Empêche le rechargement (si le bouton est dans un <form>)

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (!emailInput || !passwordInput) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    console.log("Tentative de connexion avec :", { email, password });

    try {
      const response = await fetch("https://ecoride-production-f991.up.railway.app/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      

      
      console.log("Réponse reçue du serveur :", response);

      const textResponse = await response.text();
      console.log("Texte brut reçu du serveur :", textResponse);

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (error) {
        console.error("Erreur lors de la conversion JSON :", error);
        alert("Le serveur a renvoyé une réponse invalide.");
        return;
      }

      console.log("Réponse JSON :", data);

      if (data.status === "success") {
        alert("Connexion réussie !");
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "profil.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  });
});

