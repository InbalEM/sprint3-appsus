import { NotePreview } from './note-preview.jsx';
// import { NoteEdit } from "../cmps/note-edit.jsx"

const { Link, Route, Switch } = ReactRouterDOM

export class NoteList extends React.Component {
    state={
        note: this.props.note 
    }

    render(){
        const { notes, onRemoveNote, onChangeColor, onPiningNote, onDuplicateNote, loadNotes } = this.props
        return <ul className="list-style-none note-list">
            {notes.map(note => {
                const { isPinned } = note
                const { backgroundColor } = note.style || ''
                return (<li key={note.id} name={note.id} style={{ backgroundColor: backgroundColor }}>

                    <NotePreview note={note} />

                    <form>
                    <Link to={{ pathname: `/note/edit/${note.id}`, state: { 'decrease': loadNotes } }}>📝</Link>
                        <label htmlFor={`color${note.id}`}>🎨</label>
                        <input className="color" id={`color${note.id}`} type="color" name={note.id} onChange={onChangeColor} />
                        <button onClick={() => onRemoveNote(note.id)}>🗑️</button>
                        <button name={note.id} onClick={() => onPiningNote(note.id)}>📌</button>
                        <button onClick={() => onDuplicateNote(event, note.id)}>Duplicate Note</button>
                    </form>

                </li>)
            })}
        </ul>

   
    }
}
// export function NoteList({ notes, onRemoveNote, onChangeColor, onPiningNote, onDuplicateNote, loadNotes }) {
//     return <section className="">

//         <ul className="list-style-none note-list app">
//             {notes.map(note => {
//                 const { isPinned } = note
//                 const { backgroundColor } = note.style || ''
//                 return (<li key={note.id} name={note.id} style={{ backgroundColor: backgroundColor }}>

//                     <NotePreview note={note} />

//                     <form>
//                         <Link to={{ pathname: `/note/edit/${note.id}`, state: { 'decrease': loadNotes } }}>📝</Link>
//                         {/* <Link to={`/note/edit/${note.id}`}>📝</Link> */}
//                         <label htmlFor={`color${note.id}`}>🎨</label>
//                         <input className="color" id={`color${note.id}`} type="color" name={note.id} onChange={onChangeColor} />
//                         <button onClick={() => onRemoveNote(note.id)}>🗑️</button>
//                         <button name={note.id} onClick={() => onPiningNote(note.id)}>📌</button>
//                         <button onClick={() => onDuplicateNote(event, note.id)}>Duplicate Note</button>
//                     </form>

//                 </li>)
//             })}
//         </ul>

//     </section>

// }
