
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
const param = new URLSearchParams(search);
const cityName = param.get("city");
return cityName; 
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
try{
  const path = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
  const data = await path.json();
  return data;
} catch (err){
  return null;
}
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  try{
    adventures.forEach((e) => {
      const adventureCard = document.createElement("div");
      adventureCard.className = "col-lg-3 p-3";
      const card = `
      <a href="detail/?adventure=${e.id}" id=${e.id} target = "_blank">
      <div class="card activity-card">
      <div class="category-banner">${e.category}</div>
      <img class="card-img-top" src="${e.image}" alt="Card image cap"></img>
        <div class="card-body d-flex justify-content-between w-100">
        <h5 class="card-title">${e.name} <br> Duration</h5>
        <p class="card-text"> ₹${e.costPerHead} <br> ${e.duration}Hours</p>
        </div>
      </div>
      </a>
      ` 
      adventureCard.innerHTML = card;
    document.getElementById("data").append(adventureCard);
    })
    } catch(err) {
      return null;
    }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let selectedlist = [];
  list.forEach((element)=>{
  let selectedduration = element.duration;
  if(selectedduration >= low && selectedduration <= high ){
    selectedlist.push(element)
  }
  })
  return selectedlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let selector = [];
  list.forEach((element)=>{
    categoryList.map((selectedOption)=>{
      if(selectedOption===element.category){
        selector.push(element)
      }
    })
  })
  return selector;
  
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filterterdList = list;
   if(filters.category.length>0){
    filterterdList = filterByCategory(list, filters.category)
   }
   if(filters.duration.length>0){
    let target = filters.duration;
    let filtersplit = target.split("-");
    let low = filtersplit[0];
    let high = filtersplit[1]; 
    filterterdList = filterByDuration(filterterdList,low, high)
   }
   return filterterdList;

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let datalocalstorage = JSON.parse(localStorage.getItem("filters")) ;
  // Place holder for functionality to work in the Stubs
  return datalocalstorage;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
    //  console.log(filters,"string")
    let data = filters.category;
    let container = document.getElementById("category-list");
    data.forEach((element)=>{
      let generatePill = document.createElement("div");
      generatePill.className = "category-filter";
      generatePill.textContent = element;
      container.append(generatePill);
    })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
