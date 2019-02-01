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
    let arrayCambios;
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
        crearTablero(filas, columnas);
        colocarMinas(numeroMinas);
        colocarNumeros();
        //numLibres = numFilas * numComlumnas - numMinas;
        //perdida = false;
        //return campoMinas;
        arrayCambios = [];
    }


    /**
     * Asigna a cada casilla el valor según el número de minas que hay alrededor
     */
    function colocarNumeros() {
        // console.log('entra colocar numeros');
        for (let x = 0; x < filas; x++) {
            for (let y = 0; y < columnas; y++) {
                let casilla = getCasilla(x, y);
                if (casilla.tipo == 'mina')
                    continue;
                let numeroMinas = 0;
                // Recorremos todas las casillas de alrededor y vemos si son minas para colocar el numero
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        try {
                            let casilla2 = tablero[(x + i)][(y + j)];
                            if (casilla2 != null && casilla2.tipo == 'mina' && casilla2 != undefined)
                                numeroMinas++;
                        } catch {
                            continue;
                        }
                    }
                }
                // console.log(numeroMinas);
                casilla.valorMostrar = numeroMinas.toString();
            }
        }
    }

    /**
     * Crea un tablero en función del tamaño pasado.
     * @param {Número de filas} filas 
     * @param {Número de columnas} columnas 
     */
    function crearTablero(filas, columnas) {
        let matriz = [];
        for (let i = 0; i < filas; i++) {
            matriz[i] = []
            for (let j = 0; j < columnas; j++) {
                matriz[i][j] = new Casilla('normal');
            }
        }
        tablero = matriz;
    }

    /**
     * Devuelve la casilla en las coordenadas indicadas. En caso de que no exista, salta una excepción
     * @param {Posición x (ancho) en el tablero} x 
     * @param {Posición y (alto) en el tablero} y 
     */
    function getCasilla(x, y) {
        try {
            if (tablero[x][y] == undefined)
                throw new Error();
            return tablero[x][y];
        } catch (error) {
            throw new Error("La posición seleccionada no es válida");
        }

    }

    /**
     * Coloca el número de minas indicado en el tablero.
     * @param {Número de minas a colocar} numeroMinas 
     */
    function colocarMinas(numeroMinas) {
        let minasColocadas = 0;
        do {
            let casilla = getCasillaAleatoria(tablero);
            if (casilla.tipo === "normal") {
                casilla.convertirMina();
                minasColocadas++;
            }
        } while (minasColocadas < numeroMinas);

    }

    /**
     * Devuelve una casilla aleatoria del tablero;
     */
    function getCasillaAleatoria() {
        let x = getRandomInt(0, filas);
        let y = getRandomInt(0, columnas);
        return tablero[x][y];
    }

    //Devuelve una matriz con todo el contenido del tablero
    function mostrarTableroJuego() {
        return tablero;
    }

    // Devuelve un array con las coordenadas de las casillas afectadas
    function mostrarCambios() {
        // Devolvemos el array a la vez que lo reseteamos
        let varTemp = arrayCambios ;
        arrayCambios = [];
        return varTemp;
    }

    // Función cuando picas una casilla
    function picarCasilla(x, y) {
        try {

            let casilla = getCasilla(x, y);
            // picarCasilla(casilla,x,y);

            // Se comprueba si está deshabilitada o si está la bandera puesta
            if (casilla.deshabilitado === true || casilla.bandera === true || casilla.descubierto === true) {
                console.error('La casilla está deshabilitada, marcada o ya descubierta.');
                return;
            }
            casilla.descubierto = true;

            // Añadimos la casilla al array de cambios
            arrayCambios.push(x+"-"+y);
            // arrayCambios = [];
            console.log('log picarCasilla '+arrayCambios);


            // Si has tocado una mina, pierdes
            if (casilla.tipo === 'mina')
                perder();
            // Si el valor de la mina que tienes es '0', se descubren recursivamente
            if (parseInt(casilla.valorMostrar) == 0)
                descubrirRecursivo(x, y);
            comprobarGanar();

        } catch (error) {
            console.error(error);
        }

    }

    function perder() {

    }

    function descubrirRecursivo(x, y) {
        // console.log('Recursivo de -> x:' + x + ' - y:' + y);
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                try {
                    let casilla = getCasilla((parseInt(x) + i), (parseInt(y) + j));
                    if (casilla != undefined && casilla.descubierto === false && casilla.deshabilitado == false)
                        picarCasilla((parseInt(x) + i), (parseInt(y) + j));
                } catch {
                    continue;
                }
            }
        }
    }

    function comprobarGanar() {

    }

    function marcarCasilla(casilla) {

    }

    return {
        init: init,
        mostrar: mostrarTableroJuego,
        cambios: mostrarCambios,
        picar: picarCasilla,
        marcar: marcarCasilla,

        //despejar: despejarCasilla
    }
})();