const { Client } = require('pg');

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
    async connect(options) {
        try {
            if (!this.client || !this.client._connected) {
                this.client = new Client({
                    user: 'postgres',
                    host: 'localhost',
                    database: 'project_1',
                    password: 'japierdole',
                    port: 5432,
                });

                await this.client.connect();
                console.log('ЕСТЬ КОНТАК!!!');
            }
        } catch (err) {
            console.error('Error connecting to PostgresSQL:', err);
        }
    }




    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS квартира (
            номер int,
            здание varchar(30),
            подъезд int,
            этаж int,
            квадратура int,
            комнаты int,
            стоимость int,
            статус varchar(30),
            image varchar(30)
        );
        `;
        try {
            await this.client.query(query);
            console.log('Table created or already exists');
        } catch (err) {
            console.error('Error creating table:', err);
        }
    }

    async insertData(apartment, house, entrance, floor, quadrature, rooms, cost, image) {
        try {
            const query = `
            INSERT INTO квартира (номер, здание, подъезд, этаж, квадратура, комнаты, стоимость, статус, image)
            VALUES
            ('${apartment}', '${house}', ${entrance}, ${floor}, ${quadrature}, ${rooms}, ${cost}, \'Активно\', '${image}');
        `;
            await this.client.query(query);
            console.log('Квартира загружена');
        } catch (err) {
            console.log('Ошибка ', err);
        }
    }
    async filter(data) {
        try {
            const {
                house,
                roomsLess,
                roomsMore,
                floorLess,
                floorMore,
                areaLess,
                areaMore,
                costLess,
                costMore,
                apartmentEqual,
                status,
            } = filters;

            let queryParams = [];
            let conditions = [];

            if (!(house === '')) {
                queryParams.push(house);
                conditions.push(`здание = ${queryParams[0]}`);
                queryParams.pop();
            } else {

            }
            if (!(roomsLess === '')) {
                queryParams.push(roomsLess);
                conditions.push(`комнаты <= ${queryParams[0]}`);
                queryParams.pop();
            }
            if (!(roomsMore === '')) {
                queryParams.push(roomsMore);
                conditions.push(`комнаты >= ${queryParams[0]}`);
                queryParams.pop();
            }
            if (!(floorLess === '')) {
                queryParams.push(floorLess);
                conditions.push(`этаж <= ${queryParams[0]}`);
                queryParams.pop();
            }
            if (!(floorMore === '')) {
                queryParams.push(floorMore);
                conditions.push(`этаж >= ${queryParams[0]}`);
                queryParams.pop();
            }
            if (!(areaLess === '')) {
                queryParams.push(areaLess);
                conditions.push(`квадратура <= ${queryParams[0]}`);
                queryParams.pop();
            }
            if (!(areaMore === '')) {
                queryParams.push(areaMore);
                conditions.push(`квадратура >= ${queryParams[0]}`);
                queryParams.pop();
            }
            if (!(costLess === '')) {
                queryParams.push(costLess);
                conditions.push(`стоимость <= ${queryParams[0]}`);
                queryParams.pop();
            }
            if (!(costMore === '')) {
                queryParams.push(costMore);
                conditions.push(`стоимость >= ${queryParams[0]}`);
                queryParams.pop();
            }
            if (!(apartmentEqual === '')) {
                queryParams.push(apartmentEqual);
                conditions.push(`номер = ${queryParams[0]}`);
                queryParams.pop();
            }
            if (!(status === '')) {
                queryParams.push(status);
                conditions.push(`статус = ${queryParams[0]}`);
                queryParams.pop();
            }

            const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
            const query = `SELECT * FROM квартира ${whereClause};`;
            const result = await this.client.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error filtering data:', error);
            throw error;
        }
    }

    async getAll() {
        const query = 'select *\n' +
            'from квартира\n';

        const result = await this.client.query(query);
        return result.rows;
    }

    async getByStatus(status) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where статус = ${status}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }
    async getDataByFloorLess(floor) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where этаж <= ${floor}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }
    async getDataByStatus(status){
        const query = 'select номер from квартира\n' +
            `where статус = ${status}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }
    async getDataByFloorMore(floor) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where этаж >= ${floor}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }
    async getDataByApartment(apartment) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where номер = ${apartment}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }
    async getDataByQuadratureMore(quadrature) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where квадратура >= ${quadrature}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }

    async getDataByQuadratureLess(quadrature) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where квадратура <= ${quadrature}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }

    async getDataByEntrance(entrance) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where подъезд = ${entrance}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }

    async getDataByRoomsMore(rooms) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where комнаты >= ${rooms}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }
    async getDataByRoomsLess(rooms) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where комнаты <= ${rooms}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }

    async getDataByCostMore(cost) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where стоимость >= ${cost}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }

    async getDataByCostLess(cost) {
        const query = 'select номер\n' +
            'from квартира\n' +
            `where стоимость <= ${cost}\n` +
            'group by номер;';
        const result = await this.client.query(query);
        return result.rows;
    }

    async getByCostMoreLess(more, less) {
        const query = 'select номер from квартира\n' +
            `where стоимость >= ${more} and стоимость < ${less}\n` +
            'group by номер; '
        const result = await this.client.query(query);
        return result.rows;
    }
    async disconnect() {
        if (this.client) {
            await this.client.end();
        }
    }
}

module.exports = Database;