const NotesClient = require('./notesClient');

require('jest-fetch-mock').enableMocks()

describe('notesClient class', () => {
    it('calls fetch and loads data', (done) => {
        const client = new NotesClient();

        fetch.mockResponseOnce(JSON.stringify({
            name: "Some value",
            id: 123
        }));

        client.loadNotes((returnedDataFromApi) => {
            expect(returnedDataFromApi.name).toBe("Some value");
            expect(returnedDataFromApi.id).toBe(123);

            done();
        });
    });

    it('calls #createNote, sends post request to api', (done) => {
        const client = new NotesClient();

        fetchMock.mockResponse();

        const url = 'http://localhost:3000/notes';
        const params = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {content: "note 1"})
        };

        client.createNote('note 1')
            .then(() => {
                expect(fetchMock).toHaveBeenCalledWith(url, params);
                done();
            });
    });
});