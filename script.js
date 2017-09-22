// immediately invoked function expression keeps variables contained in that function
(function iife() {
    var postButton = document.getElementById('createmessage');
    postButton.addEventListener('click', handlePost);
    // encodeURIComponent takes legal characters not allowed (spaces,&,/) and encodes them. URL saafe encoded characters
    // get inputs from form and putting it into body
    var encodedString = 'color=' + encodeURIComponent('Redish Potatoes');

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response.clone();
        throw error;
        // catch will catch thrown error
      }
    }

    function handlePost() {
      fetch('http://localhost:8080/messages', {
          // automatically wrapped in object
          body: encodedString,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        // arrowhand is shorthand es6 lamba function. Takes callback function as argument.
        .then(checkStatus)
        // never executed if there is no error. Catches any error throughout any number of thens. Catch from throw error
        .catch(error => console.log(error));
    }

    var stephen = 'is a hack';
  }());

/* Using the data returned from fetch */
fetch('http://localhost:8080').then(function (response) {
return response.json();
}).then( function (data) {
  messages = data
  console.log(messages)
});
