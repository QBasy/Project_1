const resultsArrayStatus = 1;
const resultsArrayFloorMore = 2;
const resultsArrayFloorLess = 3;
const resultsArrayCostLess = 4;
const resultsArrayCostMore = 5;
const resultsArrayQuadratureMore = 'yes';
const resultsArrayQuadratureLess = 7;
const resultsArrayApartment = 8;
const resultsArrayRoomsMore = 9;
const resultsArrayRoomsLess = 10;

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

console.log(mapQuery.areaMore)