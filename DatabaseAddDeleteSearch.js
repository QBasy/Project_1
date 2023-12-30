import Database from './database.cjs';
const db = new Database();

async function addApartment(apartment, house, entrance, floor, quadrature, rooms, cost, status) {
    try {
        await db.connect().then(async r => {
            try {
                await db.insertData(apartment, house, entrance, floor, quadrature, rooms, cost, status).then(p => {
                    console.log("Готово");
                });
            } catch (err) {
                console.log('Ошибка', err);
            }
            try {
                await db.disconnect();
            } catch (err) {
                console.log('Ошибка', err);
            }
        });
    } catch (err) {
        console.log('Ошибка', err);
    }
}

async function executeGetByQuery(methodName, condition) {
    const db = new Database();

    try {
        await db.connect();
        const results = await db[methodName](condition);

        if (results && results.length > 0) {
            return results.map(result => result);
        } else {
            console.log('No rows returned from the query.');
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    } finally {
        await db.disconnect();
    }
}
let condition = true;
const resultsArrayStatus = await executeGetByQuery('getDataByStatus', condition);
condition = 3;
const resultsArrayFloorMore = await executeGetByQuery('getDataByFloorMore', condition);
const resultsArrayFloorLess = await executeGetByQuery('getDataByFloorLess', condition);
const resultsArrayCostLess = await executeGetByQuery('getDataByCostLess', condition);
const resultsArrayCostMore = await executeGetByQuery('getDataByCostMore', condition);
const resultsArrayQuadratureMore = await executeGetByQuery('getDataByQuadratureMore', condition);
const resultsArrayQuadratureLess = await executeGetByQuery('getDataByQuadratureLess', condition);
const resultsArrayApartment = await executeGetByQuery('getDataByApartment', condition);
const resultsArrayRoomsMore = await executeGetByQuery('getDataByRoomsMore', condition);
const resultsArrayRoomsLess = await executeGetByQuery('getDataByRoomsLess', condition);
const resultsArrayEntrance = await executeGetByQuery('getDataByEntrance', condition);

const mapQuery = {
    'statusIs': resultsArrayStatus,
    'costMore': resultsArrayCostMore,
    'costLess': resultsArrayCostLess,
    'floorMore': resultsArrayFloorMore,
    'floorLess': resultsArrayFloorLess,
    'areaMore': resultsArrayQuadratureMore,
    'areaLess': resultsArrayQuadratureLess,
    'roomsMore': resultsArrayRoomsMore,
    'roomsLess': resultsArrayRoomsLess,
    'apartmentEqual': resultsArrayApartment
};

const statusID = document.getElementById('statusID');
const costMoreID = document.getElementById('costMoreID');
const costLessID = document.getElementById('costLessID');
const floorMoreID = document.getElementById('floorMoreID');
const floorLessID = document.getElementById('floorLessID');
const areaMoreID = document.getElementById('areaMoreID');
const areaLessID = document.getElementById('areaLessID');
const roomsMoreID = document.getElementById('roomsMoreID');
const roomsLessID = document.getElementById('roomsLessID');
const apartmentEqualID = document.getElementById('apartmentEqualID');

const mapIdQuery = {
    statusID: mapQuery.statusIs,
    costMoreID: mapQuery.costMore,
    costLessID: mapQuery.costLess,
    floorMoreID: mapQuery.floorMore,
    floorLessID: mapQuery.floorLess,
    areaMoreID: mapQuery.areaMore,
    areaLessID: mapQuery.areaLess,
    roomsMoreID: mapQuery.roomsMore,
    roomsLessID: mapQuery.roomsLess,
    apartmentEqualID: mapQuery.apartmentEqual,
}

function select() {
    console.log(mapQuery)
    for (let card of mapQuery.areaMore) {
        console.log(card);
    }
}

