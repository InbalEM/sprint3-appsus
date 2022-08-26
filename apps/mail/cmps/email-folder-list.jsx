


export class EmailFolderList extends React.Component {

    state = {

    }

    filterBy = (value) => {
        console.log(value)
        const {onSetFilter} = this.props
        onSetFilter(value)
    }

    render() {
        return <section className="email-folder-list">
            <ul>
                <li  onClick={() => this.filterBy('inbox')}>inbox</li>
                <li  onClick={() => this.filterBy('sent')}>sent</li>
                <li  onClick={() => this.filterBy('trashed')}>trashed</li>
                <li  onClick={() => this.filterBy('starred')}>starred</li>
                <li  onClick={() => this.filterBy('important')}>important</li>
            </ul >
        </section >
    }

}