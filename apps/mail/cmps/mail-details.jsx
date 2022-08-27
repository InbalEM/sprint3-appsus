
import { mailService } from '../services/mail.service.js'

export class MailDetails extends React.Component {
    state = {
        mail: null,
        value: null
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

    componentWillUnmount() {


    }

    onDelete = (id) => {
        const onDeleteMailFunc = this.props.location.state.decrease
        onDeleteMailFunc(id)
        
        this.setState({ mail: null })

        this.onGoBack()
    }

    onGoBack = () => {
        const updateList = this.props.location.state.onUpdateList
        updateList(this.state.mail)
        this.props.history.push('/mail')
    }


    render() {

        const { mail } = this.state
        if (!mail) return <h1>Loading..</h1>

        return (
            <section className='main-details'>
                <div className='actions'>
                    <span onClick={() => this.onGoBack()} className="exit">X</span>
                    <span onClick={() => this.onDelete(mail.id)} style={{ marginInlineStart: '10px' }}><i className="fa-solid fa-trash"></i></span>
                </div>
                <div className='mail-content'>
                    <h1 className='from'><i className="fa-solid fa-user"></i>{mail.to}</h1>
                    <h1 className='subject'>{mail.subject}</h1>
                    <h3 className='body'>{mail.body}</h3>
                </div>
            </section>
        )
    }
}