const express = require('express');
const Database = require("./database");

const app = express();
const port = 1337;
const db = new Database();


app.use(express.json());

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/frontend/index.html');
});

app.get('/index',(req,res) => {
    res.sendFile(__dirname+'/frontend/index.html')
})

app.get('/database/:apartmentName', async (req,res) => {
    const { apartmentName } = req.params;

    try {
        await db.connect();
        const apartmentInfo = await db.getDataByApartment(apartmentName);

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

db.connect().then(async r => {
    await db.getDataByApartment('1')
    await db.disconnect();
});
