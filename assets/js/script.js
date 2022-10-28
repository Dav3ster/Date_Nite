const Tapi_key = "xdshV4xA76PjaILVNZCQLJMfvKXyiWU8"
const Yapi_key = "joPjHokXrrhul1ER2zqKLt-tNwjjmYmgrBQTbNHd88SXmuSquMbPyGMELmNDno0XosGjL8sHvOd6R7Ac2uRmeTCKUTloVAWezetEkmaRbsYiXB1VYVMFmQdjhRlbY3Yx"
var cityformEl = document.getElementById("city-form")
 cityformEl.addEventListener("submit", (event) => {
    var cityInput = document.getElementById('citySelection').value;
    event.preventDefault();

    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${cityInput}&apikey=${Tapi_key}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  
    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${cityInput}&categories="resturants"`,{
        headers:{
            authorization: "Bearer " + Yapi_key
        }
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
   
})

