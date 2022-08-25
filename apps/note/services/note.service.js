const gNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "red"
        }
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: false,
        info: {
            url: "https://upload.wikimedia.org/wikipedia/en/1/10/Winniethepooh.png",//"http://some-img/me",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "red"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    }

]

import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const KEY = 'notesDB'

export const notesService = {
    query,
    checkTodo,
    removeNote,
    saveNote,
    getById,
    changeNoteStyle,
    piningNote,
    duplicateNote
}

function query(filterBy) {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = gNotes
        _saveToStorage(notes)
    }

    if (filterBy) {
        let { type, search } = filterBy
        notes = notes.filter(note => {
            return note.type.includes(type)
            // note.type.includes(search)
        })
    }
    return Promise.resolve(notes)
}

function checkTodo(noteId, todoIdx) {
    let notes = _loadFromStorage()
    let note = notes.find(note => note.id === noteId)
    let todo = note.info.todos[todoIdx]
    todo.doneAt = (!todo.doneAt) ? Date.now() : null
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function piningNote(noteId) {
    let notes = _loadFromStorage()
    let note = notes.find(note => note.id === noteId)
    note.isPinned = (note.isPinned) ? false : true
    console.log('note.isPinned :', note.isPinned)
    _saveToStorage(notes)
    return Promise.resolve()
}

function duplicateNote(noteId) {
    let notes = _loadFromStorage()
    let note = notes.find(note => note.id === noteId)
    let newNote = {...note, id:utilService.makeId(4) }
    notes.unshift(newNote)
    _saveToStorage(notes)
    return Promise.resolve()
}

function removeNote(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}

function saveNote(note) {
    switch (note.type) {
        case 'note-txt':
            if (note.id) _updateTxtNote(note)
            else _addTxtNote(note)
    }
    return Promise.resolve()
}

function _updateTxtNote(noteToUpdate) {
    console.log('update note:', noteToUpdate)
    let notes = _loadFromStorage()
    notes = notes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function _addTxtNote(note) {
    const newNote = {
        id: utilService.makeId(4),
        type: note.type,
        isPinned: note.isPinned,
        info: {
            txt: note.info.txt
        }
    }
    let notes = _loadFromStorage()
    notes.unshift(newNote)
    _saveToStorage(notes)
    return Promise.resolve()
}

function getById(noteId) {
    if (!noteId) return Promise.resolve(null)
    const notes = _loadFromStorage()
    let note = notes.find(note => note.id === noteId)
    return Promise.resolve(note)
}

function changeNoteStyle(noteId, newStyle) {
    const notes = _loadFromStorage()
    let note = notes.find(note => note.id === noteId)
    if (!note.style) note.style = {}
    note.style.backgroundColor = newStyle
    _saveToStorage(notes)
    return Promise.resolve()
}

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}