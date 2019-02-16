const noteDAO = require('./notes.dao');

// add notes
const addNotes = (userId,data) => {
    //console.log('add notes 3');
    return noteDAO.addNotes(userId,data);
}

// get notes by user id
const getNotesByUserId = (userId) => {
    return noteDAO.getNotesByUserId(userId);
}

//update notes
const updateNotes = (noteId,note) => {
    //console.log('update notes 3');
    return noteDAO.updateNotes(noteId,note);
}

module.exports = {
    addNotes,
    getNotesByUserId,
    updateNotes
}