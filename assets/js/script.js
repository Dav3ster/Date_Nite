//Below are a list of global variables anlong with our api keys
const Tapi_key = "xdshV4xA76PjaILVNZCQLJMfvKXyiWU8"
const Yapi_key = "joPjHokXrrhul1ER2zqKLt-tNwjjmYmgrBQTbNHd88SXmuSquMbPyGMELmNDno0XosGjL8sHvOd6R7Ac2uRmeTCKUTloVAWezetEkmaRbsYiXB1VYVMFmQdjhRlbY3Yx"

var cityformEl = document.getElementById("city-form")
var eventListEl = document.getElementById("events-list")
var event1El = document.getElementById("event1")
var event2El = document.getElementById("event2")
var event3El = document.getElementById("event3")
var event4El = document.getElementById("event4")
var event5El = document.getElementById("event5")
var restaurantsListEl = document.getElementById("restaurants-list")
var rest1El = document.getElementById("rest1")
var rest2El = document.getElementById("rest2")
var rest3El = document.getElementById("rest3")
var rest4El = document.getElementById("rest4")
var rest5El = document.getElementById("rest5")
var restbuttonEl = document.getElementById("reset")
var citiesListEl = document.getElementById("previous-Searches")

//global array for search history
var searchHistory = []
//script to manage local storage and also dynamically create our search history list
$(document).ready(function () {
  var storedHistory = JSON.parse(localStorage.getItem("Search History"))
  searchHistory = storedHistory?storedHistory:[]
  cityformEl.onsubmit = function(event){
    event.preventDefault();
    var city = event.target[0].value;
    console.log(city)
    searchHistory.push(city);
    localStorage.setItem("Search History", JSON.stringify(searchHistory));

    var ol = document.createElement('ol');
    for(i = 0; i < searchHistory.length; i++)
    {
        var li=document.createElement('li');
        li.innerHTML = searchHistory[i];
        ol.appendChild(li);
    }
    document.getElementById('previous-Searches').appendChild(ol);
}});
//this is were we have our api requests, the userinput from the form is passed into the request thru the cityinput
cityformEl.addEventListener("submit", (event) => {
    var cityInput = document.getElementById('citySelection').value;
    event.preventDefault();

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${cityInput}&apikey=${Tapi_key}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      addToEvents(data)
    })
    .catch(function(error) {
      console.log("Sorry, unable to find events");})
    
    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${cityInput}&categories="restaurants&attributes="new_and_trending"`,{
        headers:{
            authorization: "Bearer " + Yapi_key
        }
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      addToRests(data)
    })
    .catch(function(error) {
      console.log("Sorry, unable to find restaurants");
    })
    // this clears the history list on submit to make room for the new history array
    while (citiesListEl.hasChildNodes()){
      citiesListEl.removeChild(citiesListEl.firstChild);
    }
});
//here is where we are looping thru our events data and appending to our cards
function addToEvents (data){
  var eventsNames = []
  for (var i = 0; i <= 5; i++){
    eventsNames.push(data._embedded.events[i].name)
  }
 event1.append(eventsNames[1])
 event2.append(eventsNames[2])
 event3.append(eventsNames[3])
 event4.append(eventsNames[4])
 event5.append(eventsNames[5])
 eventListEl.setAttribute('class', '');
 
}
//here is where we are looping thru our restaurants data and appending to our cards
function addToRests (data){
  var restsNames = []
  for (var i = 0; i <= 5; i++){
    restsNames.push(data.businesses[i].name)
  }
  rest1.append(restsNames[1])
  rest2.append(restsNames[2])
  rest3.append(restsNames[3])
  rest4.append(restsNames[4])
  rest5.append(restsNames[5])
  restaurantsListEl.setAttribute('class', '');
};
//here is where we can reset our cards and also toggle the hide class for the empty divs
restbuttonEl.addEventListener("click", (event) => {
  event1El.textContent = ""
  event2El.textContent = ""
  event3El.textContent = ""
  event4El.textContent = ""
  event5El.textContent = ""
  rest1El.textContent = ""
  rest2El.textContent = ""
  rest3El.textContent = ""
  rest4El.textContent = ""
  rest5El.textContent = ""
  event.stopPropagation;
  event.preventDefault();
  eventListEl.setAttribute('class', 'hide');
  restaurantsListEl.setAttribute('class', 'hide');
});