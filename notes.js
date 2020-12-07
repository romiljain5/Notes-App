const fs = require("fs")
const chalk = require("chalk")
const { stringify } = require("querystring")

const getNotes = () => {
    return "Your Notes"
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // using filter method
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    })
    // using find method
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote){
         notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.bold("note added"))
        saveNotes(notes)
    } else {
        console.log(chalk.red.bold('Note title taken!'))
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const RemoveNote = (title) => {
    const notes = loadNotes()

    const NoteToKeep = notes.filter((note) => {
            return note.title !== title
    })


    if (notes.length > NoteToKeep.length){

        console.log(chalk.green.bold('Note Removed'))
        saveNotes(NoteToKeep)

    } else {
        console.log(chalk.red.bold("No Note Found"))
    }

}

const ListNotes = () => {
    const file = fs.readFileSync('notes.json')
    const stringify = file.toString()
    const parseit = JSON.parse(stringify)

    for(var i=0; i<parseit.length; i++){
        console.log(parseit[i].title)
    }
}

const ReadNotes = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title === title)

    if(findNote){
    console.log(chalk.yellow.bold(findNote.title)+"\n"+chalk.white.bold(findNote.body))
    }else{
        console.log(chalk.red.bold("Note doesn't exists"))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    RemoveNote: RemoveNote,
    ListNotes: ListNotes,
    ReadNotes: ReadNotes,
}