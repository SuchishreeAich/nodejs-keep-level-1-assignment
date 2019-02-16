const noteModule = require('./notes.entity');
const uuidv1 = require('uuid/v1');

const addNotes = (userId,data) => {
    // console.log('add notes 4: ', noteDetails);
    return new Promise((resolve,reject) => {
        let newNote = new noteModule();
        
        newNote.id = uuidv1();
        newNote.title = data.title;
        newNote.text = data.text;
        newNote.userId = userId;

        newNote.save((error,addedNote) => {
            if(error){
                reject({message : 'Internal server error',status : 500});
            }
            else{
                resolve({message : "Successfull add note",status:201,note:addedNote});
            }
        });
    });
};

const getNotesByUserId = (userId) => {
     //console.log('get notes 4: ', notesInfo);
    return new Promise((resolve,reject) => {
        
        noteModule.find({'userId' :  userId}, function(err,data){
            
            if(err){
                reject({message : 'Internal server error',status : 500});
            }
            else if(!data){
                reject({message : 'No notes found for this userId',status : 200});
            }
            else{
                resolve({message : "Successfull note fetch",status:200,notes:data}); 
            }
        });
        
    });
};

const updateNotes = (noteId,note) => {
   
    //console.log('update notes 4');
    return new Promise((resolve,reject) => {

        let updatedNote = {
            $set:{
                title: note.title,
                text: note.text,
                state: note.state
            }
        };

        //console.log('update notes 5');
        noteModule.findOneAndUpdate({'id' : noteId},updatedNote,{new: true},(err,note) =>{

            //console.log('update notes 6');
            if(err){
                //console.log('update notes 7');
                reject({message : 'Internal server error while updating notes',status : 500});
            }
            else if(!note){
                //console.log('update notes 8');
                reject({message : 'No note found for this noteId',status : 500});
            }
            else{
                //console.log('update notes 9'); = {}
                let noteUpdate = {id : note.id,title : note.title, text : note.text};
                resolve({message : 'Update note successfull',status : 200,note:noteUpdate});
            }
        });
        //console.log('update notes 10');
    });
};

module.exports = {
    addNotes,
    getNotesByUserId,
    updateNotes
}