


export class EmailFolderList extends React.Component {

    state = {

    }

    filterBy = (value) => {
        console.log(value)
        const {onSetFilter} = this.props
        onSetFilter(value)
    }

    render() {
        return <section className="side-bar ">
            <ul>
                <li  onClick={() => this.filterBy('inbox')}><i className="fa-solid fa-inbox"></i> inbox</li>
                <li  onClick={() => this.filterBy('sent')}><i className="fa-solid fa-paper-plane"></i> sent</li>
                <li  onClick={() => this.filterBy('trashed')}><i className="fa-solid fa-trash"></i> trashed</li>
                <li  onClick={() => this.filterBy('starred')}><i className="fa-regular fa-star"></i> starred</li>
                {/* <li  onClick={() => this.filterBy('important')}>important</li> */}
            </ul >
        </section >
    }

}