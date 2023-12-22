const express = require('express');
const Database = require("./database");

const app = express();
const port = 1337;
const db = new Database();

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Hello');
});

app.get('database/:apartmentName', async (req,res) => {
    const { apartmentName } = req.params;

    try {
        await db.connect();
        const apartmentInfo = await db.getDataBy(apartmentName);

        if (apartmentInfo) {
            res.json(apartmentInfo);
        } else {
            res.status(404).json({ message: 'Квартира не найдена'});
        }
    } catch (err) {
        res.status(500).json({ message: 'Ошибка подключения к серверу'});
    } finally {
        await db.disconnect();
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

db.createTable();
