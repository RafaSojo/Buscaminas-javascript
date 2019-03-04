/**
 * 
 * @param {*} tipo El tipo de casilla puede ser 'mina' o 'normal'
 * @param {*} valorMostrar 
 */
function Casilla(tipo) {
    this.tipo = tipo;
    this.bandera = false;
    this.descubierto = false;
    this.deshabilitado = false;

    this.valorMostrar = '0';

    this.convertirMina = function () {
        this.tipo = 'mina';
        this.valorMostrar = '<span>💣</span>';
    };

    this.getImagen = function () {
        return '';
    }

    this.getValor = function () {
        if (this.descubierto == false && this.bandera == true)
            return '🚩';
        if (this.descubierto == false)
            return '⬛';
        if (this.valorMostrar == '0')
            return '0️⃣';
        if (this.valorMostrar == '1')
            return '1️⃣';
        if (this.valorMostrar == '2')
            return '2️⃣';
        if (this.valorMostrar == '3')
            return '3️⃣';
        if (this.valorMostrar == '4')
            return '4️⃣';
        if (this.valorMostrar == '5')
            return '5️⃣';
        if (this.valorMostrar == '6')
            return '6️⃣';
        if (this.valorMostrar == '7')
            return '7️⃣';
        if (this.valorMostrar == '8')
            return '8️⃣';
        if (this.valorMostrar == '9')
            return '9️⃣';
        if (this.tipo == 'mina')
            return '<span>💣</span>';
        return valorMostrar;
    };

    this.setBandera = function () {
        return this.bandera = !this.bandera;
    };

}