
import { notesService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteEdit } from "../cmps/note-edit.jsx"

const { Link, Route } = ReactRouterDOM

export class NoteIndex extends React.Component {
    state = {
        notes: []
    }
    componentDidMount() {
        this.loadNotes()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.noteId !== this.props.match.params.noteId) {
            this.loadNotes()
        }
    }

    loadNotes = () => {
        notesService.query()
            .then((notes) => this.setState({ notes }))
    }

    onRemoveNote = (noteId) => {
        notesService.removeNote(noteId)
            .then(() => {
                this.loadNotes()
            })
    }

    onChangeColor = ({ target }) => {
        const backgroundColor = target.value
        const noteId = target.name
        notesService.changeNoteStyle(noteId, backgroundColor)
            .then(() => {
                this.loadNotes()
            })
    }

    onPiningNote = (noteId) => {
        console.log('noteId:', noteId)
        notesService.piningNote(noteId)
            .then(() => {
                this.loadNotes()
            })
    }

    render() {
        const { notes } = this.state
        console.log('notes:', notes)
        if (!notes[0]) return 'Loading...'
        return (
            <section className="note-index app-layout">
                <div className="side-bar">
                    <NoteFilter />
                </div>
                <div className="main-app">
                    <NoteList notes={notes} onRemoveNote={this.onRemoveNote} onChangeColor={this.onChangeColor} onPiningNote={this.onPiningNote} />
                </div>
            </section>
        )
    }
}
