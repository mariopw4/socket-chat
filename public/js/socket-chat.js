var socket = io();

var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios es necesario');
}


socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', { nombre: params.get('nombre'), sala: params.get('sala') }, function(resp) {
        console.log(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/* socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas) {
    console.log(personas);
});

//Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log(mensaje);
});