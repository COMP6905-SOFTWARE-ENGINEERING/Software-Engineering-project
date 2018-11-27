//socket.io模块

function serverSocket(server){
    var io = require('socket.io')(server);
    io.on('connection',function(socket){
        console.log('user connected');
        //Message handler
        socket.on('new:message',function(msgObject){
            console.log('NEW MESSAGE:',msgObject);
            io.emit('new:message',msgObject);
        });
        //New user handler
        socket.on('new:member',function(name){
            console.log('NEW:MEMBER:',name);
            io.emit('new:member',name);
        });
    });
};

module.exports = serverSocket;