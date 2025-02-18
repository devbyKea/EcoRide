document.addEventListener("DOMContentLoaded", () => {
  console.log("Le script d'inscription est chargé !");

// Gestion du menu hamburger
  const menuBtn = document.querySelector(".menu-btn");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (menuBtn && dropdownMenu) {
// Ouvrir/Fermer le menu au clic
    menuBtn.addEventListener("click", () => {
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

// Fermer le menu si la souris quitte le menu
    dropdownMenu.addEventListener("mouseleave", () => {
      dropdownMenu.style.display = "none";
    });
  }

// Animation hamburger
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
  });
}

const signupForm = document.querySelector(".signup-card");
if (!signupForm) return;

const signupButton = document.querySelector(".btn-signup");
signupButton.addEventListener("click", async () => {
  const name = document.querySelector("input[placeholder='Nom complet']").value.trim();
  const email = document.querySelector("input[placeholder='Adresse email']").value.trim();
  const password = document.querySelector("input[placeholder='Mot de passe']").value.trim();
  const confirmPassword = document.querySelector("input[placeholder='Confirmez le mot de passe']").value.trim();

  if (!name || !email || !password || !confirmPassword) {
    alert("Tous les champs sont obligatoires !");
    return;
  }

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  try {
    const response = await fetch("https://ecoride-production-f991.up.railway.app/api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password, confirm_password: confirmPassword })
    });

    const data = await response.json();
    if (data.status === "success") {
      alert("Inscription réussie !");
      window.location.href = "profil.html"; // Redirection après succès
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    alert("Une erreur est survenue. Veuillez réessayer plus tard.");
  }
});
});