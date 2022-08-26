
import { mailService } from '../services/mail.service.js'

export class EmailFilter extends React.Component {
    state = {
        filter: null
    }

    onSetFilter = (event) => {
      this.props.onSetFilter(event.target.value)
        
    }

    render() {
        return (
            <select className='side-bar mail-filter' onChange={this.onSetFilter}>
                <option value=""></option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        )
    }
}