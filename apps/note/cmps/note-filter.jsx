export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            type: '',
            search: ''
        }
    }

    onFilterType = ({ target }) => {
        const {value} = target
        this.setState(prevState => ({
            filterBy: {
                ...prevState.filterBy,
                type: target.value
            }
        }),()=>{
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render() {
        return <form className="note-filter">
            <p>filter</p>
            <select onChange={this.onFilterType}>
                <option value="">All</option>
                <option value="note-txt">txt</option>
                <option value="note-img">image</option>
                <option value="note-todos">todos</option>
            </select>
        </form>

    }
}