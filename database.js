const {Client} = require('pg');

class Database {
    constructor() {
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'project_1',
            password: 'japierdole',
            port: 5432,
        });
    }
    async connect() {
        try {
            await this.client.connect();
            console.log('ЕСТЬ КОНТАК!!!');
        } catch (err) {
            console.error('Error connecting to PostgresSQL:', err);
        }
    }

    async createTable() {
        const query = '' +
            '   CREATE TABLE IF NOT EXISTS Квартира (\n' +
            '      здание varchar(200) NOT NULL,\n' +
            '      подъезд int NOT NULL,\n' +
            '      этаж int NOT NULL,\n' +
            '      квартира int NOT NULL,\n' +
            '      квадратура float NOT NULL,\n' +
            '      комнаты int NOT NULL,\n' +
            '      стоимость int NOT NULL\n' +
            '   );';
        await this.client.query(query);
        console.log('');
    }

    async insertData(apartment, house, entrance, floor, quadrature, rooms, cost) {
        const query = '' +
            'INSERT INTO квартира (номер, здание, подъезд, этаж, квадратура, комнаты, стоимость)\n' +
            'VALUES' +
            `('${apartment}', ${house}, ${entrance}, ${floor}, ${quadrature}, ${rooms}, ${cost}),` +
            'INSERT INTO подъезд (подъезд, квартира, здание)\n' +
            'VALUES\n' +
            `  (${entrance}, ${apartment}, ${house}),\n` +
            `INSERT INTO здание (здание, подъезд, квартира)\n` +
            'VALUES\n' +
            `  (${house}, ${entrance}, ${apartment}),`;
        await this.client.query(query);
        console.log('Квартира загружена');
    }

    async insertManyData(count, apartment, house, entrance, floor, quadrature, rooms, cost){
        for (let i = 0; i < count; i++) {
            await this.insertData(apartment[i], house[i], entrance[i], floor[i], quadrature[i], rooms[i], cost[i])
        }
    }

    async getDataByFloorLess(floor) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where этаж <= ${floor}` +
            'group by номер;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByFloorMore(floor) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where этаж >= ${floor}` +
            'group by номер;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByApartment(apartment) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where номер = ${apartment}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByQuadratureMore(quadrature) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where квадратура > ${quadrature}` +
            'group by номер;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByQuadratureLess(quadrature) {
        const query = 'select номер\n' +
            'from квартира"\n' +
            `where квадратура < ${quadrature}` +
            'group by номер;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByEntrance(entrance) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where подъезд = ${entrance}` +
            'group by номер;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByRooms(rooms) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where комнаты = ${rooms}` +
            'group by номер;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByCostMore(cost) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where стоимость > ${cost}` +
            'group by номер;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByCostLess(cost) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where стоимость < ${cost}` +
            'group by номер;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async disconnect() {
        await this.client.end();
        console.log('База данных отсоединена');
    }
}

module.exports = Database;