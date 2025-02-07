import fs from 'fs';
import { entities } from './json-server-files/entities.js'

function parseJsonFromFile(filename) {
    return JSON.parse(fs.readFileSync(`./json-server-files/${filename}`, 'utf8'));
}

function combineData(entities) {
    const combinedData = {};
    entities.forEach(({ entityName, key, fileName }) => {
        const data = parseJsonFromFile(fileName);
        combinedData[entityName] = data[key];
    });
    return combinedData;
}


const combinedData = combineData(entities);


fs.writeFileSync('json_server_db.json', JSON.stringify(combinedData, null, 2));
console.log('Data combined into json_server_db.json');
