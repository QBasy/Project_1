// server.cjs
const express = require('express');
const Database = require("./database.cjs");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {as} = require("pg-promise");
const savedCardsPath = __dirname + '/files/savedCards.json';

const app = express();
const port = 1337;
const db = new Database();

app.set('view engine', 'ejs');
app.set('views', './files');

app.use(express.static('files'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/index', (req, res) => {
    res.render('index.ejs');
});

app.get('/adder', (req, res) => {
    res.render('adder.ejs');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const uniqueFileName = `/img/${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage });

app.post('/images', (req, res) => {
    const { image } = req.files;

    if (!image) return res.sendStatus(400);

    const uniqueFileName = Date.now() + '_' + image.name;

    image.mv(path.join(__dirname, 'images', uniqueFileName), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        console.log('Image uploaded successfully');
        res.status(200).send('Image uploaded successfully');
    });
});

app.get('/addToDB', (req, res) => {
    res.sendFile('index.ejs');
});

app.post('/refresh', async (req, res) => {
    let client;
    console.log('1')
    try {
        client = await db.connect();

        const results = await db.getAll();

        const apartmentsObject = {};
        results.forEach(apartment => {
            apartmentsObject[apartment.номер] = apartment;
        });
        const existingApartments = JSON.parse(fs.readFileSync(savedCardsPath, 'utf8'));
        console.log('2')
        for (const key in existingApartments) {
            if (!apartmentsObject[key]) {
                delete existingApartments[key];
            }
        }

        fs.writeFileSync(savedCardsPath, JSON.stringify(existingApartments, null, 2), {
            encoding: 'utf8',
            flag: 'w'
        });
        console.log('File updated successfully.');
        res.status(200).json({ message: 'File updated successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) {
            await db.disconnect();
        }
    }
});

app.post('/filter', async (req, res) => {
    const filters = req.body;
    const client = await db.connect();

    try {
        await client;

        const results = await db.filter(filters);
        if (results && results.length > 0) {
            const apartmentsObject = {};
            results.forEach(apartment => {
                apartmentsObject[apartment.номер] = apartment;
            });
            fs.writeFileSync(savedCardsPath, JSON.stringify(apartmentsObject), { encoding: 'utf8', flag: 'w' });
        } else {
            console.log('No rows returned from the query.');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) {
            await db.disconnect();
        }
    }
});

app.post('/booking', async (req, res) => {
    const { bookingApartmentID } = req.body;
    const client = await db.connect();

    try {
        await client;
        await db.book(bookingApartmentID);

        const results = await db.getAll();

        const apartmentsObject = {};
        results.forEach(apartment => {
            apartmentsObject[apartment.номер] = apartment;
        });
        const existingApartments = JSON.parse(fs.readFileSync(savedCardsPath, 'utf8'));
        for (const key in existingApartments) {
            if (!apartmentsObject[key]) {
                delete existingApartments[key];
            }
        }
        fs.writeFileSync(savedCardsPath, JSON.stringify(existingApartments, null, 2), {
            encoding: 'utf8',
            flag: 'w'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) {
            await db.disconnect();
        }
    }
});

app.post('/sell', async (req,res) => {
    const { sellID } = req.body;
    const client = await db.connect();

    try {
        await client;
        await db.sell(sellID);

        const results = await db.getAll();

        const apartmentsObject = {};
        results.forEach(apartment => {
            apartmentsObject[apartment.номер] = apartment;
        });
        const existingApartments = JSON.parse(fs.readFileSync(savedCardsPath, 'utf8'));
        for (const key in existingApartments) {
            if (!apartmentsObject[key]) {
                delete existingApartments[key];
            }
        }
        fs.writeFileSync(savedCardsPath, JSON.stringify(existingApartments, null, 2), {
            encoding: 'utf8',
            flag: 'w'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) {
            await db.disconnect();
        }
    }
})
app.post('/unBook', async (req, res) => {
    const { unBookApartmentID } = req.body;
    const client = await db.connect();

    try {
        await client;
        await db.unBook(unBookApartmentID);

        const results = await db.getAll();

        const apartmentsObject = {};
        results.forEach(apartment => {
            apartmentsObject[apartment.номер] = apartment;
        });
        const existingApartments = JSON.parse(fs.readFileSync(savedCardsPath, 'utf8'));
        for (const key in existingApartments) {
            if (!apartmentsObject[key]) {
                delete existingApartments[key];
            }
        }
        fs.writeFileSync(savedCardsPath, JSON.stringify(existingApartments, null, 2), {
            encoding: 'utf8',
            flag: 'w'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) {
            await db.disconnect();
        }
    }
});

app.post('/addData', async (req, res) => {
    let client;

    const newData = req.body.apartmentNumber;

    try {
        client = await db.connect();

        const imageFilePath = '/img/' + newData.imageURL;
        await db.insertData(
            newData.apartmentNumber,
            newData.house,
            newData.porch,
            newData.floor,
            newData.area,
            newData.roomAmount,
            newData.price,
            imageFilePath
        );

        console.log('Квартира загружена');
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) {
            await db.disconnect();
        }
    }

    try {
        client = await db.connect();

        const results = await db.getAll();
        if (results && results.length > 0) {
            const apartmentsObject = {};
            results.forEach(apartment => {
                apartmentsObject[apartment.номер] = apartment;
            });
            fs.writeFileSync(savedCardsPath, JSON.stringify(apartmentsObject), { encoding: 'utf8', flag: 'w' });
        } else {
            console.log('No rows returned from the query.');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) {
            await db.disconnect();
        }
    }

    res.json({ message: 'Data added successfully', newData });
});

app.listen(port, () => {
    db.createTable().then(r => db.disconnect());
    console.log(`Server is running on ${port}`);
});
