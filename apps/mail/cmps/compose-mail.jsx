
import { mailService } from "../services/mail.service"

export class ComposeMail extends React.Component {

    state = {
        newMail: {
            email: null,
            subject: null,
            body: null
        }
    }

    onSubmit = () => {
        const createFunc = this.props.location.state.createMail
        createFunc(this.state.newMail)
        this.props.history.push('/mail')
    }

    handleChange = ({target}) => {
        const field = target.id
        const value = target.value
        this.setState((prevState) => ({
            newMail: {
                ...prevState.newMail,
                [field]: value
            }
        }))
    }

    onGoBack = () => {
       
        this.props.history.push('/mail')
    }



    render() {
        const { email, subject, body } = this.state
        return <section>
            <form onSubmit={() => this.onSubmit()} className='new-mail'>
                <div onClick={() =>  this.onGoBack()} className="exit">X</div>
                <input
                    type="email"
                    name="email-address"
                    id="email"
                    placeholder="To"
                    value={email}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="email-subject"
                    id="subject"
                    placeholder="Subject"
                    value={subject}
                    onChange={this.handleChange}
                />
                <textarea
                    name="body"
                    id="body"
                    cols="30"
                    rows="10"
                    value={body}
                    onChange={this.handleChange}
                ></textarea>
                <button className="send-btn">Send</button>
            </form>
        </section>
    }
}