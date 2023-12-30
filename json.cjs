import { Database } from './database.cjs';
function test() {
    const path = ('../savedCards.json');
    const dbb = new Database();
    let data = fs.readFileSync(path, {encoding: 'utf8'});

    console.log(data);

    fs.writeFileSync(path, JSON.stringify(dbb.getAll()), {encoding: 'utf8', flag: 'w'});

    data = fs.readFileSync(path, {encoding: 'utf8'});

    console.log(data)
}