class NotesView {

    constructor(model) {
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
        const notes = this.model.getNotes();

        notes.forEach(note => {
            const noteEl = document.createElement('div');
            noteEl.textContent = note;
            noteEl.className = 'note';
            this.mainContainerEl.append(noteEl);
        })
    };  
}

module.exports = NotesView;
