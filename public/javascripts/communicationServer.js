const express = require('express');
const app=express();
const server=require('http').Server(app);
const io=require('socket.io')(server);
const path=require('path');
const port=process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.get('/',function(req,res){
  res.sendFile(__dirname + '/communication.ejs');
});
server.listen(port,function(){
  console.log('listening on port' + port);

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
  })
});
