import { NotePreview } from './note-preview.jsx';

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onChangeColor }) {
    return <section className=" main-app">
        <ul className="list-style-none app-layout note-list">
            {notes.map(note => {
                console.log('note:', note.id)
                const { backgroundColor } = note.style || ''
                return <li key={note.id} name={note.id} style={{ backgroundColor: backgroundColor }}>
                    <NotePreview note={note} />
                    <Link to={`/note/edit/${note.id} `}>edit</Link>

                    <form>
                        <label htmlFor={`color${note.id}`}>🎨</label>
                        <input className="color" id={`color${note.id}`} type="color" name={note.id} onChange={onChangeColor} />
                        <button onClick={() => onRemoveNote(note.id)}>🗑️</button>
                    </form>
                </li>
            })}
        </ul>
    </section>

}

function changeColor() {

}