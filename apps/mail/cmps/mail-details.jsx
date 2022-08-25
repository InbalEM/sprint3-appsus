
import { mailService } from '../services/mail.service.js'


export class MailDetails extends React.Component {
    state = {
        mail: null
    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getMailById(mailId)
            .then((mail) => {
                if (!mail) return
                // this.onGoBack()
                this.setState({ mail })
            })
    }

    onDelete = (id) => {
        mailService.deleteEmail(id)
            .then(() => {
                this.setState({ mail: null })
                this.props.location.state.loadMails()
                this.props.history.push('/mail')
            })
    }

    render() {
        const { mail } = this.state
        if (!mail) return <h1>Loading..</h1>
        return (
            <section className='main-details'>

                <i class="fa-solid fa-trash-can" onClick={() => this.onDelete(mail.id)}></i>

                <h1 className='subject'>subject: {mail.subject}</h1>
                <h3 className='body'>body: {mail.body}</h3>
            </section>
        )
    }
}