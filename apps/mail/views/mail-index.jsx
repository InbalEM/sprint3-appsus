import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'
export class MailApp extends React.Component {
    state = {
        mails: null,
        filterBy: null
    }

    componentDidMount = () => {
        // console.log('didMount')
        this.loadMails()
    }

    loadMails = () => {
        mailService.query(this.state.filterBy)
            .then(mails => this.setState({ mails }))
    }

    onDeleteMail = () => {
       this.loadMails()
    }

    onSetFilter = (filterBy) => {
        // console.log(filterBy)
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }

    render() {
        const { mails } = this.state
        if (!mails) return <h1>Loading..</h1>
        console.log('rendered');
        return (
            <section className="mail-index">
                <ul>
                    <li>inbox</li>
                    <li>starred</li>
                    <li>important</li>
                </ul>
                <MailList mails={mails} onDeleteMail={this.onDeleteMail} />

            </section>
        )
    }
}
