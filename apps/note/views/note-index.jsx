
import { notesService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
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

    onChangeColor = ({target}) => {
        console.log('ev:', target.value)
    }

    render() {
        const { notes } = this.state
        if (!notes[0]) return 'Loading...'
        return (
            <section className="note-index app-layout ">
                <Link to="/note/edit">add note</Link>
                <NoteList notes={notes} onRemoveNote={this.onRemoveNote} onChangeColor={this.onChangeColor} />

                {/* <section>
                    <Route path="/note/edit" component={NoteEdit} />
                </section> */}
            </section>
        )
    }
}
