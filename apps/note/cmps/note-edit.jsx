
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
        console.log('noteId:', noteId)
        notesService.getById(noteId).then(note => {
            console.log('note:', note)
            this.setState({ note })
        })
    }

    onSelectType = ({ target }) => {
        const { value } = target
        console.log('value:', value)
        this.setState(prevstate => {
            const { info } = this.state.note
            if (value === "note-img") {
                return {
                    note: {
                        ...prevstate.note,
                        type: value,
                        info: {
                            title: info.txt,
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
                            txt: info.title
                        }

                    }
                }
            }
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
        const { note } = this.state
        notesService.saveNote(note)
            .then(() => {
                this.props.history.push('/note')
                const fun = this.props.location.state.decrease
                fun()
            })
    }
     doUploadImg =(imgDataUrl, onSuccess)=> {

        const formData = new FormData();
        formData.append('img', imgDataUrl)
    
        fetch('//ca-upload.com/here/upload.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.text())
            .then((url) => {
                console.log('Got back live url:', url);
                onSuccess(url)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    onChangeImage = (ev) => {
        // console.log('onChangeImage', target.files[0].name)
        // const img = event.target.files[0].name
        // const urlImg = URL.createObjectURL(img)
        // console.log('urlImg:', urlImg)

        // var reader = new FileReader()
        // reader.onload = (event) => {
        //     var img = new Image()
        //     img.src = event.target.result
        //     this.doUploadImg(img.src, onSuccess)
        //     // img.onload = onImageReady.bind(null, img)
        //     console.log('img.src:', img.src)
        // }
        // reader.readAsDataURL(ev.target.files[0])
        // console.log('reader:',reader )
        // this.setState(prevState => {
        //     const { info } = this.state.note

        //     return {
        //         note: {
        //             ...prevstate.note,
        //             type: value,
        //             info: {
        //                 ...info,
        //                 url: 
        //             }
        //         }
        //     }
        // })

var reader = new FileReader()

    reader.onload = (event) => {
        var img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0])
        


    }

    render() {
        const { note } = this.state
        const { type } = note
        if (!note) return <h1>Loading ... </h1>
        const { txt } = this.state.note.info
        console.log('txt:', txt)
        return <form onSubmit={this.onEditNote}>
            <h1>edit</h1>
            <select onChange={this.onSelectType} defaultValue={"note-txt"}>
                <option value="note-txt">txt</option>
                <option value="note-img">image</option>
                {/* <option value="note-todos">todos</option> */}
            </select>

            <label htmlFor="note-txt"></label>
            <input id="note-txt" type="text" value={txt} onChange={this.onChangeNote} />

            {/* {type==="note-img" && <input type="file" multiple accept= "image/*" onChange={this.onChangeImage} />} */}
            {type === "note-img" && <input type="file" accept="image/*" onChange={this.onChangeImage} />}



            <button>Save</button>
        </form>
    }
}