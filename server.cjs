const express = require('express');
const Database = require("./database.cjs");
const fileUpload = require('express-fileupload');

const app = express();
const port = 1337;
const db = new Database();

app.set('view engine', 'ejs');
app.set('views', './files');

app.use(express.static('files'));
app.use(fileUpload());

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.get('/index',(req,res) => {
    res.render('index.ejs');
})

app.get('/adder', (req, res) => {
    res.render('adder.ejs')
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

app.post('/images', (req,res) => {
    const { image } = req.files;

    if (!image) return res.sendStatus(400);

    if (/^image/.test(image.mimetype)) return res.status(400);

    image.mv('/images' + image.name);

    console.log(req.files);

    res.status(200);
});
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

db.connect().then(async r => {
    await db.getByCostMoreLess('170000.0', '1000000');
    await db.disconnect();
});
