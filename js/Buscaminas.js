function Buscaminas(ancho, alto, numeroMinas) {
    this.ancho = this.comprobarPositivo(ancho);
    this.alto = this.comprobarPositivo(alto);
    this.numeroMinas = this.comprobarNumeroMinas(this.comprobarPositivo(numeroMinas), ancho, alto);

    //  genera un campo de minas nuevo y lo muestra por consola
    this.init = function () {
        // Generamos el tablero
        this.tablero = this.generarTablero(this.ancho, this.alto);
        this.ponerMinas(this.tablero, this.numeroMinas);
        this.ponerNumeros(this.tablero);

        // Lo mostramos
        this.mostrar();
    };

    // Para mostrar el tablero
    this.mostrar = function () {
        console.log('------- Buscaminas by Sojo -----------');
        for (x = 0; x < this.ancho; x++) {
            // console.log(1);
            linea = x + "-\t|";
            for (y = 0; y < this.alto; y++) {
                let casilla = this.getCasilla(x, y);
                linea += casilla.getValor() + ' ';
                // if (casilla.bandera === true)
                //     linea += '🚩 ';
                // else if (casilla.descubierto === false)
                //     linea += '#️⃣ '
                // else
                //     linea += casilla.valorMostrar + " ";
            }
            linea += "| -" + x;
            console.log(linea);
        }
    };


    this.mostrarDebug = function () {
        console.log('------- Buscaminas by Sojo -----------');
        for (x = 0; x < this.ancho; x++) {
            linea = x + "-\t|";
            for (y = 0; y < this.alto; y++) {
                let casilla = this.getCasilla(x, y)
                linea += casilla.valorMostrar + " ";
            }
            linea += "| -" + x;
            console.log(linea);
        }
        // console.table(this.tablero);
    };

    /**
     * To-Do:
     * .picar(x, y): pica en la casilla (x, y) y muestra el campo de minas actualizado. 
     * En caso de picar una minas se indica que se ha perdido el juego. 
     * En caso de no quedar casillas por levantar se indica que se ha ganado el juego.
     */
    this.picar = function (y, x) {

        // Primero obtenemos la casilla que se ha picado
        let casilla = this.getCasilla(x, y);
        // this.picarCasilla(casilla,x,y);

        // Se comprueba si está deshabilitada o si está la bandera puesta
        if (casilla.deshabilitado === true || casilla.bandera === true || casilla.descubierto === true){
            console.error('La casilla esa deshabilitada, marcada o ya descubierta.');
            return;
        }
        console.log('Descubriendo casilla..');
        casilla.descubierto = true;

        // Si has tocado una mina, pierdes
        if (casilla.tipo === 'mina')
            throw new Error('¡Has perdido! Has tocado una mina');

        // Si el valor de la mina que tienes es '0', se descubren recursivamente
        if (casilla.valorMostrar == '0') {
            this.descubrirRecursivo(x, y);
        }

        // console.log('x: '+x+ " - y: "+y);

        this.mostrar();

    };

    // this.picarCasilla = function (casilla, x, y) {

    // };

    this.descubrirRecursivo = function (x, y) {
        // console.log("entra en recursivo");
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                try {
                    let casilla = this.getCasilla((parseInt(x) + i), (parseInt(y) + j));
                    // console.log(casilla);
                    if (casilla != undefined && casilla.tipo != 'mina' && casilla.descubierto == false && casilla.deshabilitado == false)
                        this.picar((parseInt(x) + i), (parseInt(y) + j));
                } catch {
                    continue;
                }

            }
        }

    }



    // To-Do: marca con una bandera la casilla (x, y) y muestra el campo de minas actualizado.
    this.marcar = function (y, x) {
        this.getCasilla(x, y).setBandera();
        // casilla.bandera = true;
        this.mostrar();
    };


    /**
     * To-Do:
     * intenta destapar las casillas colindantes, sólo si el número de banderas se corresponden con las que indica la casilla. Entonces muestra el campo de minas actualizado.
     * En caso de estar las banderas equivocadas se indica que se ha perdido el juego.
     */
    this.despejar = function (x, y) {

    };

    /**
     * Genera el tablero que es una tabla que está contenida en el objeto.
     */
    this.generarTablero = function (ancho, alto) {
        let tablero = [];
        for (let i = 0; i < ancho; i++) {
            tablero.push([]);
            for (let x = 0; x < alto; x++)
                tablero[i].push((new Casilla('normal', 0)));
        }
        return tablero;
    }



    /**
     * ponerMinas(tablero, numeroMinas) coloca el número de minas indicado en el tablero.
     */
    this.ponerMinas = function (tablero, numeroMinas) {
        let minasColocadas = 0;
        do {
            let casilla = this.getCasillaAleatoria(tablero);
            if (casilla.tipo === "normal") {
                casilla.convertirMina();
                minasColocadas++;
            }
        } while (minasColocadas < numeroMinas);
    }

    /**
     * Devuelve una casilla aleatoria dentro del tablero
     */
    this.getCasillaAleatoria = function () {
        let x = getRandomInt(0, this.ancho);
        let y = getRandomInt(0, this.alto);
        return this.tablero[x][y];
    };

    /**
     * Da el valor correspondiente a cada casilla
     */
    this.ponerNumeros = function () {
        // console.log(tablero);
        for (let ancho = 0; ancho < this.ancho; ancho++) {
            for (let alto = 0; alto < this.alto; alto++) {
                // let casilla = tablero[ancho][alto];
                let casilla = this.getCasilla(ancho, alto);
                if (casilla.tipo == 'mina')
                    continue;
                let numeroMinas = 0;
                // ahora vamos recorriendo todas las casillas de alrededor y vemos si son minas para colocar el numero
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        try {
                            let casilla2 = this.tablero[(ancho + i)][(alto + j)];
                            if (casilla2 != null && casilla2.tipo == 'mina' && casilla2 != undefined)
                                numeroMinas++;
                        } catch {
                            continue;
                        }
                    }
                }
                casilla.valorMostrar = numeroMinas;
            }
        }
    };





} // Fin objeto buscaminas

Buscaminas.prototype.comprobarPositivo = function (numero) {
    if (numero < 1 || isNaN(numero))
        throw new Error("Tiene que ser un número positivo");
    return numero;
}

Buscaminas.prototype.comprobarNumeroMinas = function (numeroMinas, ancho, alto) {
    if ((ancho * alto) <= numeroMinas)
        throw new Error("Hay que indicar menos minas que casillas");
    return numeroMinas;
}

Buscaminas.prototype.getCasilla = function (x, y) {
    try {
        if (this.tablero[x][y] == undefined)
            throw new Error();
        return this.tablero[x][y];
    } catch (error) {
        throw new Error("La posición seleccionada no es válida");
    }
}


// Buscaminas.prototype.toString = function buscaminastoString() {
//     return this.valorMostrar;
// }


// Perro.prototype.toString = function perroToString() {
//     var retorno = "Perro " + this.nombre + " es " + this.sexo + " " + this.color + " " + this.criadero;
//     return retorno;
//   }