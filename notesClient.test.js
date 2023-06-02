const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

describe('notesClient class', () => {
    it('calls fetch and loads data', (done) => {
        const notesClient = new NotesClient();

        fetch.mockResponseOnce(JSON.stringify({
            name: "Some value",
            id: 123
        }));

        notesClient.loadNotes((returnedDataFromApi) => {
            expect(returnedDataFromApi.name).toBe("Some value");
            expect(returnedDataFromApi.id).toBe(123);

            done();
        });
    });
})