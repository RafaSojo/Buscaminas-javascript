console.log("¡Hola! Para iniciar el buscaminas manualmente puedes instanciar el objeto Buscaminas.");
console.log("Si quieres crear uno automáticamente usa la función iniciar() y le pasas como argumento la dificultad:");
console.log("   * facil");
console.log("   * medio");
console.log("   * dificil");

let buscaminas;

function iniciar(dificultad) {
    if (dificultad == 'facil')
        buscaminas = new Buscaminas(8, 8, 10);
    else if (dificultad == 'medio')
        buscaminas = new Buscaminas(16, 16, 40);
    else if (dificultad == 'dificil')
        buscaminas = new Buscaminas(16, 30, 99);
    else
        return;


    console.log("Ahora tienes el objeto buscaminas listo");
    console.log("Recuerda hacer un buscaminas.init() para iniciar el juego");
};





// Función para generar int aleatorio entre dos valores
// Fuente -> https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}