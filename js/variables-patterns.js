// ARREGLO PARA ALMACENAR TODA LA INFORMACIÓN PROPORCIONADA EN EL FORMULARIO
export const userData = {
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
export const ONLY_APAHABETS_NO_SPECIAL_CHARACTERS = /^[a-zA-Z\u00F1\u00D1\s]+(\s[a-zA-Z\u00F1\u00D1]+)*$/;
export const EMAIL = /^[a-zA-Z0-9\-_@.]+$/;
export const ONLY_NUMBERS = /^([0-9]\d*)?$/;

// VARIABLE PARA GUARDAR LA DATA DE LA API LLAMADA
export let apiData;