
/**
 * @jest-environment jsdom
 */


const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');

describe('NotesView', () => {
    it('displays 2 notes', () => {
        document.body.innerHTML = fs.readFileSync('./index.html');

        const model = new NotesModel();
        const view = new NotesView(model);
        model.addNote('First note');
        model.addNote('Another note');

        view.displayNotes();

        expect(document.querySelectorAll('div.note').length).toEqual(2);
    });
});