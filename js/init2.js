{
    let tableroArrayDom;
    let $tableroDom;

    $(() => {
        $('#select-dificultad').change(iniciaJuego).change();
    });


    function iniciaJuego() {
        let dificultad = this.value;
        // console.log(dificultad);
        buscaminas.init(dificultad);
        $tableroDom = $('#tableroJuego');

        iniciarTablero();

    }

    // Pinta por primera vez el tablero
    function iniciarTablero() {
        // console.log(buscaminas);
        let alto = buscaminas.mostrar().length;
        // console.log(alto);
        let ancho = buscaminas.mostrar()[0].length

        tableroArrayDom = new Array(alto);
        // console.log(tableroArrayDom);

        let divContenedor = $('<div></div>');
        for (let i = 0; i < alto; i++) {
            tableroArrayDom[i] = [];
            for (let x = 0; x < ancho; x++) {
                tableroArrayDom[i].push(
                    $('<div class="casillaBuscamina" id="' + x + '-' + i + '"></div>')
                        .click(picarCasilla)
                        .contextmenu(colocarBandera)
                        .data('x', x)
                        .data('y', i)
                );
                divContenedor.append(tableroArrayDom[i][x]);
            }
        }
        $tableroDom.html(divContenedor);
        $('.Tablero>div').css("grid-template-columns", "repeat(" + ancho + ",1fr)");
        // $('.casillaBuscamina').css("height", tableroArrayDom[1][2].css('width'));
    }


    function picarCasilla() {
        let $casilla = $(this);
        // console.log(casilla);

        let y = $casilla.data('y');
        let x = $casilla.data('x');

        buscaminas.picar(x, y);

        mostrarCambios();
        // console.log(buscaminas);

        if (buscaminas.partidaPerdida())
            perder();
        if (buscaminas.partidaGanada())
            ganar();
    }

    function colocarBandera(evento) {
        evento.preventDefault();
        let casilla = this;
        buscaminas.marcar(casilla);
        console.log(casilla);
    }


    function mostrarCambios() {
        let arrayCambios = buscaminas.cambios();
        // console.log(arrayCambios);
        for (let i = 0; i < arrayCambios.length; i++) {
            $casilla = $('#' + arrayCambios[i][0]);
            let casillaDatos = arrayCambios[i][1];
            $casilla.html(casillaDatos.valorMostrar);

            $casilla.addClass('casillaDescubierta').effect("bounce", "slow");
            if (casillaDatos.tipo === 'mina')
                $casilla.addClass('mina');
            // console.log(arrayCambios[i][1]);
            // debugger;
        }

    }

    function ganar() {

    }


    function perder() {
        // Mostramos mensaje de perder
        alert('has perdido');

        // Desactivamos el tablero
        $('.casillaBuscamina').unbind('click');

        // Mostramos las minas
        mostrarCambios();
    }



}