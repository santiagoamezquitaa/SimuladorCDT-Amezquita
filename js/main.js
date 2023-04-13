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
    dateTime: '',
};

// PATTERNS REGEX
const ONLY_APAHABETS_NO_SPECIAL_CHARACTERS = /^[a-zA-Z\u00F1\u00D1\s]+(\s[a-zA-Z\u00F1\u00D1]+)*$/;
const EMAIL = /^[a-zA-Z0-9\-_@.]+$/;
const ONLY_NUMBERS = /^([0-9]\d*)?$/;

class Calculations {

    //FUNCION PARA CARGAR LOS DATOS DE LA API Y CALCULAR EL INTERES DE ACUERDO AL BANCO SELECCIONADO Y EL PLAZO EN DÍAS
    static calculateInterest(bank, term) {

        return new Promise((resolve, reject) => {
            fetch('https://my-json-server.typicode.com/santiagoamezquitaa/SimuladorCDT-JSON/db')
                .then(resp => resp.json())
                .then(data => {
                    const interestRatesByBank = data;
                    const dato = (interestRatesByBank[bank].find(element => term >= element.range.min && term <= element.range.max))?.rate;

                    // console.log(interestRatesByBank[bank])

                    let min = Number.MAX_VALUE;
                    let max = Number.MIN_VALUE;

                    // Recorrer cada objeto en el array "bocc"
                    // console.log(interestRatesByBank.bank)
                    for (const obj of interestRatesByBank[bank]) {
                    const rangeMin = obj.range.min;
                    const rangeMax = obj.range.max;
                    
                    // Comparar y actualizar los valores mínimo y máximo
                    if (rangeMin < min) {
                        min = rangeMin;
                    }
                    if (rangeMax > max) {
                        max = rangeMax;
                    }
                    }

                    console.log("Valor mínimo de 'min':", min);
                    console.log("Valor máximo de 'max':", max);
                    if (dato) {
                        clearTimeout
                        resolve(dato);
                    } else {
                        reject(`No existe tasa de interes disponible para el banco seleccionado`);
                    }
                })
        });
    }

    //FUNCION PARA CALCULAR EL CDT CON FORMULA
    static calculateCDT(amount, term, rates) {
        const retention = 0.04;

        let calculateProfit = amount * (Math.pow(1 + rates, (term / 360)) - 1);
        let retentionValue = calculateProfit * retention;
        let total = calculateProfit - retentionValue;

        return [total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }), retentionValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true })];
    }

    //FUNCION PARA CALCULAR INTERES COMPUESTO CON FORMULA
    static calculateIC(startCapital, termYears, rates) {
        return ((startCapital * (Math.pow(1 + rates, termYears)))).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
    }
}

class CaptureInputs {

    //CAPTURAR EVENTO INPUT RADIO SI SE DESEA O NO CALCULAR INTERES COMPUESTO
    static captureRadioInput() {

        document.getElementById('radioButtonYes').addEventListener('click', () => {
            document.getElementById('radioButtonYes').setAttribute('value', "yes");
            document.getElementById('radioButtonNo').setAttribute('value', "");
            document.getElementById('numberYearsIC').setAttribute('required', true);
            document.getElementById('numberYearsIC').removeAttribute('disabled');
            document.getElementById('submitData').disabled = true;
        })

        document.getElementById('radioButtonNo').addEventListener('click', () => {
            document.getElementById('radioButtonNo').setAttribute('value', "no");
            document.getElementById('radioButtonYes').setAttribute('value', "");
            document.getElementById('numberYearsIC').removeAttribute('required');
            document.getElementById('numberYearsIC').setAttribute('disabled', true);
        })
    }

    //ALMACENAR LA INFORMACIÓN DEL USUARIO EN UN OBJETO AL DAR EN ENVIAR
    static captureSubmitInput() {

        document.querySelector("form").addEventListener('submit', (event) => {

            event.preventDefault();

            userData.name = document.getElementById("names").value;
            userData.lastName = document.getElementById("lastName").value;
            userData.email = document.getElementById("email").value;
            userData.phone = document.getElementById("numberPhone").value;
            userData.bank = document.getElementById("selectBank").value;
            userData.amount = document.getElementById("amount").value;
            userData.term = document.getElementById("term").value;
            userData.dateTime = luxon.DateTime.now().toString();

            localStorage.setItem('user_Data', JSON.stringify(userData));

            ShowElements.showAlertSubmit();
        })
    }

    // CALCULAR EL CDT SEGÚN LO INGRESADO EN EL FORMULARIO
    static captureCalculateInput() {

        document.querySelector("#calculate").addEventListener('click', (event) => {

            event.preventDefault();
            document.getElementById("resultCDT").style.display = 'none';
            document.getElementById("resultIC").style.display = 'none';

            userData.bank = document.getElementById("selectBank").value;
            userData.amount = document.getElementById("amount").value;
            userData.term = document.getElementById("term").value;

            Calculations.calculateInterest(userData.bank.toLowerCase(), userData.term)
                .then(result => {
                    userData.interest = result;
                    userData.revenue = Calculations.calculateCDT(userData.amount, userData.term, userData.interest)[0];
                    userData.retention = Calculations.calculateCDT(userData.amount, userData.term, userData.interest)[1];

                    ShowElements.fillResultCDT(userData.revenue, userData.interest, userData.retention);

                    setTimeout(() => {
                        document.getElementById("resultCDT").style.display = 'block';
                    }, 3000)

                    document.getElementById("submitData").removeAttribute('disabled');

                    if (document.getElementById('radioButtonYes').value === 'yes') {
                        userData.numberYears = document.getElementById("numberYearsIC").value;
                        userData.revenueIC = Calculations.calculateIC(userData.amount, userData.numberYears, userData.interest);

                        ShowElements.fillResultIC(userData.revenueIC, userData.interest, userData.numberYears);

                        setTimeout(() => {
                            document.getElementById("resultIC").style.display = 'block';
                        }, 3000)

                    } else if (document.getElementById('radioButtonNo').value === 'no') {
                        userData.numberYears = '';
                        userData.revenueIC = '';
                    }
                })
                .catch(error => {
                    console.error(error);
                });

            ShowElements.showCalculateTime();
        })
    }
}

class ShowElements {

    //RELLENAR RESULTADOS DEL CDT Y DEL INTERES COMPUESTO
    static fillResultCDT(revenue, interest, retention) {
        document.getElementById('revenue').innerText = `$${revenue}`;
        document.getElementById('interest').innerText = `Tasa efectiva: ${(interest * 100).toFixed(2)}%`;
        document.getElementById('retention').innerText = `Retención de la fuente: $${retention}`;
    }

    static fillResultIC(revenueIC, interestIC, numberYears) {
        document.getElementById('years').innerText = `Tu ganancia con interés compuesto pero a ${numberYears} años sería: `;
        document.getElementById('revenueIC').innerText = `$${revenueIC}`;
        document.getElementById('interestIC').innerText = `Tasa anual: ${(interestIC * 100).toFixed(2)}%`;
    }

    // PARA MOSTRAR EL INPUT DE INTERES COMPUESTO
    static showIC() {
        const intCompound = document.getElementById("intCompound");
        const optionYes = document.querySelector("#radioButtonYes");
        const optionNo = document.querySelector("#radioButtonNo");

        optionYes.addEventListener('change', () => {
            if (optionYes.checked) {
                userData.compoundInterest = document.getElementById("radioButtonYes").value;
                intCompound.style.display = 'block';
            } else {
                intCompound.style.display = 'none';
            }
        })
        optionNo.addEventListener('change', () => {
            if (optionNo.checked) {
                userData.compoundInterest = document.getElementById("radioButtonNo").value;
                intCompound.style.display = 'none';
            } else {
                intCompound.style.display = 'block';
            }
        })
    }

    static showAlertSubmit() {
        Swal.fire({
            title: 'ENVIADO',
            text: 'Tu simulación ha sido enviada! :)',
            icon: 'success',
            confirmButtonColor: '#3085d6'
        })
    }

    static showCalculateTime() {
        let timerInterval
        Swal.fire({
            title: 'CALCULANDO',
            html: 'Estamos procesando tu solicitud.',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        })
    }
}

class Validations {

    //PARA DESACTIVAR LOS OTROS INPUT SI LOS ANTERIORES NO HAN SIDO RELLENADOS
    static validateInputFilledIn() {
        const campos = document.querySelectorAll('.campos');

        for (let i = 1; i < campos.length; i++) {
            if (campos[i].value === '' || campos[i].value === 'ENVÍAR RESULTADOS') {
                campos[i].setAttribute('disabled', true);
            }
            if (campos[3].value !== '') {
                campos[4].removeAttribute('disabled');
            }

            campos[i - 1].addEventListener('input', () => {
                if (campos[i - 1].value !== '' && i < 9) {
                    campos[i].removeAttribute('disabled');
                }
                if (campos[6].value !== '') {
                    campos[7].removeAttribute('disabled');
                    campos[8].removeAttribute('disabled');
                }
            });

        }
    }

    //PARA ESCUCHAR LOS EVENTOS DE LOS INPUTS QUE SE REQUIEREN PARA EL INPUT
    static eventValidateCalculate() {
        document.getElementById('amount').addEventListener('input', this.validateInputForCalculate);
        document.getElementById('term').addEventListener('input', this.validateInputForCalculate);
        document.getElementById('radioButtonYes').addEventListener('click', this.validateInputForCalculate);
        document.getElementById('radioButtonNo').addEventListener('click', this.validateInputForCalculate);
    }

    //PARA VALIDAR QUE LOS INPUT NECESARIOS PARA CALCULAR SI ESTEN RELLENOS
    static validateInputForCalculate() {
        let inputAmount = document.getElementById('amount');
        let inputTerm = document.getElementById('term');
        let inputRadioYes = document.getElementById('radioButtonYes');
        let inputRadioNo = document.getElementById('radioButtonNo');
        let buttonCalculate = document.getElementById('calculate');
        let inputNumberYears = document.getElementById('numberYearsIC');

        if (inputAmount.value.trim() !== '' && inputTerm.value.trim() !== '') {

            (inputRadioNo.value !== '') ? buttonCalculate.disabled = false : buttonCalculate.disabled = true;

            if (inputRadioYes.value !== '') {
                buttonCalculate.disabled = true;
                inputNumberYears.addEventListener('input', () => {
                    (inputNumberYears.value.trim() !== '') ? buttonCalculate.disabled = false : buttonCalculate.disabled = true;
                })
            }
        } else {
            buttonCalculate.disabled = true;
        }

    }

    //RECUPERAR DATOS DEL STORAGE Y USANDOLO EN TENER RELLENADOS LOS CAMPOS DE INFO USUARIO
    static validateLocalStorageData() {
        if (localStorage.getItem('user_Data')) {

            let basicDataUser = JSON.parse(localStorage.getItem('user_Data'));

            document.getElementById("names").value = basicDataUser.name;
            document.getElementById("lastName").value = basicDataUser.lastName;
            document.getElementById("email").value = basicDataUser.email;
            document.getElementById("numberPhone").value = basicDataUser.phone;
        } else {
            console.log('No hay data en el LocalStorage');
        }
    }

    //NO PERMITIR INGRESO DE CARACTERES SEGÚN EL TIPO DE INPUT
    static blockCharactersInput(inputType, pattern) {
        inputType.addEventListener('keypress', (evt) => {
            if (!pattern.test(evt.key)) {
                evt.preventDefault();
            }
        });
    }

}

Validations.validateLocalStorageData();
Validations.blockCharactersInput(document.getElementById('names'), ONLY_APAHABETS_NO_SPECIAL_CHARACTERS);
Validations.blockCharactersInput(document.getElementById('lastName'), ONLY_APAHABETS_NO_SPECIAL_CHARACTERS);
Validations.blockCharactersInput(document.getElementById('email'), EMAIL);
Validations.blockCharactersInput(document.getElementById('numberPhone'), ONLY_NUMBERS);
Validations.blockCharactersInput(document.getElementById('amount'), ONLY_NUMBERS);
Validations.blockCharactersInput(document.getElementById('term'), ONLY_NUMBERS);
Validations.blockCharactersInput(document.getElementById('numberYearsIC'), ONLY_NUMBERS);
Validations.validateInputFilledIn();
CaptureInputs.captureRadioInput();
ShowElements.showIC();
Validations.eventValidateCalculate();
CaptureInputs.captureCalculateInput();
CaptureInputs.captureSubmitInput();





