// INFORMACIÓN DE TODAS LAS TASAS DE INTERES DEPENDIENDO DEL BANCO Y DEL PLAZO DADO POR EL USUARIO EN DIAS

const bankInterestData = {
    "bpop": [
        { range: { min: 90, max: 119 }, rate: 0.1035 },
        { range: { min: 120, max: 149 }, rate: 0.1155 },
        { range: { min: 150, max: 179 }, rate: 0.118 },
        { range: { min: 180, max: 359 }, rate: 0.1225 },
        { range: { min: 360, max: 539 }, rate: 0.1250 },
        { range: { min: 540, max: 719 }, rate: 0.1220 },
        { range: { min: 720, max: 720 }, rate: 0.12 },
    ],
    "bavv": [
        { range: { min: 90, max: 119 }, rate: 0.1235 },
        { range: { min: 120, max: 179 }, rate: 0.1265 },
        { range: { min: 180, max: 359 }, rate: 0.1285 },
        { range: { min: 360, max: 539 }, rate: 0.1360 },
        { range: { min: 540, max: 719 }, rate: 0.1365 },
        { range: { min: 720, max: 720 }, rate: 0.1370 },
    ],
    "bbgt": [
        { range: { min: 90, max: 119 }, rate: 0.1317 },
        { range: { min: 120, max: 179 }, rate: 0.1365 },
        { range: { min: 180, max: 359 }, rate: 0.1381 },
        { range: { min: 360, max: 419 }, rate: 0.1433 },
        { range: { min: 420, max: 509 }, rate: 0.1436 },
        { range: { min: 510, max: 539 }, rate: 0.1465 },
        { range: { min: 540, max: 719 }, rate: 0.1478 },
        { range: { min: 720, max: 900 }, rate: 0.1482 },
        { range: { min: 900, max: Infinity }, rate: 0.1512 },
    ],
    "bocc": [
        { range: { min: 30, max: 50 }, rate: 0.05 },
        { range: { min: 51, max: 80 }, rate: 0.055 },
        { range: { min: 81, max: 150 }, rate: 0.13 },
        { range: { min: 151, max: 240 }, rate: 0.14 },
        { range: { min: 241, max: 330 }, rate: 0.141 },
        { range: { min: 331, max: 539 }, rate: 0.138 },
        { range: { min: 540, max: 719 }, rate: 0.138 },
        { range: { min: 720, max: 1079 }, rate: 0.135 },
        { range: { min: 1080, max: Infinity }, rate: 0.132 },
    ]
}

// ARREGLO PARA ALMACENAR TODA LA INFORMACIÓN PROPORCIONADA EN EL FORMULARIO

const userData = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    bank: '',
    amount: '',
    term: '',
    interest: '',
    revenue: '',
    compoundInterest: '',
    numberYears: '',
    revenueIC: '',
};

//FUNCION PARA CALCULAR EL INTERES DE ACUERDO AL BANCO SELECCIONADO Y EL PLAZO EN DÍAS

function calculateInterest(bank, term) {
    let interest = 0;

    if (bank in bankInterestData) {
        const interestRate = bankInterestData[bank].find(element => term >= element.range.min && term <= element.range.max);
        if (interestRate) {
            interest = interestRate.rate;
        }
    }

    return interest;
}

//FUNCION PARA CALCULAR EL CDT CON FORMULA

function calculateCDT(amount, term, rates) {
    const retencionFuente = 0.04;

    let calculate = amount * (Math.pow(1 + rates, (term / 360)) - 1);
    let total = calculate - calculate * retencionFuente;

    return total;
}

//FUNCION PARA CALCULAR INTERES COMPUESTO CON FORMULA

function calculateIC(startCapital, termYears, rates) {

    return (startCapital* (Math.pow(1 + rates, termYears))); 
}

//ALMACENA LA INFORMACIÓN DEL USUARIO EN UN OBJETO AL DAR EN ENVIAR

const form = document.querySelector("form");
form.addEventListener('submit', (event) => {

    event.preventDefault();

    userData.name = document.getElementById("names").value;
    userData.lastName = document.getElementById("lastName").value;
    userData.email = document.getElementById("email").value;
    userData.phone = document.getElementById("numberPhone").value;
    userData.bank = document.getElementById("bank").value;
    userData.amount = document.getElementById("amount").value;
    userData.term = document.getElementById("term").value;

    console.log("Información del usuario: " + "\n" + JSON.stringify(userData))

})

// CALCULAR EL CDT SEGÚN LO INGRESADO EN EL FORMULARIO

document.querySelector("#calculate").addEventListener('click', (event) => {

    event.preventDefault();
    userData.bank = document.getElementById("bank").value;
    userData.amount = document.getElementById("amount").value;
    userData.term = document.getElementById("term").value;

    userData.interest = calculateInterest(userData.bank.toLowerCase(), userData.term);
    console.log("El interes aplicado es: " + userData.interest * 100 + "%");

    userData.revenue = calculateCDT(userData.amount, userData.term, userData.interest);
    console.log("Tu ganancia sería de: " + userData.revenue + " pesos");

    userData.numberYears = document.getElementById("numberYearsIC").value;
    userData.revenueIC = calculateIC(userData.amount, userData.numberYears, userData.interest);
    console.log("Las ganancias con interes compuesto a " + userData.numberYears + " años, es de: " + userData.revenueIC);
})

// PARA SABER SI EL CLIENTE DESEA CALCULAR INTERES COMPUESTO O NO

document.querySelector("#radioButtonYes").addEventListener('click', () => {

    userData.compoundInterest = document.getElementById("radioButtonYes").value
    console.log(userData.compoundInterest);
    console.log("Por favor ingrese en el formulario el numero de años:");

})

document.querySelector("#radioButtonNo").addEventListener('click', () => {

    userData.compoundInterest = document.getElementById("radioButtonNo").value
    console.log(userData.compoundInterest);
    console.log("Por favor oprima el boton de calcular y si esta de acuerdo con el resultado envíe sus resultados:");

})

