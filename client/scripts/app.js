


var App = function() {
  this.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages';
  
};

App.prototype.init = function() {
  this.fetch;

};

App.prototype.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: (message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message retrieved');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message', data);
    }
  });
};

var app = new App();
//On Sumbit click //
/*
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
  type: 'GET',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message retrieved');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to retrieve message', data);
  }
});
*/
//on sumbit
$('#submit').on('click', function() {
  console.log('clicked');
}); 
//message = input data
// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });
