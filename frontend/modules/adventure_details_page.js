import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const param = new URLSearchParams(search);
  const adventureId = param.get("adventure");
  return adventureId; 
  // Place holder for functionality to work in the Stubs
 
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
   try{
    const path = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    )
    const data = await path.json();
    return data;
   }
   catch(err){
    return null;
   }
  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  try{
    document.getElementById("adventure-name").textContent=adventure.name;
    document.getElementById("adventure-subtitle").textContent=adventure.subtitle;
    document.getElementById("adventure-content").textContent=adventure.content;
    let image = document.getElementById("photo-gallery")
    let imagedata = adventure.images;
    imagedata.forEach((element) => {
      let innerContainer= document.createElement("div")
      let photo = document.createElement("img")
      photo.className = "activity-card-image"
    photo.src= element;
      innerContainer.append(photo)
      image.append(innerContainer)
    })
  }
  catch(err){
    return null;
  }
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
    let imageElement = document.getElementById("photo-gallery")
    imageElement.innerHTML =  `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    `
    images.forEach((element,index)=>{
      let innerContainer = document.createElement("div")
      innerContainer.className = `carousel-item ${index===0?"active" : ""}`
      innerContainer.innerHTML = `
      <img src = ${element} alt = "" srcset = "" class= "activity-card-image pb-3 pd-mb-0"/>
      `
      document.querySelector(".carousel-inner").append(innerContainer);
    })
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
    if (adventure.available){
      document.getElementById("reservation-panel-available").style.display = "block";
      document.getElementById("reservation-panel-sold-out").style.display = "none";
      document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
    } else{
      document.getElementById("reservation-panel-available").style.display = "none";
      document.getElementById("reservation-panel-sold-out").style.display = "block";
    }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead * persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let formContainer = document.querySelector("#myForm");
  formContainer.addEventListener("submit", async (event) => {
    event.preventDefault();

   let formElements = formContainer.elements;
   let formData = JSON.stringify({
    name: formElements["name"].value,
    date: formElements["date"].value,
    person: formElements["person"].value,
    adventure: adventure.id
   })

   let url = config.backendEndpoint + "/reservations/new";
   console.log(url,"1123")
   try{
   let fetchData = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "application/json"
      }
   })
   if(fetchData.ok) {
    alert("Success!")
    window.location.reload();
   } else {
    alert("Failed!")
   }
   }
   catch(err) {
      alert("Error occoured :(")
   }
  // console.log(formElements);
  } )
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
   if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block"
   } else {
    document.getElementById("reserved-banner").style.display = "none"
   }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
