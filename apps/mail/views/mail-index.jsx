import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'
export class MailApp extends React.Component {
    state = {
        mails: null,
    }

    componentDidMount = () => {
        // console.log('didMount')
        this.loadMails()
    }

    loadMails = () => {
        mailService.query()
            .then(mails => this.setState({ mails }))
    }

    

    onDeleteMail = (id) => {
        console.log(id)
        mailService.deleteEmail(id)
            .then(mails => this.setState({ mails }))
    }

    onClickMail = (id) => {
        console.log(id)
    }

    componentDidUpdate = () => {
        console.log('from mailapp:')
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
