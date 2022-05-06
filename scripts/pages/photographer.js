//Mettre le code JavaScript lié à la page photographer.html
var urlSearchParams = URL.searchParams;
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

async function getPhotographers() {
    let photographers = [];
    await fetch('./data/photographers.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(value) {
        photographers = value.photographers;
    })
    .catch(function(error){
        console.log(error);
    });
    return ({photographers: [...photographers]})
}

async function getMedias() {
    let medias = [];
    await fetch('./data/photographers.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(value) {
        medias = value.media;
        console.log(medias);
    })
    .catch(function(error){
        console.log(error);
    });
    return ({media: [...medias]})
}

async function getPhotographe() {
    // Récupère les datas des photographes
    const listePhotographes = await getPhotographers();
    const photographe = listePhotographes.photographers.find(photographers => photographers.id == id);
    let photoProfil = document.getElementById('photoProfil');
    let nom = document.getElementById('photographeName');
    let localisation = document.getElementById("photographeLocalisation");
    let slogan = document.getElementById("photographeSlogan");
    let prix = document.getElementById('pricetag');
    let nomModal = document.getElementById('contact_name');
    nomModal.innerHTML = photographe.name;

    //assigner les datas au bon endroit
    nom.innerHTML = photographe.name;
    photoProfil.setAttribute("src", `assets/images/photographers ID Photos/${photographe.portrait}`);
    localisation.innerHTML = `${photographe.city}, ${photographe.country}`;
    slogan.innerHTML = photographe.tagline;
    prix.innerHTML = `${photographe.price}€/jour`;
};

async function displayMedia(medias) {
    const mediaSection = document.querySelector(".media_section");

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
};

async function init() {
    await getPhotographe();
    const { medias } = await getMedias();
    await displayMedia(medias);
};
    
init();