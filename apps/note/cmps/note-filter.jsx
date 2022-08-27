export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            type: '',
            search: ''
        }
    }

    onFilterType = (selectedVal) => {
        console.log('ev:', selectedVal)
        this.setState(prevState => ({
            filterBy: {
                ...prevState.filterBy,
                type: selectedVal
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })

    }
    // onFilterType = ({ target }) => {
    //     const {value} = target
    //     this.setState(prevState => ({
    //         filterBy: {
    //             ...prevState.filterBy,
    //             type: target.value
    //         }
    //     }),()=>{
    //         this.props.onSetFilter(this.state.filterBy)
    //     })
    // }

    render() {
        const { onFilterType } = this
        return <section className="side-bar note-filter">
            <ul>
                <li onClick={() => onFilterType("")} value="">notes</li>
                <li onClick={() => onFilterType("note-txt")} >text notes</li>
                <li onClick={() => onFilterType("note-img")} >image notes</li>
                <li onClick={() => onFilterType("note-todos")} >todos notes</li>
            </ul>
        </section>
    }
}