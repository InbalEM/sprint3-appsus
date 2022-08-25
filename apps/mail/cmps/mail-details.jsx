
import { mailService } from '../services/mail.service.js'


export class MailDetails extends React.Component {
    state = {
        mail: null
    }

    componentDidMount() {
        console.log('this.props:', this.props)
        this.loadMail()
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        console.log(mailId)
        mailService.getMailById(mailId)
            .then((mail) => {
                if (!mail) return
                // this.onGoBack()
                this.setState({ mail })
            })
    }


    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps.match.params.mailId)
        console.log(this.props.match.params.mailId)
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadMail()
        }
    }

    onExit = (id) => {
        // console.log(id)
        mailService.deleteEmail(id)
            .then(() => {
                this.setState({ mail: null })

                this.props.history.push('/mail')
            })
    }

    render() {
        const { mail } = this.state
        if (!mail) return <h1>Loading..</h1>
        return (
            <section className='main-details'>

                <span onClick={() => this.onExit(mail.id)}>X</span>
                {/* <button onClick={() => this.goBack}>Back</button> */}
                <h1 className='subject'>subject: {mail.subject}</h1>
                <h3 className='body'>body: {mail.body}</h3>
            </section>
        )
    }
}