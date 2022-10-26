fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=xdshV4xA76PjaILVNZCQLJMfvKXyiWU8')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });