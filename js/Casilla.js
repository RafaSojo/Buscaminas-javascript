/**
 * 
 * @param {*} tipo El tipo de casilla puede ser 'mina' o 'normal'
 * @param {*} valorMostrar 
 */
function Casilla(tipo){
    this.tipo = tipo;
    // this.valorMostrar = valorMostrar;
    this.bandera = false;
    this.descubierto = false;
    this.deshabilitado = false;
    
    this.valorMostrar = '0';

    this.convertirMina = function () {
        this.tipo = 'mina';
        this.valorMostrar = '*';
    }
}

