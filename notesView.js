const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');

class NotesView {

    constructor(model, client) {
        this.client = client;
        this.model = model;
        this.mainContainerEl = document.querySelector('#main-container');
        this.button = document.querySelector('#add-note');
        this.input = document.querySelector('#user-input');
        this.button.addEventListener('click', () => {
            this.model.addNote(this.input.value);
            this.displayNotes();
        })
    };

    displayNotes() {
        document.querySelectorAll('.note').forEach(element => {
            element.remove();
        });
        
        const notes = this.model.getNotes();

        notes.forEach(note => {
            const noteEl = document.createElement('div');
            noteEl.textContent = note;
            noteEl.className = 'note';
            this.mainContainerEl.append(noteEl);
        })
    };
    
    displayNotesFromApi() {
        return this.client.loadNotes()
          .then((notes) => this.model.setNotes(notes))
          .then(() => console.log(this.model.getNotes()))
          .then(() => this.displayNotes())
    }
}

module.exports = NotesView;
