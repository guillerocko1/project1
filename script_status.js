//const flight_url = 'https://airlabs.co/api/v9/delays?delay=60&type=departures&api_key=104421b8-80bc-4442-95d4-afeb278be247';åå

//$('.dropdown-trigger').dropdown();

var issueContainer = document.getElementById('issues');
var fetchButton = document.getElementById('fetch-button');
var departureDate = document.getElementById('departure_date');
var airlinesEl = document.getElementById('airlines');
var departure_dateEl = document.getElementById('departure_date');
var flight_numberEl =document.getElementById('lnumber')

var repoContainerEl = document.querySelector('#issues');

function getApi() {
  //This link works...
  console.log("Clicking the botton!!!!");
  const departure_choice = departure_dateEl.value;
  const airline_name = airlinesEl.value;

  const flight_url = 'https://airlabs.co/api/v9/delays?airline_icao='+airline_name+'&dep_estimated='+departure_choice+'&delay=60&type=departures&api_key=104421b8-80bc-4442-95d4-afeb278be247';
//const flight_url = 'https://airlabs.co/api/v9/flights?_view=array&_fields=hex,flag,lat,lng,dir,alt&api_key=104421b8-80bc-4442-95d4-afeb278be247';


//const flight_url = 'https://airlabs.co/api/v9/flights?api_key=104421b8-80bc-4442-95d4-afeb278be247';
  fetch(flight_url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //console.log(data[0].status);
      //console.log(data[1]);
      
      var temp10 = document.getElementsByName("issues")[0];
      var temp20create = document.createElement("tr");
      temp20create.className = 'class="striped"';
      var temp30 = ("<td> " + "Flight Status" + " </td><td> "
        + "Flight Number" + "</td><td> "
        + "Departure Terminal" + "</td><td> "
        + "Departure Estimated" + "</td><td> "
        + "Arrived Estimated" + "</td> "
      );
      temp20create.innerHTML = temp30;
      temp10.appendChild(temp20create);


      for (var i = 0; i < 10; i++) {
        
        /**************** */
        
        var temp1 = document.getElementsByName("issues")[0];
        var temp2create = document.createElement("tr");
        temp2create.className = 'class="striped"';
        var temp3 = ("<td> " + data.response[i].status + " </td><td> "
          + data.response[i].flight_number + "</td><td> "
          + data.response[i].dep_terminal + "</td><td> "
          + data.response[i].dep_estimated + "</td><td> "
          + data.response[i].arr_estimated + "</td> "
        );
        temp2create.innerHTML = temp3;
        temp1.appendChild(temp2create);


       
        console.log(departure_choice);
        console.log(airline_name);
        
      }
      
    });
}
  


fetchButton.addEventListener('click', getApi);



  

