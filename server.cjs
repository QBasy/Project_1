const express = require('express');
const Database = require("./database.cjs");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 1337;
const db = new Database();

app.set('view engine', 'ejs');
app.set('views', './files');

app.use(express.static('files'));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.get('/index',(req,res) => {
    res.render('index.ejs');
})

app.get('/adder', (req, res) => {
    res.render('adder.ejs');
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images'); // Specify the directory where files will be stored
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
    res.sendFile('index.ejs')
});

app.post('/refresh',async (req, res) => {
    try {
        client = await db.connect();

        const results = await db.getAll();

        if (results && results.length > 0) {
            const apartmentsObject = {};
            results.forEach(apartment => {
                console.log(apartmentsObject);
                apartmentsObject[apartment.номер] = apartment;
            });
            fs.writeFileSync(__dirname + '/files/savedCards.json', JSON.stringify(apartmentsObject), {
                encoding: 'utf8',
                flag: 'w'
            });
        } else {
            console.log('No rows returned from the query.');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: 'Internal server error'});
    } finally {
        await db.disconnect();
    }
});

app.post('/filter', async (req, res) => {
    const filters = req.body;
    const filePath = __dirname + '/files/savedCards.json';
    try {
        client = await db.connect();
        const filteredData = await db.filter(filters);
        res.json(filteredData);
        if (filteredData && filteredData.length > 0) {
            const apartmentsObject = {};
            console.log(apartmentsObject, ")))");
            filteredData.forEach(apartment => {
                apartmentsObject[apartment.номер] = apartment;
            });
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }

                try {
                    let jsonData = JSON.parse(data);

                    jsonData = {};

                    const jsonString = JSON.stringify(jsonData, null, 2); // the third argument (2) is for indentation
                    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
                        if (err) {
                            console.error('Error writing file:', err);
                        } else {
                            console.log('File cleared successfully.');
                        }
                    });
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                }
            });
            fs.writeFileSync(__dirname + '/files/savedCards.json', JSON.stringify(apartmentsObject), {
                encoding: 'utf8',
                flag: 'w'
            });
        }
    } catch (error) {
        console.error('Error filtering data:', error);
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
            fs.writeFileSync(__dirname + '/files/savedCards.json', JSON.stringify(apartmentsObject), { encoding: 'utf8', flag: 'w' });
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



