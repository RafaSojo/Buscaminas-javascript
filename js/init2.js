{
    let tableroArrayDom;
    let $tableroDom, $spanMinutos, $spanSegundos;
    let intervalReloj, banderasColocadas;


    $(() => {
        $spanMinutos = $("#minutos");
        $spanSegundos = $("#segundos");

        $('#select-dificultad').change(iniciaJuego).change();
        console.log('Para debug del buscaminas, llamar a buscaminas.mostrar()');
        $('body').contextmenu(e => e.preventDefault());
    });


    function iniciaJuego() {
        activarReloj();

        let dificultad = this.value;
        buscaminas.init(dificultad);
        $tableroDom = $('#tableroJuego');

        iniciarTablero();
        banderasColocadas = 0;
        $('#banderasTotales').text(buscaminas.nMinas());

    }

    // Pinta por primera vez el tablero
    function iniciarTablero() {
        let alto = buscaminas.filas();
        let ancho = buscaminas.columnas();

        tableroArrayDom = new Array(alto);

        let divContenedor = $('<div></div>');
        for (let i = 0; i < alto; i++) {
            tableroArrayDom[i] = [];
            for (let x = 0; x < ancho; x++) {
                tableroArrayDom[i].push(
                    $('<div class="casillaBuscamina" id="' + x + '-' + i + '"></div>')
                    .on('mousedown', handlerClick)
                    .data('x', x)
                    .data('y', i)
                );
                divContenedor.append(tableroArrayDom[i][x]);
            }
        }
        $tableroDom.html(divContenedor);
        $('.Tablero>div').css("grid-template-columns", "repeat(" + ancho + ",1fr)");
    }

    function descubrir($casilla) {
        console.log(this);
    }


    function picarCasilla($casilla) {
        let y = $casilla.data('y');
        let x = $casilla.data('x');

        buscaminas.picar(x, y);

        mostrarCambios();

        if (buscaminas.partidaPerdida())
            perder();
        else if (buscaminas.partidaGanada())
            ganar();
    }

    function colocarBandera($casilla) {
        let y = $casilla.data('y');
        let x = $casilla.data('x');

        try {
            if (buscaminas.marcar(x, y)) {
                $casilla.addClass('casillaMarcada');
                sumarBandera(1);
            } else {
                $casilla.removeClass('casillaMarcada');
                sumarBandera(-1);
            }
        } catch (error) {
            alert(error);
        }

    }

    function handlerClick(e) {
        e.preventDefault();

        $casilla = $(this);

        switch (e.buttons) {
            case 1:
              picarCasilla($casilla);
              break;
            case 2:
              colocarBandera($casilla);
              break;
            case 3:
            case 4:
                descubrir($casilla);
                break;
          }


    }

    function sumarBandera(cantidad) {
        banderasColocadas += cantidad;
        $('#numBanderas').text(banderasColocadas);
    }

    function mostrarCambios() {
        let arrayCambios = buscaminas.cambios();
        for (let i = 0; i < arrayCambios.length; i++) {
            $casilla = $('#' + arrayCambios[i][0]);
            let casillaDatos = arrayCambios[i][1];
            $casilla.html(casillaDatos.valorMostrar);

            $casilla.addClass('casillaDescubierta').effect("bounce", "slow");
            if (casillaDatos.tipo === 'mina')
                $casilla.addClass('mina');
        }
    }

    function ganar() {
        janelaPopUp.abre("2", 'p green', '¡Has ganado!', 'Enhorabuena, has ganado la partida en *TIEMPO*.', undefined, undefined, 'Cerrar', 'Jugar de nuevo');

        mostrarCambios();
        $('.mina').addClass('minaGanada');

        // Desactivamos el tablero //#endregion
        $('.casillaBuscamina').unbind('mousedown');
        pararReloj();
    }

    function perder() {
        // Mostramos mensaje de perder
        janelaPopUp.abre("2", 'p red', '¡Has perdido!', 'Oohh, has tocado una mina y has perdido', undefined, iniciaJuego, 'Cerrar', 'Jugar de nuevo');

        // Desactivamos el tablero
        $('.casillaBuscamina').unbind('mousedown');

        // Mostramos las minas
        mostrarCambios();
        pararReloj();
    }

    function activarReloj() {

        // Se resetean antes de nada para un efecto visual bonito
        $spanMinutos.text('00');
        $spanSegundos.text('00');
        let tiempo = {
            hora: 0,
            minuto: 0,
            segundo: 0
        };

        pararReloj();

        intervalReloj = setInterval(function () {
            tiempo.segundo++;
            if (tiempo.segundo >= 60) {
                tiempo.segundo = 0;
                tiempo.minuto++;
            }
            if (tiempo.minuto >= 60) {
                tiempo.minuto = 0;
                tiempo.hora++;
            }
            $spanMinutos.text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
            $spanSegundos.text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
        }, 1000);
    }


    function pararReloj() {
        clearInterval(intervalReloj);
    }

}










// ################################
// Código para alertas:
// ################################

var janelaPopUp = new Object();
janelaPopUp.abre = function (id, classes, titulo, corpo, functionCancelar, functionEnviar, textoCancelar, textoEnviar) {
    var cancelar = (textoCancelar !== undefined) ? textoCancelar : 'Cancel';
    var enviar = (textoEnviar !== undefined) ? textoEnviar : 'Send';
    classes += ' ';
    var classArray = classes.split(' ');
    classes = '';
    classesFundo = '';
    var classBot = '';
    $.each(classArray, function (index, value) {
        switch (value) {
            case 'alert':
                classBot += ' alert ';
                break;
            case 'blue':
                classesFundo += this + ' ';
            case 'green':
                classesFundo += this + ' ';
            case 'red':
                classesFundo += this + ' ';
            case 'white':
                classesFundo += this + ' ';
            case 'orange':
                classesFundo += this + ' ';
            case 'purple':
                classesFundo += this + ' ';
            default:
                classes += this + ' ';
                break;
        }
    });
    var popFundo = '<div id="popFundo_' + id + '" class="popUpFundo ' + classesFundo + '"></div>'
    var janela = '<div id="' + id + '" class="popUp ' + classes + '"><h1>' + titulo + "</h1><div><span>" + corpo + "</span></div><button class='puCancelar " + classBot + "' id='" + id + "_cancelar' data-parent=" + id + ">" + cancelar + "</button><button class='puEnviar " + classBot + "' data-parent=" + id + " id='" + id + "_enviar'>" + enviar + "</button></div>";
    $("window, body").css('overflow', 'hidden');

    $("body").append(popFundo);
    $("body").append(janela);
    $("body").append(popFundo);
    //alert(janela);
    $("#popFundo_" + id).fadeIn("fast");
    $("#" + id).addClass("popUpEntrada");

    $("#" + id + '_cancelar').on("click", function () {
        if ((functionCancelar !== undefined) && (functionCancelar !== '')) {
            functionCancelar();

        } else {
            janelaPopUp.fecha(id);
        }
    });
    $("#" + id + '_enviar').on("click", function () {
        if ((functionEnviar !== undefined) && (functionEnviar !== ''))
            functionEnviar();
        janelaPopUp.fecha(id);

    });

};
janelaPopUp.fecha = function (id) {
    if (id !== undefined) {
        $("#" + id).removeClass("popUpEntrada").addClass("popUpSaida");

        $("#popFundo_" + id).fadeOut(1000, function () {
            $("#popFundo_" + id).remove();
            $("#" + $(this).attr("id") + ", #" + id).remove();
            if (!($(".popUp")[0])) {
                $("window, body").css('overflow', 'auto');
            }
        });


    } else {
        $(".popUp").removeClass("popUpEntrada").addClass("popUpSaida");

        $(".popUpFundo").fadeOut(1000, function () {
            $(".popUpFundo").remove();
            $(".popUp").remove();
            $("window, body").css('overflow', 'auto');
        });


    }
}
$("button").on("click", function () {
    var myText = $("#myText").val();
    janelaPopUp.abre("asdf", $("#size").val() + " " + $(this).html() + ' ' + $("#mode").val(), $("#title").val(), myText)
});



// function(id, classes, titulo, corpo, functionCancelar, functionEnviar, textoCancelar, textoEnviar){

// janelaPopUp.abre( "2", 'p red',  '¡Has perdido!' ,  'Oohh, has tocado una mina y has perdido',undefined,undefined,'Cerrar','Jugar de nuevo');
// setTimeout(function(){janelaPopUp.fecha('example');}, 2000);