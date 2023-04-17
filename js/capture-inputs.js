import { userData } from './variables-patterns.js';
import { ShowElements } from './show-elements.js';
import { Calculations } from './calculations.js';

export class CaptureInputs {

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

            if (Calculations.calculateInterest(userData.bank.toLowerCase(), userData.term) !== undefined) {
                userData.interest = Calculations.calculateInterest(userData.bank.toLowerCase(), userData.term);

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

                ShowElements.showCalculateTime();
            } else {
                ShowElements.showErrorCalculate();
            }

        })
    }
}