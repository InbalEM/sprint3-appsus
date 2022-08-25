export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            type: '',
            search: ''
        }
    }

    onFilterType = ({ target }) => {
        console.log('target:', target.value)
        const { value } = target.value
        this.setState(prevState => ({
            ...prevState.filterBy,
            type: value
        }))
    }

    render() {
        return <form className="note-filter">
            <p>filter</p>
            <select onChange={this.onFilterType}>
                <option value=""></option>
                <option value="note-txt">txt</option>
                <option value="note-img">image</option>
                <option value="note-todos">todos</option>
            </select>
        </form>

    }
}