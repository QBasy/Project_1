const {Client} = require('pg');

const postgresSQLLoginPassword = 'jdbc:postgresql://localhost:5432/postgres';
const client = new Client({
    postgresSQLLoginPassword: process.env.DATABASE_URL || postgresSQLLoginPassword,
});

async function connect() {
    try {
        await client.connect();
        console.log('ЕСТЬ КОНТАК!!!');
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
    } finally {
        await client.end();
        console.log('Connection closed!');
    }
}

async function createTable() {
    const query = '' +
        '   CREATE TABLE IF NOT EXISTS дома (\n' +
        '      здание varchar(200) NOT NULL,\n' +
        '      подъезд int NOT NULL,\n' +
        '      этаж int NOT NULL,\n' +
        '      квартира int NOT NULL,\n' +
        '      квадратура float NOT NULL,\n' +
        '      комнаты int NOT NULL,\n' +
        '      стоимость int NOT NULL\n' +
        '   );';
    await client.query(query);
    console.log('');
}

async function insertData(здание, подъезд, этаж, квартира, квадратура, комнаты, стоимость) {
    const query = '' +
        'INSERT INTO квартиры (здание, подъезд, этаж, квартира, квадратура, комнаты, стоимость)\n' +
        'VALUES\n' +
        '(\'Байтас\', 1, 2, 101, 75.5, 3, 120000),\n' +
        '(\'Коктас\', 2, 3, 205, 95.0, 4, 150000),\n' +
        '(\'КойдынБасы\', 3, 1, 301, 60.2, 2, 90000);';
    await client.query(query);
    console.log('ЕСТЬ КОНТАКТ');
}

async function selectDataBy(подъезд, этаж) {
    const query = 'SELECT * FROM users';
    const result = await client.query(query);
    console.log('Selected data:', result.rows);
}

