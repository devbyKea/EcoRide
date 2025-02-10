
// === ✅ Ton script initial (NON MODIFIÉ) ===
document.addEventListener("DOMContentLoaded", () => {
  const userLogo = document.getElementById("user-logo");
  const dropdownMenu = document.getElementById("profile-dropdown-menu");

  if (userLogo && dropdownMenu) {
    userLogo.addEventListener("click", (event) => {
      event.preventDefault();
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (event) => {
      if (!userLogo.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = "none";
      }
    });
  }

  console.log("Le script est chargé !");

  const menuBtn = document.querySelector(".menu-btn");
  const hamburger = document.querySelector(".hamburger");

  if (menuBtn && dropdownMenu) {
    menuBtn.addEventListener("click", () => {
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

    dropdownMenu.addEventListener("mouseleave", () => {
      dropdownMenu.style.display = "none";
    });
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
    });
  }
});
