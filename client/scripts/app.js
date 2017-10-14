var App = function() {
  this.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages';
  this.roomname = '4chan';
  this.username = 'defaultUser';
  this.roomNames = [];
};

App.prototype.init = function() {
  var answer = this.fetch();
  // what is the goal for init?
};

App.prototype.getRooms = function() {
  console.log('getting rooms');
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: 'order=-createdAt',
    //data: 'where={"roomname":{"$exists":true}}',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Got Rooms');
      console.log(data.results);
       // for (var key in data){
       //   if ()
       // }
      var roomNames = _.reduce(data.results, function(rooms, message) {
        console.log(message.roomname, JSON.stringify(rooms));
        if (!rooms.includes(message.roomname) && message.roomname !== undefined) {
          rooms.push(message.roomname);
        }
        return rooms;
      }, []);
       
      roomNames.forEach(function(room) {
        if (!app.roomNames.contains(room)) {
          app.roomNames.push(room);
        }
      });
      
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


App.prototype.send = function(message) {
  console.log('sending message');
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
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
  var that = this;
  var room = 'where={"roomname":"' + app.roomname + '"}';
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: 'order=-createdAt',
    data: room,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message retrieved');
      data.results.forEach(function(message) {
        that.renderMessage(message);
      });
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message', data);
    }
  });
};

App.prototype.renderMessageObject = function(username, roomname, text) {
  return {
    username: username,
    roomname: roomname,
    text: text
  };
};

App.prototype.clearMessages = function() {
  $('#chats').html('');
};

App.prototype.renderMessage = function(message) {
  // add class to <p> tag that signifies which chatroom it belongs  

  var renderedMessage = $('<p>' + message.username + '<br></br>' + message.text + '</p>');
  $('#chats').append(renderedMessage);
};

App.prototype.renderRoom = function() {

};

var app = new App();

$(document).ready(function() {
  
  app.init();
  $('#post').on('submit', function(e) {
    e.preventDefault();
    console.log('submitted');
    // console.log(($(this))[0].elements.message.value);
    var userMessage = ($(this))[0].elements.message.value;
    var newObj = app.renderMessageObject(app.username, app.roomname, userMessage);
    app.send(newObj);
    app.fetch();
  }); 
});

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
