import { notesService } from '../services/note.service.js'

export class NotePreview extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        const { note } = this.props
        this.setState({ note })
    }

    DynamicCmp = () => {
        const { type, info } = this.state.note
        switch (type) {
            case 'note-txt':
                return <TextNote txt={info.txt} />
            case 'note-img':
                return <ImgNote url={info.url} title={info.title} />

            case 'note-todos':
                return <TodoNote label={info.label} todos={info.todos} OnCheckTodo={this.OnCheckTodo} />
        }
    }

    OnCheckTodo = (todoIdx) => {
        const { id } = this.state.note
        notesService.checkTodo(id, todoIdx)
        this.setState((prevstate) => {
            const {info} = this.state.note
            const {todos} = info
            const {doneAt} = todos[todoIdx]
            const val = doneAt ? null : Date.now()
            todos[todoIdx].doneAt = val
            return {
                ...prevstate
            }

        }, )
    }
    
    render() {
        const { DynamicCmp } = this
        const { note } = this.state
        if (!note) return 'Loading...'
        return <section className="note-preview">
            <DynamicCmp />
        </section>
    }
}

function TextNote({ txt }) {
    return <article>
        <p>{txt}</p>
    </article>
}

function ImgNote({ url, title }) {
    return <article>
        <div>
            <img src={url} />
        </div>
        <p>{title}</p>

    </article>
}

function TodoNote({ label, todos, OnCheckTodo }) {
    return <article>
        <h4>{label}</h4>
        {todos.map((todo, idx) => TodoPreview(todo, idx, OnCheckTodo))}
    </article>

}

function TodoPreview(todo, idx, OnCheckTodo) {
    return <form key={idx}>
        <input type="checkbox" id={idx} checked={(todo.doneAt) ? true : false} onChange={() => OnCheckTodo(idx)} />
        <label htmlFor={idx}>{todo.txt}</label>
    </form>
}





