import { userData } from './variables-patterns.js';

export class ShowElements {

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

    //MOSTRAR ALERT DE LA LIBRERIA SWEETALERT SI SE ENVÍA LA DATA
    static showAlertSubmit() {
        Swal.fire({
            title: 'ENVIADO',
            text: 'Tu simulación ha sido enviada! :)',
            icon: 'success',
            confirmButtonColor: '#3085d6'
        })
    }

    //MOSTRAR ALERT DE LA LIBRERIA SWEETALERT SI EL PLAZO INGRESADO NO EXISTE
    static showErrorCalculate() {
        Swal.fire({
            title: 'ERROR',
            text: 'No existe tasa de interés para el plazo ingresado de acuerdo al banco seleccionado.',
            icon: 'error',
            confirmButtonColor: '#3085d6'
        })
    }

    //MOSTRAR ALERT DE LA LIBRERIA SWEETALERT CON TIEMPO DE CARGA PARA EL CALCULO
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