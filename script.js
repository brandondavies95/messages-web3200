


/* Using the data returned from fetch */
fetch('http://localhost:8080').then(function (response) {
return response.json();
}).then( function (data) {
  desserts = data
});
