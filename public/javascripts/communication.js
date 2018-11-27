$(function () {
    let socket = io();
    let name = '';
    let nameInput = $('#name-input');
    let chatInput = $('#chat-input');

    //Handling a nameInput
    nameInput.keydown(function (event) {
        if (event.which == 13)//Here 13 is the keyboard-code
        {
            event.preventDefault();
            if (nameInput.val() !== '') {
                name = nameInput.val();
                nameInput.val('');
                $('.enter-name').hide();
                socket.emit('new:member', name);
            }
        }
    });
//handling submit button
    $('.submit-name').on('click', function (event) {
        event.preventDefault();
        if (nameInput.val() !== '') {
            name = nameInput.val();
            nameInput.val('');
            $('.enter-name').hide();
            socket.emit('new:member', name);
        }
    });

//hadling the chat message chatInput
    chatInput.keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            if (chatInput.val() !== '' && name !== '') {
                socket.emit('new:message', {name: name, msg: chatInput.val()});
                chatInput.val('');
            }
        }
    });
    $('.submit-chat-message').on('click', function (event) {
        event.preventDefault();
        if (chatInput.val() !== '' && name !== '') {
            socket.emit('new:message', {name: name, msg: chatInput.val()});
            chatInput.val('');
        }
    });
//handling new-messages
    socket.on('new:message', function (msgObject) {

        $('#messages').append($('<div class="msg new-chat-message">').html('<span class="glyphicon glyphicon-user" aria-hidden="true"></span> <span class="member-name">' + msgObject.name + '</span>: ' + msgObject.msg));
        $('.chat-window').scrollTop($('#messages').height());
    });
//handling new-MEMBER
    socket.on('new:member', function (name) {
        $('#messages').append($('<i class="fa fa-circle" style="color:green"></i>'));
        $('#messages').append($('<span class="glyphicon glyphicon-user" aria-hidden="true"></span>'));
        $('#messages').append($('<div class="msg new-member">').text(name + ' is Online'));
        $('.chat-window').scrollTop($('#messages').height());
    });
});

