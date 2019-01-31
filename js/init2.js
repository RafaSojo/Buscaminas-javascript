{
    let tableroArrayDom;

    $(()=>{
        $('#dificultad').change(iniciaJuego);
    });


    function iniciaJuego(){
        let dificultad = this.value;
        buscaminas.init(dificultad);
        iniciarTablero();

    }

    // Pinta por primera vez el tablero
    function iniciarTablero(){
        console.log(buscaminas);
        let alto = buscaminas.mostrar().length;
        let ancho = buscaminas.mostrar()[0].length

        let tableroArrayDom = new Array(alto);
        console.log(tableroArrayDom);

        let divContenedor = $('<div></div>');
        for(let i = 0;i<alto;i++){
            for(let x = 0;x<ancho;x++){
                tableroArrayDom[i].push($('<div class="casillaBuscamina"><span><span></div>'))
            }
        }

      /*  tableroArrayDom = [campoMinas.length];
        for (let i = 0; i < campoMinas.length; i++) {
            tableroArrayDom[i] = [campoMinas.length];
            for (let j = 0; j < campoMinas[1].length; j++) {
                tableroArrayDom[i][j] = $('<div class="casillaBuscamina"><span><span></div>');
                tableroArrayDom[i][j].attr('id', i + "_" + j);
                divContenedor.append(tableroArrayDom[i][j]);
            }
        }
        tableroDom.html(divContenedor);
        $('.Tablero>div').css("grid-template-columns", "repeat(" + campoMinas.length + ",1fr)");
        $('.casillaBuscamina').css("height", tableroArrayDom[1][2].css('width'));*/
    }






    
}