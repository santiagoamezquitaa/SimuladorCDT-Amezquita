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
    retention: '',
    compoundInterest: '',
    numberYears: '',
    revenueIC: '',
};

const names = document.getElementById("names");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const numberPhone = document.getElementById("numberPhone");

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
    const retention = 0.04;

    let calculate = amount * (Math.pow(1 + rates, (term / 360)) - 1);
    let retentionValue = calculate * retention;
    let total = calculate - retentionValue ;

    return [total, retentionValue];
}

//FUNCION PARA CALCULAR INTERES COMPUESTO CON FORMULA

function calculateIC(startCapital, termYears, rates) {
    return (startCapital * (Math.pow(1 + rates, termYears)));
}

//RELLENAR RESULTADOS DEL CDT Y DEL INTERES COMPUESTO

function fillResultCDT(revenue, interest, retention) {
    document.getElementById('revenue').innerText = `$${revenue}`;
    document.getElementById('interest').innerText = `Tasa efectiva: ${interest * 100}%`;
    document.getElementById('retention').innerText = `Retención de la fuente: $${retention}`;
}

function fillResultIC(revenueIC, interestIC, numberYears) {
    document.getElementById('years').innerText = `Tu ganancia con interés compuesto pero a ${numberYears} años sería: `;
    document.getElementById('revenueIC').innerText = `$${revenueIC}`;
    document.getElementById('interestIC').innerText = `Tasa anual: ${interestIC * 100}%`;
}

//CAPTURAR EVENTO INPUT RADIO CUANDO SI SE DESEA CALCULA INTERES COMPUESTO

document.getElementById('radioButtonYes').addEventListener('click', () => {
    document.getElementById('radioButtonYes').setAttribute('value', "yes");
    document.getElementById('numberYearsIC').setAttribute('required', true);
    document.getElementById('numberYearsIC').removeAttribute('disabled');
})

//CAPTURAR EVENTO INPUT RADIO CUANDO NO SE DESEA CALCULA INTERES COMPUESTO

document.getElementById('radioButtonNo').addEventListener('click', () => {
    document.getElementById('radioButtonNo').setAttribute('value', "no");
    document.getElementById('numberYearsIC').setAttribute('value', 0);
})

//ALMACENAR LA INFORMACIÓN DEL USUARIO EN UN OBJETO AL DAR EN ENVIAR

const form = document.querySelector("form");
form.addEventListener('submit', (event) => {

    event.preventDefault();

    userData.name = names.value;
    userData.lastName = lastName.value;
    userData.email = email.value;
    userData.phone = numberPhone.value;
    userData.bank = document.getElementById("selectBank").value;
    userData.amount = document.getElementById("amount").value;
    userData.term = document.getElementById("term").value;

    localStorage.setItem('user_Data', JSON.stringify(userData));
})

// CALCULAR EL CDT SEGÚN LO INGRESADO EN EL FORMULARIO

document.querySelector("#calculate").addEventListener('click', (event) => {

    event.preventDefault();
    userData.bank = document.getElementById("selectBank").value;
    userData.amount = document.getElementById("amount").value;
    userData.term = document.getElementById("term").value;

    userData.interest = calculateInterest(userData.bank.toLowerCase(), userData.term);
    userData.revenue = calculateCDT(userData.amount, userData.term, userData.interest)[0];
    userData.retention = calculateCDT(userData.amount, userData.term, userData.interest)[1];

    fillResultCDT(userData.revenue, userData.interest, userData.retention);
    document.getElementById("resultCDT").style.display = 'block';

    if (document.getElementById('radioButtonYes').value === 'yes') {
        userData.numberYears = document.getElementById("numberYearsIC").value;
        userData.revenueIC = calculateIC(userData.amount, userData.numberYears, userData.interest);

        fillResultIC(userData.revenueIC, userData.interest, userData.numberYears);
        document.getElementById("resultIC").style.display = 'block';
    }

})

// PARA MOSTRAR EL CAMPO DE INTERES COMPUESTO Y SU RESULTADO

const intCompound = document.getElementById("intCompound");
const optionYes = document.querySelector("#radioButtonYes");
const optionNo = document.querySelector("#radioButtonNo");

optionYes.addEventListener('change', () => {
    if (optionYes.checked) {
        intCompound.style.display = 'block';
    } else {
        intCompound.style.display = 'none';
    }
})
optionNo.addEventListener('change', () => {
    if (optionNo.checked) {
        intCompound.style.display = 'none';
    } else {
        intCompound.style.display = 'block';
    }
})

//PARA DESACTIVAR LOS OTROS INPUT SI LOS ANTERIORES NO HAN SIDO RELLENADOS

const campos = document.querySelectorAll('.campos');

for (let i = 1; i < campos.length; i++) {
    campos[i].setAttribute('disabled', true);

    campos[i - 1].addEventListener('input', () => {
        if (campos[i - 1].value !== '' && i < 9) {
            campos[i].removeAttribute('disabled');
        }
        if (campos[6].value !== '') {
            campos[7].removeAttribute('disabled');
            campos[8].removeAttribute('disabled');
        }
        if (campos[8].value !== ''){
            campos[10].removeAttribute('disabled');
            campos[11].removeAttribute('disabled');
        }
        if (campos[9].value !== ''){
            campos[10].removeAttribute('disabled');
            campos[11].removeAttribute('disabled');
        }    

    });
}

//RECUPERAR DATOS DEL STORAGE Y USANDOLO EN TENER RELLENADOS LOS CAMPOS DE INFO USUARIO

let basicDataUser = JSON.parse(localStorage.getItem('user_Data'));

names.value = basicDataUser.name;
lastName.value = basicDataUser.lastName;
email.value = basicDataUser.email;
numberPhone.value = basicDataUser.phone;


