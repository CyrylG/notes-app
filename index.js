const notesModel = require('./notesModel');

const model = new notesModel();

console.log('The notes app is running');
console.log(model.getNotes());