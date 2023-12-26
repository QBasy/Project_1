const { Client } = require('pg');

const cl = new Client({
    host: 'localhost',
    port: 5432,
    database: 'project_1',
    user: 'postgres',
    password: 'japierdole',
});

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

    /**async createTable() {
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
    }**/

    async insertData(apartment, house, entrance, floor, quadrature, rooms, cost, status) {
        try {
            const query = '' +
                'INSERT INTO квартира (номер, здание, подъезд, этаж, квадратура, комнаты, стоимость, статус)\n' +
                'VALUES\n' +
                `(${apartment}, '${house}', ${entrance}, ${floor}, ${quadrature}, ${rooms}, ${cost}, ${status});`;
            await this.client.query(query);
            console.log('Квартира загружена');
        } catch (err) {
            console.log('Ошибка ', err);
        }
    }

    async insertManyData(count, apartment, house, entrance, floor, quadrature, rooms, cost, status){
        for (let i = 0; i < count; i++) {
            await this.insertData(apartment[i], house[i], entrance[i], floor[i], quadrature[i], rooms[i], cost[i], status[i])
        }
    }

    async getDataByFloorLess(floor) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where этаж <= ${floor}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }
    async getDataByStatus(status){
        const query = 'select номер from квартира\n' +
            `where статус = ${status}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }
    async getDataByFloorMore(floor) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where этаж >= ${floor}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }
    async getDataByApartment(apartment) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where номер = ${apartment}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }
    async getDataByQuadratureMore(quadrature) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where квадратура >= ${quadrature}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }

    async getDataByQuadratureLess(quadrature) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where квадратура <= ${quadrature}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }

    async getDataByEntrance(entrance) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where подъезд = ${entrance}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }

    async getDataByRoomsMore(rooms) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where комнаты >= ${rooms}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }
    async getDataByRoomsLess(rooms) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where комнаты <= ${rooms}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }

    async getDataByCostMore(cost) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where стоимость >= ${cost}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }

    async getDataByCostLess(cost) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where стоимость <= ${cost}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }

    async getByCostMoreLess(more, less) {
        const query = 'select номер from квартира\n' +
            `where стоимость >= ${more} and стоимость < ${less}\n` +
            'group by номер; '
        const result = await this.client.query(query);
        return result.rows.map(row => row['номер']);
    }
    async disconnect() {
        await this.client.end();
        console.log('База данных отсоединена');
    }
}

module.exports = Database;