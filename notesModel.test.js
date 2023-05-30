const notesModel = require('./notesModel');

describe('notesModel', () => {
    it('#getNotes initially returns empty array', () => {
        const model = new notesModel();
        expect(model.getNotes()).toEqual([]);
    });

    it('#getNotes returns array with 2 inputs', () => {
        const model = new notesModel();
        model.addNote('Buy milk');
        model.addNote('Go to the gym');
        expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
    });

    it('#getNotes returns empty array after it is reset', () => {
        const model = new notesModel();
        model.addNote('Buy milk');
        model.addNote('Go to the gym');
        model.reset();
        expect(model.getNotes()).toEqual([]);
    });
});