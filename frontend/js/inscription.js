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
  
  const prenomInput = document.getElementById("prenom");
  const nameInput = document.getElementById("nom");
  const pseudoInput = document.getElementById("pseudo");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  

  console.log("Champs détectés :", {
    prenom: prenomInput,
    nom: nameInput,
    email: emailInput,
    password: passwordInput,
    confirmPassword: confirmPasswordInput
  });
  

  if (!prenomInput || !nameInput || !pseudoInput || !emailInput || !passwordInput || !confirmPasswordInput) {
    alert("Tous les champs sont obligatoires !");
    console.error("Un ou plusieurs champs du formulaire sont introuvables !");
    return;
  }
  

  const prenom = prenomInput.value.trim();
  const name = nameInput.value.trim();
  const pseudo = pseudoInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  console.log("Données récupérées :", { prenom, name, pseudo, email, password, confirmPassword });

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
        body: JSON.stringify({ prenom, name, pseudo, email, password, confirm_password: confirmPassword })
    });

    console.log("Réponse reçue du serveur :", response);
    
    const textResponse = await response.text();
    console.log("Texte brut reçu du serveur :", textResponse); // 🔍 Vérifier le JSON brut

    // Vérifier si la réponse est JSON valide
    let data;
    try {
        data = JSON.parse(textResponse);
    } catch (error) {
        console.error("Erreur lors de la conversion JSON :", error);
        alert("Problème interne du serveur. Veuillez réessayer plus tard.");
        return;
    }

    console.log("Réponse JSON :", data);

    if (data.status === "success") {
        alert("Inscription réussie !");
        window.location.href = "connexion.html";
    } else {
        alert(data.message);
    }
} catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    alert("Une erreur est survenue. Veuillez réessayer plus tard.");
}

});
});
