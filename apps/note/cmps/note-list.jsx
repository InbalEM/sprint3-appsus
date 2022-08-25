import { NotePreview } from './note-preview.jsx';

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onChangeColor, onPiningNote }) {
    return <section className="">
        <Link to="/note/edit">add note</Link>
        <ul className="list-style-none note-list ">
            {notes.map(note => {
                 const {isPinned} =note
                const { backgroundColor } = note.style || ''
                return (<li key={note.id} name={note.id} style={{ backgroundColor: backgroundColor }}>
                    <NotePreview note={note} />

                    <form>
                    <Link to={`/note/edit/${note.id} `}>📝</Link>
                        <label htmlFor={`color${note.id}`}>🎨</label>
                        <input className="color" id={`color${note.id}`} type="color" name={note.id} onChange={onChangeColor} />
                        <button onClick={() => onRemoveNote(note.id)}>🗑️</button>
                        <button name={note.id} onClick={() => onPiningNote(note.id)}>📌</button>
                    </form>
                </li>)
            })}
        </ul>
    </section>

}

function changeColor() {

}