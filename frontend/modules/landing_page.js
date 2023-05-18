import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("from init()");
  console.log(config.backendEndpoint);
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  const cityData = await fetch (`${config.backendEndpoint}/cities`);
  const jsonData = await cityData.json();
  const cityArray = jsonData;
  return cityArray;
  }
  catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const card = document.createElement("div");
  card.className = "col-lg-3 mb-4";
  // userCard.style.width = "18rem";
  const cardDetail = `<a href="pages/adventures/?city=${id}" id=${id}>
    <div class = "tile">
  <img src="${image}" class="card-img-top" alt="...">
    <div class="tile-text text-center">
    <h5 class="card-title">${city}</h5>
    <p class="card-text">${description}</p>
    </div>
    </div>
    </a>`;
    
    card.innerHTML = cardDetail;
    document.getElementById("data").append(card);
}

export { init, fetchCities, addCityToDOM };
