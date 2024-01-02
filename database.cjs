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
            (${apartment}, '${house}', ${entrance}, ${floor}, ${quadrature}, ${rooms}, ${cost}, \'Активно\', '${image}');
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
            } = data;

            let queryParams = [];
            let conditions = [];

            if (house !== '') {
                queryParams.push(house);
                conditions.push(`здание = \'${queryParams[0]}\'`);
                queryParams.pop();
            } else {
            }
            if (roomsLess != '') {
                queryParams.push(roomsLess);
                conditions.push(`комнаты >= ${queryParams[0]}`);
                queryParams.pop();
            } else {
            }
            if (roomsMore != '') {
                queryParams.push(roomsMore);
                conditions.push(`комнаты <= ${queryParams[0]}`);
                queryParams.pop();
            } else {
            }
            if (floorLess != '') {
                queryParams.push(floorLess);
                conditions.push(`этаж >= ${queryParams[0]}`);
                queryParams.pop();
            } else {
            }
            if (floorMore != '') {
                queryParams.push(floorMore);
                conditions.push(`этаж <= ${queryParams[0]}`);
                queryParams.pop();
            } else {
            }
            if (areaLess != '') {
                queryParams.push(areaLess);
                conditions.push(`квадратура >= ${queryParams[0]}`);
                queryParams.pop();
            } else {
            }
            if (areaMore != '') {
                queryParams.push(areaMore);
                conditions.push(`квадратура <= ${queryParams[0]}`);
                queryParams.pop();
            } else {
            }
            if (costLess != '') {
                queryParams.push(costLess);
                conditions.push(`стоимость >= ${queryParams[0]}`);
                queryParams.pop();
            } else {
            }
            if (costMore != '') {
                queryParams.push(costMore);
                conditions.push(`стоимость <= ${queryParams[0]}`);
                queryParams.pop();
            } else {
            }
            if (apartmentEqual != '') {
                queryParams.push(apartmentEqual);
                conditions.push(`номер = ${apartmentEqual}`);
                queryParams.pop();
            } else {
            }
            if (status !== '') {
                queryParams.push(status);
                conditions.push(`статус = \'${queryParams[0]}\'`);
                queryParams.pop();
            } else {
            }

            if (house !== '' && roomsLess != '' && roomsMore != '' && floorLess != '' && floorMore != '' && areaLess != '' && areaMore != '' && costLess != '' && costMore != '' && apartmentEqual != '') {
                return this.getAll();
            }

            const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
            console.log(whereClause);
            const query = `SELECT * FROM квартира ${whereClause};`;
            console.log(query);
            const result = await this.client.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error filtering data:', error);
            throw error;
        }
    }

    async getAll() {
        const query = 'select * from квартира;';

        const result = await this.client.query(query);
        return result.rows;
    }

    async book(apartment) {
        const query = 'UPDATE квартира SET статус = $1 WHERE номер = $2';
        const values = ['Забронировано', apartment];
        try {
            const result = await this.client.query(query, values);
            console.log('Apartment booked successfully!', result);
        } catch (error) {
            console.error('Error booking apartment:', error);
            throw error;
        }
    }
    async unBook(apartment) {
        const query = 'UPDATE квартира SET статус = $1 WHERE номер = $2';
        const values = ['Активно', apartment];
        try {
            const result = await this.client.query(query, values);
            console.log('Apartment unbooked successfully!', result);
        } catch (error) {
            console.error('Error on unbooking apartment:', error);
            throw error;
        }
    }

    async sell(apartment) {
        const query = 'UPDATE квартира SET статус = $1 WHERE номер = $2';
        const values = ['Продано', apartment];
        try {
            const result = await this.client.query(query, values);
            console.log('Apartment unbooked successfully!', result);
        } catch (error) {
            console.error('Error on unbooking apartment:', error);
            throw error;
        }
    }

    async disconnect() {
        if (this.client) {
            await this.client.end();
        }
    }
}

module.exports = Database;