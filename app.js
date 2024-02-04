const fs = require('fs');

async function readFile() {
    return new Promise(async (resolve, reject) => {
        const filePath = "./MOCK_DATA_EMPLOYEES.json";
        const stream = await fs.createReadStream(filePath, "utf-8");
        let response = "";

        stream.on('data', data => {
            response += data;
        });
        stream.on('end', () => {
            resolve(response);
        });
        stream.on('error', err => {
            console.log(err);
            reject(err);
        });
    });
}

async function main() {
    try {
        const result = await readFile();
        return result;
    } catch (err) {
        console.log(err);
    }
}

main().then(r => console.log(JSON.parse(r).length)).catch(e => console.log(e))