import { NotePreview } from './note-preview.jsx';

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onChangeColor }) {
    return <section className="note-list main-app">
        <ul className="list-style-none">
            {notes.map(note => {
                return <li key={note.id}>
                    <Link to={`/note/edit/${note.id} `} key={note.id}>
                        <NotePreview note={note} />
                    </Link>
                    <label htmlFor="color">🎨</label>
                    <input id="color" type="color" onChange={onChangeColor} />
                    <button onClick={() => onRemoveNote(note.id)}>🗑️</button>
                </li>
            })}
        </ul>
    </section>

}

function changeColor() {

}