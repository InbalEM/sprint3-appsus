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
        if (!noteId) return
        notesService.getById(noteId).then(note => {
            this.setState({ note })
        })
    }

    onSelectType = ({ target }) => {
        const { value } = target
        this.setState(prevstate => {
            const { info } = this.state.note
            if (value === "note-todos") {
                return {
                    note: {
                        ...prevstate.note,
                        type: value,
                        info: {
                            label: info.txt ? info.txt : info.title,
                            todos: [
                                { txt: '', doneAt: null }
                            ]
                        }
                    }
                }
            }
            if (value === "note-img") {
                return {
                    note: {
                        ...prevstate.note,
                        type: value,
                        info: {
                            title: info.txt ? info.txt : info.label,
                            url: ''
                        }
                    }
                }
            }
            if (value === "note-txt") {
                return {
                    note: {
                        ...prevstate.note,
                        type: value,
                        info: {
                            ...info,
                            txt: info.title ? info.title : info.label
                        }

                    }
                }
            }
        })
    }

    onChangeNote = ({ target }) => {
        const { type } = this.state.note
        if (type.localeCompare('note-image')) this.updateImg(target)
        switch (type) {
            case 'note-txt':
                this.updateTxt(target)
                break;
            case 'note-image':
                this.updateImg(target)
                break;
        }
    }
    updateTxt = (target) => {
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
    updateImg = (target) => {
        this.setState(prevstate => {
            const { info } = this.state.note
            return {
                note: {
                    ...prevstate.note,
                    info: {
                        ...info,
                        title: target.value
                    }

                }
            }
        })
    }

    onSubmit = (ev) => {
        if (ev) ev.preventDefault()
        const { note } = this.state
        notesService.saveNote(note)
            .then(() => {

                const fun = this.props.location.state.decrease
                fun()
                this.props.history.push('/note')
            })
    }

    onChangeImage = (ev) => {
        var reader = new FileReader()
        reader.onload = (event) => {
            var img = new Image()
            img.src = event.target.result
            img.onload = this.onImageReady(img.src)
        }
        var file = ev.target.files[0];
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            this.setState({
                imgSrc: [reader.result]
            })
        }.bind(this);
    }

    onImageReady = (img) => {
        this.setState(prevstate => {
            const { info } = this.state.note
            return {
                note: {
                    ...prevstate.note,
                    info: {
                        ...info,
                        url: img
                    }

                }
            }
        })
    }

    onExitEdit = () => {
        const fun = this.props.location.state.decrease
        fun()
        this.props.history.push('/note')
    }

    render() {
        const { note } = this.state
        const { type } = note
        if (!note) return <h1>Loading ... </h1>
        const { txt, title } = this.state.note.info
        return <form className="note-edit" onSubmit={this.onSubmit}>

            
            <label htmlFor="note-txt"></label>
            {type === "note-txt" && <textarea rows="50" cols="60" id="note-txt" name="description" value={txt} onChange={this.onChangeNote}>
                {txt}
            </textarea>}
            {type === "note-img" && <input id="note-txt" type="text" value={title} onChange={this.onChangeNote} />}
            {type === "note-img" && <img src={`${note.info.url}`} alt="" />}
            {type === "note-img" && <input type="file" accept="image/*" onChange={this.onChangeImage} />}
            <div>
            <select className=" " onChange={this.onSelectType} defaultValue={"note-txt"}>
                <option value="note-txt">txt</option>
                <option value="note-img">image</option>
                <option value="note-todos">todos</option>
            </select>
                <button>Save</button>
                <button className="exit-Bun" onClick={this.onExitEdit} >Close</button>
            </div>
        </form>
    }
}



