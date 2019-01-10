{
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
            let pintar = "\t|\t0\t";
            for (let i = 1; i < this.alto; i++)
                pintar += i + '\t';
            pintar += ' |';
            console.log(pintar);
            for (x = 0; x < this.ancho; x++) {
                linea = x + "\t|\t";
                for (y = 0; y < this.alto; y++) {
                    let casilla = this.getCasilla(x, y);
                    linea += casilla.getValor() + '\t';
                }
                linea += " | " + x;
                console.log(linea);
            }
            console.log(pintar);
        };

        /**
         * Método que se llama cuando se gana la partida
         */
        this.ganar = function () {
            this.deshabilitarTablero();
            this.descubrirTablero();
            this.mostrar();
            console.warn('¡Enhorabuena! Has ganado la partida.');
        };

        /**
         * Comprueba el tablero si se ha ganado
         */
        this.comprobarGanar = function () {
            let noDescubiertas = 0;
            for (let ancho = 0; ancho < this.ancho; ancho++)
                for (let alto = 0; alto < this.alto; alto++)
                    if (this.getCasilla(ancho, alto).descubierto == false)
                        noDescubiertas++;
            if (noDescubiertas == this.numeroMinas)
                this.ganar();

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
        };

        /**
         * .picar(x, y): pica en la casilla (x, y) y muestra el campo de minas actualizado. 
         * En caso de picar una minas se indica que se ha perdido el juego. 
         * En caso de no quedar casillas por levantar se indica que se ha ganado el juego.
         */
        this.picar = function (x, y) {

            // Primero obtenemos la casilla que se ha picado
            try {

                let casilla = this.getCasilla(x, y);
                // this.picarCasilla(casilla,x,y);

                // Se comprueba si está deshabilitada o si está la bandera puesta
                if (casilla.deshabilitado === true || casilla.bandera === true || casilla.descubierto === true) {
                    console.error('La casilla está deshabilitada, marcada o ya descubierta.');
                    return;
                }
                casilla.descubierto = true;

                // Si has tocado una mina, pierdes
                if (casilla.tipo === 'mina')
                    this.perder();
                // Si el valor de la mina que tienes es '0', se descubren recursivamente
                if (parseInt(casilla.valorMostrar) == 0)
                    this.descubrirRecursivo(x, y);
                this.comprobarGanar();

            } catch (error) {
                console.error(error);
            }


        };

        /**
         * Se llama a esta función cuando has tocado una mina
         */
        this.perder = function () {
            this.deshabilitarTablero();
            this.descubrirTablero();
            this.mostrar();
            throw new Error('¡Has perdido! Has tocado una mina');
        };


        /**
         * Esta función descubre todas las casillas alrededor de la posición indicada
         */
        this.descubrirRecursivo = function (x, y) {
            console.log('Recursivo de -> x:' + x + ' - y:' + y);
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    try {
                        let casilla = this.getCasilla((parseInt(x) + i), (parseInt(y) + j));
                        if (casilla != undefined && casilla.descubierto === false && casilla.deshabilitado == false)
                            this.picar((parseInt(x) + i), (parseInt(y) + j));
                    } catch {
                        continue;
                    }
                }
            }
        }


        // marca con una bandera la casilla (x, y) y muestra el campo de minas actualizado.
        this.marcar = function (x, y) {
            try {
                this.getCasilla(x, y).setBandera();
                this.mostrar();
            } catch (error) {
                console.error(error);
            }
        };


        /**
         * intenta destapar las casillas colindantes, sólo si el número de banderas se corresponden con las que indica la casilla. Entonces muestra el campo de minas actualizado.
         * En caso de estar las banderas equivocadas se indica que se ha perdido el juego.
         */
        this.despejar = function (x, y) {

            let casilla = this.getCasilla(x, y);
            if (casilla.descubierto === false || casilla.bandera === true) {
                console.log(casilla);
                console.error('La casilla tiene no está descubierta o tiene una bandera.');
                return;
            }

            let numeroBanderasAlrededor = this.getNumeroBanderasAlrededor(x, y);
            if (casilla.valorMostrar == numeroBanderasAlrededor)
                this.descubrirRecursivo(x, y);
            else
                console.log('No coincide el número de banderas con el número de minas alrededor.');
        };

        /**
         * Devuelve el número de banderas (casillas marcadas) alrededor de una casilla
         */
        this.getNumeroBanderasAlrededor = function (x, y) {
            let numeroBanderas = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    try {
                        let casilla = this.tablero[(x + i)][(y + j)];
                        if (casilla != null && casilla.bandera === true && casilla != undefined)
                            numeroBanderas++;
                    } catch {
                        continue;
                    }
                }
            }
            return numeroBanderas;
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
            for (let ancho = 0; ancho < this.ancho; ancho++) {
                for (let alto = 0; alto < this.alto; alto++) {
                    let casilla = this.getCasilla(ancho, alto);
                    if (casilla.tipo == 'mina')
                        continue;
                    let numeroMinas = 0;

                    // Recorremos todas las casillas de alrededor y vemos si son minas para colocar el numero
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


        /**
         * Descubre todo el tablero y lo muestra
         */
        this.descubrirTablero = function () {
            for (let ancho = 0; ancho < this.ancho; ancho++)
                for (let alto = 0; alto < this.alto; alto++)
                    this.getCasilla(ancho, alto).descubierto = true;
            // this.mostrar();
        };

        this.deshabilitarTablero = function () {
            for (let ancho = 0; ancho < this.ancho; ancho++)
                for (let alto = 0; alto < this.alto; alto++)
                    this.getCasilla(ancho, alto).deshabilitado = true;
            // this.mostrar();
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
}