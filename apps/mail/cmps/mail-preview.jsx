
const { Link } = ReactRouterDOM
const { Route, NavLink } = ReactRouterDOM

import { MailDetails } from './mail-details.jsx'

export function MailPreview({ mail, onDeleteMail }) {

    function getTime(ms) {
        return
    }

    return <article className="flex space-between align-center">


        <p className="subject">{mail.subject}</p>
        <p>{mail.sentAt}</p>



    </article>


}









