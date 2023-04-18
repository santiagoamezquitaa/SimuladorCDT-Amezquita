import { apiData } from './call-api.js';
import { ShowElements } from './show-elements.js';

export class Calculations {

    //METODO PARA CALCULAR EL INTERES DE ACUERDO AL BANCO SELECCIONADO Y EL PLAZO EN DÍAS
    static calculateInterest(bank, term) {
        const dato = (apiData[bank].find(element => term >= element.range.min && term <= element.range.max))?.rate;
        if (dato) {
            return dato;
        } else {
            console.error("Limite no encontrado");
            return undefined;
        }
    }

    //METODO PARA CALCULAR EL LIMITE DE DIAS MINIMO Y MAXIMO SEGÚN EL BANCO ESCOGIDO
    static calculateLimit(bank) {
        let min = Number.MAX_VALUE;
        let max = Number.MIN_VALUE;

        for (const obj of apiData[bank]) {
            const rangeMin = obj.range.min;
            const rangeMax = obj.range.max;

            if (rangeMin < min) {
                min = rangeMin;
            }
            if (rangeMax > max) {
                max = rangeMax;
            }
        }
        ShowElements.showRateMaxMin(min, max);
    }

    //METODO PARA CALCULAR EL CDT CON FORMULA
    static calculateCDT(amount, term, rates) {
        const retention = 0.04;

        let calculateProfit = amount * (Math.pow(1 + rates, (term / 360)) - 1);
        let retentionValue = calculateProfit * retention;
        let total = calculateProfit - retentionValue;

        return [total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }), retentionValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true })];
    }

    //METODO PARA CALCULAR INTERES COMPUESTO CON FORMULA
    static calculateIC(startCapital, termYears, rates) {
        return ((startCapital * (Math.pow(1 + rates, termYears)))).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
    }
}