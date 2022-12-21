const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

const messages = [];
const readyUsers = ["initialUser"];
const roastRooms = 
  [{
    id: (Math.random() + 1).toString(36).substring(7),
    user1: (Math.random() + 1).toString(36).substring(7),
    user2: (Math.random() + 1).toString(36).substring(7),
    viewers: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 10000),
    tag:  "HOT"
  }];

io.on("connection", socket => {
    let previousId;
    
    const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
      previousId = currentId;
    };

    const addRoom = () => {
      let num = Math.floor(Math.random() * 3);
      let room = {
        id: (Math.random() + 1).toString(36).substring(7),
        user1: (Math.random() + 1).toString(36).substring(7),
        user2: (Math.random() + 1).toString(36).substring(7),
        viewers: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 10000),
        tag: num
      }
      roastRooms.push(room);
      io.emit('getRoastRooms', roastRooms);
      return room;
    };

    const addRoomWithUsers = (user1) => {
      let num = Math.floor(Math.random() * 3);
      let room = {
        id: (Math.random() + 1).toString(36).substring(7),
        user1: user1,
        user2: (Math.random() + 1).toString(36).substring(7),
        viewers: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 10000),
        tag: num
      }
      roastRooms.push(room);
      io.emit('getRoastRooms', roastRooms);
      return room;
    };

    // ...

    socket.on("getRoastRooms", () => {
      io.emit('getRoastRooms', roastRooms);
    });

    // ...

    socket.on('addMessage', (message) =>{
      io.emit('messages', message);
    });

    // ...

    socket.on('addRoom', () => {
      addRoom();
    });

    // ...
    socket.on("addRoomAndGetId", (arg, callback) => {
      let room = addRoom();
      callback(room.id);
    });

    // ...

    socket.on("getRoomDetails", (roomId, callback) => {

      var room = roastRooms.find(x => x.id == roomId);
      callback(room);
    });

    // ...

    socket.on("addReadyUser", (userId, callback) => {
      readyUsers.push(userId);
      if (readyUsers.length > 1) {
        var newRoom = addRoomWithUsers(readyUsers[1]);
        var room = roastRooms.find(x => x.id == newRoom.id);
        callback(room);
      }
      callback(false);
    });

    // ...
    
    io.emit('getRoastRooms', roastRooms);

    //broadcast connection count to io to all connections
    io.emit('connections', io.engine.clientsCount);

    console.log(`Socket ${socket.id} has connected`);
  });

  http.listen(4444, () => {
    console.log('Listening on port 4444');
  });