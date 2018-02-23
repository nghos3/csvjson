const result = [];
let headers;
let a = 0;

function csvJSON(csv, a) {
  const lines = csv;

  if (a == 0) { headers = lines.split(','); } else {
    const obj = {};
    const currentline = lines.split(/,(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/);

    for (let j = 0; j < headers.length; j++) {
      // WRITE CONDITION
      if (headers[j] == 'salt_100g' || headers[j] == 'sugars_100g' || headers[j] == 'countries_en' || headers[j] == 'carbohydrates_100g' || headers[j] == 'proteins_100g' || headers[j] == 'fat_100g') { obj[headers[j]] = currentline[j]; }
    }

    result.push(obj);

    // JSON
  }

  // console.log(JSON.stringify(result));
}


const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const instream = fs.createReadStream('FoodFacts.csv');
const outstream = new stream();
const ostream1 = fs.createWriteStream('barg.json');
const ostream2 = fs.createWriteStream('multig.json');
const rl = readline.createInterface(instream, outstream);

let i;
// These are the variables for first json inside the array parameters contains salt and second one contains salt
const countries = [];

const count = ['France', 'United Kingdom', 'Germany', 'United States', 'Australia', 'Canada', 'Spain', 'Netherlands', 'South Africa'];
const salt = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
const sugar = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];


// These variables are for regions array inside will contain Fat, Protein and Carbohydrate  respectively
const regions = [];
const reg = ['North Europe', 'Central Europe', 'South Europe '];

const carb = [0.0, 0.0, 0.0];
const pro = [0.0, 0.0, 0.0];
const fat = [0.0, 0.0, 0.0];

rl.on('line', (line) => {
  csvJSON(line, a);
  a++;
});
rl.on('close', () => {
  let namo = JSON.stringify(result);
  // parse data
  namo = JSON.parse(namo);


  for (i = 0; i < a - 1; i++) {
    for (var j = 0; j < count.length; j++) {
      if (namo[i].countries_en == count[j]) {
        salt[j] += namo[i].salt_100g === '' ? 0 : parseFloat(namo[i].salt_100g);
        sugar[j] += namo[i].sugars_100g === '' ? 0 : parseFloat(namo[i].sugars_100g);
      }
    }
  }

  for (var j = 0; j < count.length; j++) {
    var objc = {};
    objc.countries = count[j];
    objc.salt_sug = salt[j];
    objc.salt_sug = sugar[j];
    countries.push(objc);
  }


  for (i = 0; i < a - 1; i++) {
    var j;
    if (namo[i].countries_en == 'United Kingdom' || namo[i].countries_en == 'Denmark' || namo[i].countries_en == 'Sweden' || namo[i].countries_en == 'Norway') {
      j = 0;
      carb[j] += namo[i].carbohydrates_100g === '' ? 0 : parseFloat(namo[i].carbohydrates_100g);
      pro[j] += namo[i].proteins_100g === '' ? 0 : parseFloat(namo[i].proteins_100g);
      fat[j] += namo[i].fat_100g === '' ? 0 : parseFloat(namo[i].fat_100g);
    } else if (namo[i].countries_en == 'France' || namo[i].countries_en == 'Belgium' || namo[i].countries_en == 'Germany' || namo[i].countries_en == 'Switzerland' || namo[i].countries_en == 'Netherlands') {
      j = 1;
      carb[j] += namo[i].carbohydrates_100g === '' ? 0 : parseFloat(namo[i].carbohydrates_100g);
      pro[j] += namo[i].proteins_100g === '' ? 0 : parseFloat(namo[i].proteins_100g);
      fat[j] += namo[i].fat_100g === '' ? 0 : parseFloat(namo[i].fat_100g);
    } else if (namo[i].countries_en == 'Portugal' || namo[i].countries_en == 'Greece' || namo[i].countries_en == 'Italy' || namo[i].countries_en == 'Spain' || namo[i].countries_en == 'Croatia' || namo[i].countries_en == 'Albania') {
      j = 2;
      carb[j] += namo[i].carbohydrates_100g === '' ? 0 : parseFloat(namo[i].carbohydrates_100g);
      pro[j] += namo[i].proteins_100g === '' ? 0 : parseFloat(namo[i].proteins_100g);
      fat[j] += namo[i].fat_100g === '' ? 0 : parseFloat(namo[i].fat_100g);
    }
  }


  for (var j = 0; j < reg.length; j++) {
    var objc = {};
    objc.region = reg[j];
    objc.fat = fat[j];
    objc.protein = pro[j];
    objc.carbohydrates = carb[j];
    regions.push(objc);
  }

  let done = JSON.stringify(countries);
  ostream1.write(done);
  done = JSON.stringify(regions);
  ostream2.write(done);
});
