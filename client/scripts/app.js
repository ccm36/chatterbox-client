var App = function() {
  this.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages';
  this.roomname = 'lobby';
  this.username = 'defaultUser';
  this.roomNames = ['lobby'];
};

App.prototype.init = function() {
  console.log('running init');
  var answer = this.fetch();
  app.getRooms();
};

App.prototype.renderRoom = function(room) {
  var x = $('#roomSelect');
  var option = document.createElement('option');
  option.text = room;
  x.append(option);
};

App.prototype.getRooms = function() {
  console.log('getting rooms');
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {'order': '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Got Rooms');
      
      var newRoomNames = _.reduce(data.results, function(rooms, message) {
        //console.log(message.roomname, JSON.stringify(rooms));
        if (!rooms.includes(message.roomname) && message.roomname !== undefined) {
          rooms.push(message.roomname);
        }
        return rooms;
      }, []);
       
      newRoomNames.forEach(function(room) {
        if (!((app.roomNames).includes(room))) {
          app.roomNames.push(room);
          app.renderRoom(room);
        }
      });
      
      //update dropdown box
      //app.roomNames.forEach(function(room) {
      //  app.renderRoom(room);
      //});
      
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
      app.fetch();
      app.getRooms();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.fetch = function() {
  var that = this;
  console.log(app.roomname);
  var room = 'where={"roomname":"' + app.roomname + '"}';
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {
      'order': '-createdAt',
      'where': {'roomname': app.roomname}
    },
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message retrieved');
      app.clearMessages();
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
  var renderedMessage = $('<p>' + message.username + '<br></br>' + message.text + '</p>');
  $('#chats').append(renderedMessage);
};


var app = new App();

$(document).ready(function() {
  
  app.init();
  $('#post').on('submit', function(e) {
    e.preventDefault();
    console.log('submitted');
    console.log($(this)[0]);
    var userMessage = ($(this))[0].elements.message.value;
    var newObj = app.renderMessageObject(app.username, app.roomname, userMessage);
    app.send(newObj);
    //app.fetch(); 
  }); 
  
  $('#newRoom').on('submit', function(e) {
    e.preventDefault();
    console.log('submitted');
    console.log($(this)[0]);
    var roomName = ($(this))[0].elements.message.value;
    app.roomname = roomName;
    var newObj = app.renderMessageObject(app.username, app.roomname, 'New Room Created');
    app.roomNames.push(roomName);
    app.send(newObj);
    console.log(roomName, 'logging here');
    $('#roomSelect').val(roomName);
    //app.fetch(); 
  }); 
  
  
  var user = location.search.slice(10).split('%20').join(' ');
  app.username = user;
  
  console.log(user);
  
  // 
  $('#roomSelect').change(function() {
    console.log($(this).val());
    app.clearMessages();
    app.roomname = $(this).val();
    app.fetch();
  });
});

