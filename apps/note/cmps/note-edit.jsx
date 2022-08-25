
import { notesService } from '../services/note.service.js'

export class NoteEdit extends React.Component {
    state = {
        note: {
            type: 'note-txt',
            isPinned: false,
            info: {
                txt: '',
            }
        }
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        const { noteId } = this.props.match.params
        console.log('noteId:', noteId)
        if (!noteId) return
        notesService.getById(noteId).then(note => {
            console.log('note:', note)
            this.setState({ note })
        })
    }

    onChangeNote = ({ target }) => {
        this.setState(prevstate => {
            const { info } = this.state.note
            return {
                note: {
                    ...prevstate.note,
                    info: {
                        ...info,
                        txt: target.value
                    }

                }
            }
        })
    }

    onEditNote = (ev) => {
        if (ev) ev.preventDefault()
        const {note} = this.state
        notesService.saveNote(note)
            .then(() => {
                console.log('thes:')
                this.props.history.push('/note')
            })
    }

    render() {
        const {txt}= this.state.note.info
        console.log('txt:', txt)
        return <form onSubmit={this.onEditNote}>
            <h1>edit</h1>
            <label htmlFor="note-txt"></label>
            <input id = "note-txt" type="text" value={txt} onChange={this.onChangeNote} />
            <button>Save</button>
        </form>
    }
}