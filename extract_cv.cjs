const fs = require('fs');
const pdfParse = require('pdf-parse');
const pdfFile = fs.readFileSync('Uyen Ngo CV - Wilmar International.pdf');
pdfParse(pdfFile).then(data => {
  console.log(data.text);
}).catch(e => {
  console.log('Error:', e.message);
  process.exit(1);
});
