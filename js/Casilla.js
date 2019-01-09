/**
 * 
 * @param {*} tipo El tipo de casilla puede ser 'mina' o 'normal'
 * @param {*} valorMostrar 
 */
function Casilla(tipo) {
    this.tipo = tipo;
    // this.valorMostrar = valorMostrar;
    this.bandera = false;
    this.descubierto = false;
    this.deshabilitado = false;

    this.valorMostrar = '0';

    this.convertirMina = function () {
        this.tipo = 'mina';
        this.valorMostrar = '💣';
    };

    this.getValor = function () {
        if (this.descubierto == false && this.bandera == true)
            return '🚩';
        else if (this.descubierto == false)
            return '⬛';
        else if (this.valorMostrar == '0')
            return '0️⃣';
        else if (this.valorMostrar == '1')
            return '1️⃣';
        else if (this.valorMostrar == '2')
            return '2️⃣';
        else if (this.valorMostrar == '3')
            return '3️⃣';
        else if (this.valorMostrar == '4')
            return '4️⃣';
        else if (this.valorMostrar == '5')
            return '5️⃣';
        else if (this.valorMostrar == '6')
            return '6️⃣';
        else if (this.valorMostrar == '7')
            return '7️⃣';
        else if (this.valorMostrar == '8')
            return '8️⃣';
        else if (this.valorMostrar == '9')
            return '9️⃣';
        else if (this.tipo == 'mina')
            return '💣';
        else
            return valorMostrar;
    };

    this.setBandera = function () {
        if (this.bandera)
            this.bandera = false;
        else
            this.bandera = true;
    };

    // this.toString = function () {
    //     return this.tipo;
    // } 0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣#️⃣💣🚩
}


Casilla.prototype.toString = function () {
    return this.tipo;
}