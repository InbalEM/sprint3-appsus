
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
        console.log(mailId)
        mailService.getMailById(mailId)
            .then((mail) => {
                if (!mail) return
                // this.onGoBack()
                this.setState({ mail })
            })
    }


    componentDidUpdate(prevProps, prevState) {
        
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadMail()
        }
    }

    onDelete = (id) => {
        // console.log(id)
        const deleteFunc = this.props.location.state.decrease
        mailService.deleteEmail(id)
            .then(() => {
                this.setState({ mail: null })
                deleteFunc()
                this.props.history.push('/mail')
            })
    }

    onGoBack = () => {
        this.props.history.push('/mail')
    }


    render() {
       
        const { mail } = this.state
        if (!mail) return <h1>Loading..</h1>
        
        return (
            <section className='main-details'>
                <div>
                <span onClick={() => this.onGoBack()}>X</span>
                <span onClick={() => this.onDelete(mail.id)} style={{marginInlineStart: '10px'}}><i className="fa-solid fa-trash"></i></span>
                </div>
                {/* <button onClick={() => this.goBack}>Back</button> */}
                <h1 className='subject'>subject: {mail.subject}</h1>
                <h3 className='body'>body: {mail.body}</h3>
            </section>
        )
    }
}