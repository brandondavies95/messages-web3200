// immediately invoked function expression keeps variables contained in that function
(function iife() {
    var allMessages = document.getElementById('viewmessages');
    var postButton = document.getElementById('messagebutton');
    postButton.addEventListener('click', handlePost);
    allMessages.addEventListener('click', getAllMessages);
    // encodeURIComponent takes legal characters not allowed (spaces,&,/) and encodes them. URL safe encoded characters
    // get inputs from form and putting it into body

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
      var new_message = document.querySelector('#text');
      console.log(new_message.value)
      var encodedString = 'messages=' + encodeURIComponent(new_message.value);
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
        clearContents(new_message)
    }

    function getAllMessages() {
      fetch('http://localhost:8080/messages').then(function (response) {
      return response.json();
      }).then( function (data) {
        messages = data
        console.log(messages)
        var allMsgDiv = document.querySelector('#allMessages')
        allMsgDiv.innerHTML = messages;
      })
        // arrowhand is shorthand es6 lamba function. Takes callback function as argument.
        .then(checkStatus)
        // never executed if there is no error. Catches any error throughout any number of thens. Catch from throw error
        .catch(error => console.log(error));
        document.getElementById('viewmessages').style.display = 'none';
        document.getElementById('allMessages').style.marginTop = '100px';
    }
  }());

/* Clear the text area when */
function clearContents(element) {
  element.value = '';
}

/* Using the data returned from fetch
fetch('http://localhost:8080/messages').then(function (response) {
return response.json();
}).then( function (data) {
  messages = data
  console.log(messages)
});
*/
