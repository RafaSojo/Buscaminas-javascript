{

    $(()=>{
        $('#dificultad').change(iniciaJuego);
        iniciarTablero();
    });


    function iniciaJuego(){
        let dificultad = this.value;
        buscaminas.init(dificultad);
    }

    // Pinta por primera vez el tablero
    function iniciarTablero(){

    }






    
}