{
    let tableroArrayDom;
    let $tableroDom, $spanMinutos, $spanSegundos;
    let intervalReloj;


    $(() => {
        $spanMinutos = $("#minutos");
        $spanSegundos = $("#segundos");

        $('#select-dificultad').change(iniciaJuego).change();
        console.log('Para debug del buscaminas, llamar a buscaminas.debug()');
        console.log('El caracter 9 es la mina');
    });


    function iniciaJuego() {
        activarReloj();

        // To-Do: revisar
        let dificultad = this.value;
        // console.log(dificultad);
        buscaminas.init(dificultad);
        $tableroDom = $('#tableroJuego');

        iniciarTablero();

    }

    // Pinta por primera vez el tablero
    function iniciarTablero() {
        // console.log(buscaminas);
        let alto = buscaminas.filas();
        // console.log(buscaminas);
        let ancho = buscaminas.columnas();

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
        else if (buscaminas.partidaGanada())
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
        // console.error('array cambos;');
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
        janelaPopUp.abre( "2", 'p green',  '¡Has ganado!' ,  'Enhorabuena, has ganado la partida en *TIEMPO*.',undefined,undefined,'Cerrar','Jugar de nuevo');

        mostrarCambios();
        $('.mina').addClass('minaGanada');
    }


    function perder() {
        // Mostramos mensaje de perder
        // alert('has perdido');
        janelaPopUp.abre( "2", 'p red',  '¡Has perdido!' ,  'Oohh, has tocado una mina y has perdido',undefined,iniciaJuego,'Cerrar','Jugar de nuevo');

        // Desactivamos el tablero
        $('.casillaBuscamina').unbind('click');

        // Mostramos las minas
        mostrarCambios();
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

        clearInterval(intervalReloj);
        // intervalReloj = null;


        intervalReloj = setInterval(function () {
            tiempo.segundo++;
            if (tiempo.segundo >= 60) {
                tiempo.segundo = 0;
                tiempo.minuto++;
            }
            // Minutos
            if (tiempo.minuto >= 60) {
                tiempo.minuto = 0;
                tiempo.hora++;
            }
            $spanMinutos.text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
            $spanSegundos.text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
        }, 1000);
    }



}






















// ################################
// Código para alertas:
// ################################

var janelaPopUp = new Object();
janelaPopUp.abre = function(id, classes, titulo, corpo, functionCancelar, functionEnviar, textoCancelar, textoEnviar){
    var cancelar = (textoCancelar !== undefined)? textoCancelar: 'Cancel';
    var enviar = (textoEnviar !== undefined)? textoEnviar: 'Send';
    classes += ' ';
    var classArray = classes.split(' ');
    classes = '';
    classesFundo = '';
    var classBot = '';
    $.each(classArray, function(index, value){
        switch(value){
            case 'alert' : classBot += ' alert '; break;
            case 'blue' : classesFundo += this + ' ';
            case 'green' : classesFundo += this + ' ';
            case 'red' : classesFundo += this + ' ';
            case 'white': classesFundo += this + ' ';
            case 'orange': classesFundo += this + ' ';
            case 'purple': classesFundo += this + ' ';
            default : classes += this + ' '; break;
        }
    });
    var popFundo = '<div id="popFundo_' + id + '" class="popUpFundo ' + classesFundo + '"></div>'
    var janela = '<div id="' + id + '" class="popUp ' + classes + '"><h1>' + titulo + "</h1><div><span>" + corpo + "</span></div><button class='puCancelar " + classBot + "' id='" + id +"_cancelar' data-parent=" + id + ">" + cancelar + "</button><button class='puEnviar " + classBot + "' data-parent=" + id + " id='" + id +"_enviar'>" + enviar + "</button></div>";
    $("window, body").css('overflow', 'hidden');
    
    $("body").append(popFundo);
    $("body").append(janela);
    $("body").append(popFundo);
     //alert(janela);
    $("#popFundo_" + id).fadeIn("fast");
    $("#" + id).addClass("popUpEntrada");
    
    $("#" + id + '_cancelar').on("click", function(){
        if((functionCancelar !== undefined) && (functionCancelar !== '')){
            functionCancelar();
            
        }else{
            janelaPopUp.fecha(id);
        }
    });
    $("#" + id + '_enviar').on("click", function(){
        if((functionEnviar !== undefined) && (functionEnviar !== ''))
            functionEnviar();
            janelaPopUp.fecha(id);
        
    });
    
};
janelaPopUp.fecha = function(id){
    if(id !== undefined){
        $("#" + id).removeClass("popUpEntrada").addClass("popUpSaida"); 
        
            $("#popFundo_" + id).fadeOut(1000, function(){
                $("#popFundo_" + id).remove();
                $("#" + $(this).attr("id") + ", #" + id).remove();
                if (!($(".popUp")[0])){
                    $("window, body").css('overflow', 'auto');
                }
            });
            
      
    }
    else{
        $(".popUp").removeClass("popUpEntrada").addClass("popUpSaida"); 
        
            $(".popUpFundo").fadeOut(1000, function(){
                $(".popUpFundo").remove();
                $(".popUp").remove();
                $("window, body").css('overflow', 'auto');
            });
            
       
    }
}
$("button").on("click", function(){
  var myText = $("#myText").val();
  janelaPopUp.abre( "asdf", $("#size").val() + " "  + $(this).html() + ' ' + $("#mode").val(),  $("#title").val() ,  myText)
});



// function(id, classes, titulo, corpo, functionCancelar, functionEnviar, textoCancelar, textoEnviar){

// janelaPopUp.abre( "2", 'p red',  '¡Has perdido!' ,  'Oohh, has tocado una mina y has perdido',undefined,undefined,'Cerrar','Jugar de nuevo');
// setTimeout(function(){janelaPopUp.fecha('example');}, 2000);




