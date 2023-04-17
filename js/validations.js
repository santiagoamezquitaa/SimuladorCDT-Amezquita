import { Calculations } from './calculations.js'

export class Validations {

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
            console.warn('No hay data en el LocalStorage');
        }
    }

    //METODO PARA VALIDAR EL BANCO SELECCIONADO Y CAMBIAR EL LIMITE DE DIAS
    static validateLimitBank() {
        document.getElementById("selectBank").addEventListener("change", () => {
            if (document.getElementById("selectBank").value !== "") {
                Calculations.calculateLimit((document.getElementById("selectBank").value).toLowerCase());
            }
        })
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