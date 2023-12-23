const {Client} = require('pg');

class Database {
    constructor() {
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
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

    async insertData(house, entrance, floor, apartment, quadrature, rooms, cost) {
        const query = '' +
            'INSERT INTO Квартира (здание, подъезд, этаж, квартира, квадратура, комнаты, стоимость)\n' +
            'VALUES\n' +
            `('${house}', ${entrance}, ${floor}, ${apartment}, ${quadrature}, ${rooms}, ${cost}),`;
        await this.client.query(query);
        console.log('Квартира загружена');
    }

    async getDataByFloor(floor) {
        const query = 'select квартира\n' +
            'from \"Квартиры\"\n' +
            `where этаж = ${floor}` +
            'group by квартира;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByApartment(apartment) {
        const query = 'select квартира\n' +
            'from \"Квартиры\"\n' +
            `where квартира = ${apartment}\n` +
            'group by квартира;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByQuadratureMore(quadrature) {
        const query = 'select квартира\n' +
            'from \"Квартиры\"\n' +
            `where квадратура > ${quadrature}` +
            'group by квартира;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByQuadratureLess(quadrature) {
        const query = 'select квартира\n' +
            'from \"Квартиры\"\n' +
            `where квартира < ${quadrature}` +
            'group by квартира;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByEntrance(entrance) {
        const query = 'select квартира\n' +
            'from \"Квартиры\"\n' +
            `where подъезд = ${entrance}` +
            'group by квартира;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByRooms(rooms) {
        const query = 'select квартира\n' +
            'from \"Квартиры\"\n' +
            `where комнаты = ${rooms}` +
            'group by квартира;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByCostMore(cost) {
        const query = 'select квартира\n' +
            'from \"Квартиры\"\n' +
            `where стоимость > ${cost}` +
            'group by квартира;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async getDataByCostLess(cost) {
        const query = 'select квартира\n' +
            'from \"Квартиры\"\n' +
            `where стоимость < ${cost}` +
            'group by квартира;';
        const result = await this.client.query(query);
        console.log('Выбранные Данные:', result.rows);
    }
    async disconnect() {
        await this.client.end();
        console.log('База данных отсоединена');
    }
}

module.exports = Database;