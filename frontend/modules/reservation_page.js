import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const reservationData = await fetch(`${config.backendEndpoint}/reservations`);
    const jsonData = await reservationData.json();
    return jsonData;
  }

  // Place holder for functionality to work in the Stubs
 catch (err) {
  return null;
 }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    if (reservations.length>0) {
      document.querySelector("#reservation-table-parent").style.display = "block";
      document.querySelector("#no-reservation-banner").style.display = "none";
      reservations.forEach((e,i)=>{
        let elem=document.createElement("tr");
        const t=new Date(e.time).toLocaleString(`en-IN`,{
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true 
        })
        let t2=t.replace("at",",").replace(" ,",",");
        console.log(t2)
        elem.innerHTML=`
                    <th scope="row">${e.id}</th>
                    <td>${e.name}</td>
                    <td>${e.adventureName}</td>
                    <td>${e.person}</td>
                    <td>${new Date(e.date).toLocaleDateString(`en-IN`)}</td>
                    <td>${e.price}</td>
                    <td>${t2}</td>
                    <td><div class="reservation-visit-button" id=${e.id}><a href="../detail/?adventure=${e.adventure}">Visit Adventure</a></div></td>
        `
        document.getElementById("reservation-table").appendChild(elem);
      })
    } else {
      document.querySelector("#no-reservation-banner").style.display = "block";
      document.querySelector("#reservation-table-parent").style.display = "none";

    }

}


export { fetchReservations, addReservationToTable };
