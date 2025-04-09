// Crear una instancia con kinet con configuraciones personalizadas.
var kinet = new Kinet({
    acceleration: 0.02,
    friction: 0.25,
    names: ["x", "y"],
});

// Seleccionar los circules de elementos.
var circle = document.getElementById('circle');

// Establecer el controlador del evento tick
kinet.on('tick', function(instances){
    circle.style.transform = `translate3d(${ (instances.x.current) }px,${
        (instances.y.current) }px, 0) rotateX(${ (instances.x.velocity/2) }deg) rotateY(${ (instances.y.velocity/2) }deg)`;
});

// Llama al metodo animacion kinet con el mouse.
document.addEventListener('mousemove', function(event) {
    kinet.animate('x', event.clientX - window.innerWidth/2);
    kinet.animate('y', event.clientY - window.innerHeight/2);
});

// Log
kinet.on('start', function(){
    console.log('start');
});

kinet.on('end',  function(){
    console.log('end');
});