
import { notesService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteEdit } from "../cmps/note-edit.jsx"

const { Link, Route, Switch } = ReactRouterDOM
export class NoteIndex extends React.Component {
    state = {
        notes: [],
        filterBy: null
    }
    componentDidMount() {
        this.loadNotes()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.noteId !== this.props.match.params.noteId) {
            this.loadNotes()
        }
    }

    loadNotes = () => {
        notesService.query(this.state.filterBy)
            .then((notes) => this.setState({ notes }))
    }

    onSetFilter = (filterBy) => {
        console.log('filter');
        this.setState({ filterBy }, this.loadNotes)
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

    onDuplicateNote = (ev, noteId) => {
        ev.preventDefault()
        console.log('event:', ev)
        console.log('noteId:', noteId)
        notesService.duplicateNote(noteId)
            .then(() => {
                this.loadNotes()
            })
    }

    render() {
        const { notes } = this.state
        console.log('notes:', notes)
        const piningNotes = notes.filter(note => note.isPinned)
        const unPining = notes.filter(note => (!note.isPinned))
        const {loadNotes} =this
        if (!notes[0]) return 'Loading...'
        return (
            <section className="note-index app-layout">
                    <NoteFilter onSetFilter={this.onSetFilter} />
                <div className="main-app ">
                    <Link to={{ pathname: "/note/edit", state: { 'decrease': loadNotes } }}><button className ="add-btn">add note</button></Link>
                    <NoteList notes={piningNotes} onRemoveNote={this.onRemoveNote}
                        onChangeColor={this.onChangeColor} onPiningNote={this.onPiningNote}
                        onDuplicateNote={this.onDuplicateNote} loadNotes={this.loadNotes}/>
                    
                    <br /><br />
                    <NoteList notes={unPining} onRemoveNote={this.onRemoveNote}
                        onChangeColor={this.onChangeColor} onPiningNote={this.onPiningNote}
                        onDuplicateNote={this.onDuplicateNote} loadNotes={this.loadNotes}/>
                </div>

                <Switch>
                    <Route path="/note/edit/:noteId?" component={NoteEdit} />
                    <Route path="/note/edit" component={NoteEdit} />
                </Switch>
            </section>
        )
    }
}
