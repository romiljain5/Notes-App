const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require("./notes.js")
const fs = require("fs")
const { title } = require('process')

// console.log(validator.isEmail('go@gmail.com'))
// console.log(validator.isBoolean('true'))
// console.log(validator.isDivisibleBy('12',2))
// console.log(validator.isURL("https://www.npmjs.com/package/validator" ,['https','http','ftp']))
// console.log(chalk.inverse.bold('Success!'))
// console.log(chalk.blueBright.inverse("black"))

// console.log(notes()) 

// const command = process.argv[2]

// if(command === 'add'){
//     console.log('adding notes')
// } else if (command === 'remove'){
//     console.log('removing note')
// }
yargs.version('1.1.0')

// for making notes app we need

//  add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//  remove command
yargs.command({
    command: 'remove',
    describe: 'removes a note',
    builder: {
        title: {
            describe: "Note Title to remove",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.RemoveNote(argv.title)
    }
})

// list command
yargs.command({
    command: 'list',
    describe: 'shows the list',
    handler() {
        console.log(chalk.inverse.white.bold('listing out all the notes'))
        notes.ListNotes()
    }
})

// Read command
yargs.command({
    command: 'read',
    describe: 'reads the list',
    builder: {
        title: {
            describe: "Note Title to find",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.ReadNotes(argv.title)
    }
})

// add, remove, read, list

yargs.parse()
// console.log(process.argv)
// console.log(yargs.argv)