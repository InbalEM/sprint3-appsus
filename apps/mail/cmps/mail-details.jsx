
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
        // console.log(id)
        const onDeleteMailFunc = this.props.location.state.decrease
        onDeleteMailFunc(id)
        // mailService.deleteEmail(id)
        //     .then(() => {
                this.setState({ mail: null })
               
                this.onGoBack()
            // })
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
                <div>
                    <span onClick={() => this.onGoBack()}>X</span>
                    <span onClick={() => this.onDelete(mail.id)} style={{ marginInlineStart: '10px' }}><i className="fa-solid fa-trash"></i></span>
                </div>
                {/* <button onClick={() => this.goBack}>Back</button> */}
                <h1 className='subject'>subject: {mail.subject}</h1>
                <h3 className='body'>body: {mail.body}</h3>
            </section>
        )
    }
}