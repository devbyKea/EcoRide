document.addEventListener("DOMContentLoaded", () => { 
  console.log("Le script d'inscription est chargé !");

// Gestion du menu hamburger
  const menuBtn = document.querySelector(".menu-btn");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  if (menuBtn && dropdownMenu) {
    menuBtn.addEventListener("click", () => {
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

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

const signupButton = document.querySelector(".btn-signup");
if (!signupButton) {
  console.error("Le bouton d'inscription (.btn-signup) est introuvable !");
  return;
}

signupButton.addEventListener("click", async () => {
  console.log("Bouton inscription cliqué !");
  
  const prenomInput = document.querySelector("input[placeholder='Prénom']");
  const nameInput = document.querySelector("input[placeholder='Nom complet']");
  const emailInput = document.querySelector("input[placeholder='Adresse email']");
  const passwordInput = document.querySelector("input[placeholder='Mot de passe']");
  const confirmPasswordInput = document.querySelector("input[placeholder='Confirmez le mot de passe']");

  console.log("Champ prénom trouvé :", prenomInput);

  if (!prenomInput || !nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
    alert("Tous les champs sont obligatoires !");
    console.error("Un ou plusieurs champs du formulaire sont introuvables !");
    return;
  }

  const prenom = prenomInput.value.trim();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  console.log("Données récupérées :", { prenom, name, email, password, confirmPassword });

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  console.log("Envoi des données au serveur...");

  try {
    const response = await fetch("https://ecoride-production-f991.up.railway.app/api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prenom, name, email, password, confirm_password: confirmPassword })
    });

    console.log("Réponse reçue du serveur :", response);

    // Vérifier si la réponse est correcte
    if (!response.ok) {
      console.error("Erreur HTTP :", response.status, response.statusText);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
      return;
    }

    const data = await response.json();
    console.log("Réponse JSON :", data);

    if (data.status === "success") {
      alert("Inscription réussie !");
      window.location.href = "profil.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    alert("Une erreur est survenue. Veuillez réessayer plus tard.");
  }
});
});
