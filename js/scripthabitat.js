// Données des habitats et des animaux
const habitats = {
    savane: {
      nom: "Savane",
      description: "La savane est un vaste espace ouvert qui recrée l'environnement naturel des lions majestueux, des girafes élégantes et des zèbres au pelage rayé. Promenez-vous dans ce paysage baigné de soleil, où les animaux vivent en harmonie, entourés de végétation luxuriante et de vastes plaines. Une expérience immersive qui vous plonge au cœur de la nature sauvage africaine..",
      animaux: [
        {
          prenom: "Léo",
          race: "Lion",
          image: "img/lion.jpg",
          etat: "En bonne santé",
          nourriture: "Viande",
          grammage: "5 kg",
          datePassage: "2025-01-10",
          detailEtat: "Aucun problème détecté lors du dernier check-up.",
        },
        {
          prenom: "Sophie",
          race: "Girafe",
          image: "img/girafe.jpg",
          etat: "En pleine forme",
          nourriture: "Feuilles",
          grammage: "10 kg",
          datePassage: "2025-01-08",
          detailEtat: "Très active et en pleine forme.",
        },
        {
          prenom: "Max",
          race: "Zèbre",
          image: "img/zèbre.jpg",
          etat: "Paisible",
          nourriture: "Herbe",
          grammage: "8 kg",
          datePassage: "2025-01-05",
          detailEtat: "Rien à signaler.",
        },
      ],
    },
    jungle: {
      nom: "Jungle",
      description: "La jungle, véritable paradis tropical, abrite une biodiversité fascinante avec ses majestueux tigres, ses singes agiles et ses perroquets aux couleurs éclatantes. C'est un écosystème riche en vie, recréé avec soin pour offrir un habitat naturel et éducatif.",
      animaux: [
        {
          prenom: "Rajah",
          race: "Tigre",
          image: "img/tigre.jpg",
          etat: "Actif",
          nourriture: "Viande fraîche",
          grammage: "6 kg",
          datePassage: "2025-01-07",
          detailEtat: "En pleine santé.",
        },
        {
          prenom: "Benny",
          race: "Singe",
          image: "img/singe.jpg",
          etat: "Joueur",
          nourriture: "Bananes",
          grammage: "1 kg",
          datePassage: "2025-01-09",
          detailEtat: "Très joueur et curieux.",
        },
        {
          prenom: "Polly",
          race: "Perroquet",
          image: "img/perroquet.jpg",
          etat: "Chantant",
          nourriture: "Fruits",
          grammage: "200 g",
          datePassage: "2025-01-06",
          detailEtat: "Rien à signaler.",
        },
      ],
    },
    marais: {
      nom: "Marais",
      description: "Le marais, havre de tranquillité, est le refuge d'une trajet fascinante comprenant des crocodiles imposants, des tortues paisibles et des flamants roses gracieusement perchés. Cet écosystème humide unique offre une immersion au cœur de la biodiversité aquatique.",
      animaux: [
        {
          prenom: "Snap",
          race: "Crocodile",
          image: "img/crocodile.jpg",
          etat: "En alerte",
          nourriture: "Poissons",
          grammage: "3 kg",
          datePassage: "2025-01-04",
          detailEtat: "En alerte mais en bonne santé.",
        },
        {
          prenom: "Shelly",
          race: "Tortue",
          image: "img/tortue.jpg",
          etat: "Tranquille",
          nourriture: "Légumes",
          grammage: "1 kg",
          datePassage: "2025-01-03",
          detailEtat: "Tranquille et en forme.",
        },
        {
          prenom: "Flora",
          race: "Flamant rose",
          image: "img/flamant.jpg",
          etat: "Radieuse",
          nourriture: "Crevettes",
          grammage: "500 g",
          datePassage: "2025-01-02",
          detailEtat: "Aucun souci.",
        },
      ],
    },
  };
  
  // Gestion des clics sur un habitat
  document.querySelectorAll(".habitat-card").forEach((card) => {
    card.addEventListener("click", () => {
      const habitatId = card.dataset.habitat;
      afficherDetailsHabitat(habitatId);
    });
  });
  
  // Afficher les détails de l'habitat
  function afficherDetailsHabitat(habitatId) {
    const habitat = habitats[habitatId];
    const habitatDetails = document.getElementById("habitat-details");
  
    habitatDetails.style.display = "block";
    habitatDetails.innerHTML = `
      <h2>${habitat.nom}</h2>
      <p>${habitat.description}</p>
      <h3>Animaux présents :</h3>
      <ul>
        ${habitat.animaux
          .map(
            (animal) =>
              `<li onclick="afficherDetailsAnimal('${habitatId}', '${animal.prenom}')">
                ${animal.prenom} (${animal.race})
              </li>`
          )
          .join("")}
      </ul>
    `;
  }
  
  // Afficher les détails d'un animal
  function afficherDetailsAnimal(habitatId, animalPrenom) {
    const habitat = habitats[habitatId];
    const animal = habitat.animaux.find((a) => a.prenom === animalPrenom);
    const animalDetails = document.getElementById("animal-details");
  
    animalDetails.style.display = "block";
    animalDetails.innerHTML = `
      <h2>${animal.prenom} (${animal.race})</h2>
      <img src="${animal.image}" alt="${animal.prenom}">
      <p><strong>État :</strong> ${animal.etat}</p>
      <p><strong>Nourriture :</strong> ${animal.nourriture} (${animal.grammage})</p>
      <p><strong>Date du dernier passage :</strong> ${animal.datePassage}</p>
      <p><strong>Détail de l'état :</strong> ${animal.detailEtat}</p>
    `;
  }
  