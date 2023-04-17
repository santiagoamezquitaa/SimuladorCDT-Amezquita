export let apiData;

export class DataApi {
    // METODO PARA HACER EL LLAMADO DE LA API MEDIANTE FETCH Y AWAIT
    static async getAPI() {
        try {
            const response = await fetch('https://my-json-server.typicode.com/santiagoamezquitaa/SimuladorCDT-JSON/db');
            const data = await response.json();
            apiData = data;
        } catch (error) {
            console.error('Error al llamar a la API:', error);
        }
    }
}