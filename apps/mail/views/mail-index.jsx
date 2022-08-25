import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'
export class MailIndex extends React.Component {
    state = {
        mails: null,
    }

    componentDidMount = () => {
        this.loadMails()
    }

    loadMails = () => {
        mailService.query()
            .then(mails => this.setState({ mails }))
    }


    render() {
        const { mails } = this.state
        if (!mails) return <h1>Loading..</h1>
        return (
            <section className="mail-index">
                <MailList mails={mails} loadMails={this.loadMails} />
            </section>
        )
    }
}
