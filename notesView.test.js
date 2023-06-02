
/**
 * @jest-environment jsdom
 */


const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

jest.mock('./notesClient')

describe('NotesView', () => {
    beforeEach(() => {
        NotesClient.mockClear();
    });

    it('displays 2 notes', () => {
        document.body.innerHTML = fs.readFileSync('./index.html');

        const model = new NotesModel();
        const view = new NotesView(model);
        model.addNote('First note');
        model.addNote('Another note');

        view.displayNotes();

        expect(document.querySelectorAll('div.note').length).toEqual(2);
    });

    it('displays 2 notes', () => {
        document.body.innerHTML = fs.readFileSync('./index.html');

        const model = new NotesModel();
        const view = new NotesView(model);
        const input = document.querySelector('#user-input');
        input.value = 'New note';

        const button = document.querySelector('#add-note');
        button.click();

        expect(document.querySelectorAll('div.note').length).toEqual(1);
        expect(document.querySelectorAll('div.note')[0].textContent).toEqual('New note');
    });

    it('clear all notes before displaying', () => {
        document.body.innerHTML = fs.readFileSync('./index.html');

        const model = new NotesModel();
        const view = new NotesView(model);
        model.addNote('one');
        model.addNote('two');

        view.displayNotes();
        view.displayNotes();

        expect(document.querySelectorAll('div.note').length).toEqual(2);
    });

    it('Loads the data from the client and populates the model with it', () => {
        const mockClient = {
          loadNotes: jest.fn()
        }
    
        mockClient.loadNotes.mockResolvedValueOnce(['note 1', 'note 2']);
    
        const model = new NotesModel();
        const notesView = new NotesView(model, mockClient);
    
        return notesView.displayNotesFromApi().then(() => {
          expect(mockClient.loadNotes).toHaveBeenCalledTimes(1);
          expect(document.querySelectorAll('div .note').length).toBe(2);
          expect(document.querySelectorAll('div .note')[0].textContent).toBe('note 1');
          expect(document.querySelectorAll('div .note')[1].textContent).toBe('note 2');
        });
    })
});