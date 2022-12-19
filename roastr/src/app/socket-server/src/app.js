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
const documents = {};
const messages = [];

io.on("connection", socket => {
    let previousId;
    
    const safeJoin = async currentId => {
      socket.leave(previousId);
      socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
      previousId = currentId;
    };

    // ...

    socket.on("getDoc", docId => {
        safeJoin(docId);
        socket.emit("document", documents[docId]);
      });

    // ...

    socket.on("addDoc", doc => {
        documents[doc.id] = doc;
        safeJoin(doc.id);
        io.emit("documents", Object.keys(documents));
        socket.emit("document", doc);
      });

    // ..

    socket.on("editDoc", doc => {
        documents[doc.id] = doc;
        socket.to(doc.id).emit("document", doc);
      });
    
    // ...

    socket.on('addMessage', (message) =>{
      // messages.push(message);
      // io.emit('messages', messages);
      io.emit('messages', message);
    });

    // ...

    //broadcast connection count to io to all connections
    io.emit('connections', io.engine.clientsCount);

    //broadcast documents to all connections
    io.emit("documents", Object.keys(documents));

    console.log(`Socket ${socket.id} has connected`);
  });

  http.listen(4444, () => {
    console.log('Listening on port 4444');
  });