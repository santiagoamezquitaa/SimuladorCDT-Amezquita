const ratesBpop = [0.1035, 0.1155, 0.118, 0.1225, 0.1250, 0.1220, 0.12];
const ratesBavv = [0.1265, 0.1265, 0.1285, 0.1360, 0.1365, 0.1370];
const ratesBgta = [0.1317, 0.1365, 0.1381, 0.1433, 0.1436, 0.1465, 0.1478, 0.1482, 0.1512];
const ratesBocc = [0.05, 0.05, 0.13, 0.14, 0.14, 0.141, 0.138, 0.13, 0.13, 0.13];

const retencionFuente = 0.04;
const userData = [];

userData[0] = prompt("Ingrese su nombre: ");
userData[1] = prompt("Ingrese su apellido: ");
userData[2] = prompt("Ingrese su email: ");
userData[3] = prompt("Ingrese su número de teléfono");

function calculoCDT(mount, term, rates){
    let calculo = mount*(Math.pow(1+rates, (term/360))-1);
    let total = calculo - calculo * retencionFuente;
    return total;
}

function selectRatesBpop () {
    const mount = parseInt(prompt('Ingrese el monto inicial: '));
    const term = parseInt(prompt('Ingrese el plazo en días (90 - 720): '));
    if (term >= 90 && term <= 119) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBpop[0]));
    } else if (term >= 120 && term <= 149) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBpop[1]));
    } else if (term >= 150 && term <= 179) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBpop[2]));
    } else if (term >= 180 && term <= 359) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBpop[3]));
    } else if (term >= 360 && term <= 539) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBpop[4]));
    } else if (term >= 540 && term <= 719) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBpop[5]));
    } else if (term == 720) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBpop[6]));
    } else {
        alert("No existe ofeta para el plazo dado, por favor repita el flujo, recuerde que el plazo en días es entre 90 y 720 días para el Banco Popular.");
    }
}

function selectRatesBavv() {
    const mount = parseInt(prompt('Ingrese el monto inicial: '));
    const term = parseInt(prompt('Ingrese el plazo en días (90 en adelante): '));
    if (term >= 90 && term <= 119) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBavv[0]));
    } else if (term >= 120 && term <= 179) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBavv[1]));
    } else if (term >= 180 && term <= 359) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBavv[2]));
    } else if (term >= 360 && term <= 539) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBavv[3]));
    } else if (term >= 540 && term <= 719) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBavv[4]));
    } else if (term >= 720) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBavv[5]));
    } else {
        alert("No existe ofeta para el plazo dado, por favor repita el flujo, recuerde que el plazo en días es entre 90 y 720 días para el Banco Popular.");
    }
}

function selectRatesBgta() {
    const mount = parseInt(prompt('Ingrese el monto inicial: '));
    const term = parseInt(prompt('Ingrese el plazo en días (90 en adelante): '));
    if (term >= 90 && term <= 119) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBgta[0]));
    } else if (term >= 120 && term <= 179) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBgta[1]));
    } else if (term >= 180 && term <= 359) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBgta[2]));
    } else if (term >= 360 && term <= 419) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBgta[3]));
    } else if (term >= 420 && term <= 509) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBgta[4]));
    } else if (term >= 510 && term <= 539) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBgta[5]));
    } else if (term >= 540 && term <= 719) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBgta[6]));
    } else if (term >= 720 && term <= 900) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBgta[7]));
    } else if (term > 900) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBgta[8]));
    } else {
        alert("No existe ofeta para el plazo dado, por favor repita el flujo, recuerde que el plazo en días es entre 90 y 720 días para el Banco Popular.");
    }
}

function selectRatesBocc() {
    const mount = parseInt(prompt('Ingrese el monto inicial: '));
    const term = parseInt(prompt('Ingrese el plazo en días (30 en adelante): '));
    if (term >= 30 && term <= 50) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBocc[0]));
    } else if (term >= 51 && term <= 80) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBocc[1]));
    } else if (term >= 81 && term <= 150) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBocc[2]));
    } else if (term == 90) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBocc[3]));
    } else if (term >= 151 && term <= 240) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBocc[4]));
    } else if (term >= 241 && term <= 330) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBocc[5]));
    } else if (term >= 331 && term <= 539) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBocc[6]));
    } else if (term >= 540 && term <= 719) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBocc[7]));
    } else if (term >= 720 && term <= 1079) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBocc[8]));
    } else if (term >= 1080) {
        alert("Su rentabilidad sería de: " + calculoCDT(mount, term,  ratesBocc[9]));
    } else {
        alert("No existe ofeta para el plazo dado, por favor repita el flujo, recuerde que el plazo en días es entre 90 y 720 días para el Banco Popular.");
    }
}

function bankSelect () {
    const bankSelectInput = prompt(`Seleccione un banco (ingrese el índice): \n 1. Banco Popular \n 2. Banco Av Villas \n 3. Banco de Bogotá \n 4. Banco de Occidente`);

    if(bankSelectInput == '1'){
        selectRatesBpop();
    } else if (bankSelectInput == '2'){
        selectRatesBavv();
    } else if (bankSelectInput == '3'){
        selectRatesBgta();
    } else if (bankSelectInput == '4'){
        selectRatesBocc();
    } else {
        alert("Ha ingresado un inidice no existente, repita el flujo.")
    }
}

function printUserData() {
    alert("Confirme sus datos por favor: ");
    for(let i = 0; i < userData.length; i++){
        alert(userData[i]);
    } 
}  

bankSelect();
printUserData();
