    // Función para generar int aleatorio entre dos valores
// Fuente -> https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let buscaminas = (function () {

    let tablero;
    let partidaTerminada = false;
    let numeroMinas;
    let filas;
    let columnas;
    let casillasRestantes;
    // let columnasCampoMinas;
    // let filasCampoMinas;
    // let arrayLevantadas;

    function init(dificultad = 1) {
        switch (dificultad) {
            case '2':
                filas = 16;
                columnas = 16;
                numeroMinas = 30;
                break;
            case '3':
                filas = 30;
                columnas = 30;
                numeroMinas = 99;
                break;
            case '1':
            default:
                filas = 8;
                columnas = 8;
                numeroMinas = 10;
                break;
        }
        crearTablero(filas, columnas, numeroMinas);
        colocarMinas(numeroMinas);
        //numLibres = numFilas * numComlumnas - numMinas;
        //perdida = false;
        //return campoMinas;
    }

    function crearTablero(filas, columnas, numeroMinas) {
        let matriz = [];
        for (let i = 0; i < filas; i++) {
            matriz[i] = []
            for (let j = 0; j < columnas; j++) {
                matriz[i][j] = new Casilla('normal');
            }
        }
        tablero = matriz;
    }

    function colocarMinas(numeroMinas){
        let minasColocadas = 0;
        do {
            let casilla = getCasillaAleatoria(tablero);
            if (casilla.tipo === "normal") {
                casilla.convertirMina();
                minasColocadas++;
            }
        } while (minasColocadas < numeroMinas);

    }

    function getCasillaAleatoria() {
        let x = getRandomInt(0, filas);
        let y = getRandomInt(0, columnas);
        return tablero[x][y];
    }

    //Devuelve una matriz con todo el contenido del tablero
    function mostrarTableroJuego(){
        return tablero;
    }

    // Devuelve un array con las coordenadas de las casillas afectadas
    function mostrarCambios(){

    }

    function picarCasilla(casilla){

    }


    return {
        init: init,
        mostrar: mostrarTableroJuego,
        cambios: mostrarCambios,
        picar: picarCasilla,
      //  marcar: marcarCasilla,
        //despejar: despejarCasilla
    }
})();