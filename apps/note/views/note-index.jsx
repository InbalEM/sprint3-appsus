
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

    // onChangeColor = (ev) => {
    //     console.log('ev:', ev.target)

    // }
    onChangeColor = ({target}) => {
        const backgroundColor = target.value
        console.log('color:', backgroundColor)
        console.log('target:', target)
        const noteId = target.name
        console.log('carId:', noteId)
        notesService.changeNoteStyle(noteId, backgroundColor )
        .then(() => {
            this.loadNotes()
        })
    }


    render() {
        const { notes } = this.state
        // const {backgroundColor} = notes.style ? notes.style|| ''
        if (!notes[0]) return 'Loading...'
        return (
            <section className="note-index">
                <Link to="/note/edit">add note</Link>
                <NoteList notes={notes} onRemoveNote={this.onRemoveNote} onChangeColor={this.onChangeColor} />

                {/* <section>
                    <Route path="/note/edit" component={NoteEdit} />
                </section> */}
            </section>
        )
    }
}
