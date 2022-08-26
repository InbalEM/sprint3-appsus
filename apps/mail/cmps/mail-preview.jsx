
const { Link } = ReactRouterDOM
const { Route, NavLink } = ReactRouterDOM
import { LongTxt } from "./long-text.jsx"


import { MailDetails } from './mail-details.jsx'

export class MailPreview extends React.Component {

    state={

        isLongTxtShown: null,
    }

    getTime =(ms)=> {
        return
    }

    setIsExpanded = (isLongTxtShown) => {
        this.setState({ isLongTxtShown: isLongTxtShown })
    }

    render(){
        const { mail, onDeleteMail } = this.props
    return( 
    <article className="flex space-between align-center">

        <div className="subject"><LongTxt text={mail.subject} isLongTxtShown={this.state.isLongTxtShown} descriptionLength={10} setIsExpanded={this.setIsExpanded}/></div>

        <div><LongTxt text={mail.body} isLongTxtShown={this.state.isLongTxtShown} descriptionLength={100} setIsExpanded={this.setIsExpanded}/></div>
        <p>{mail.sentAt}</p>
    </article>
    )
    }


}









