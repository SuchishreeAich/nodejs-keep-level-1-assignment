const notesService = require('./notes.service');

//add notes
const addNotes = (userId,data) => {
    // console.log('add notes 2');
    return notesService.addNotes(userId,data);
}

//get notes
const getNotesByUserId = (userId) => {
    return notesService.getNotesByUserId(userId);
}

//update notes
const updateNotes = (noteId,note) => {
    //console.log('update notes 2');
    return notesService.updateNotes(noteId,note);
}

module.exports = {
    addNotes,
    getNotesByUserId,
    updateNotes
}