const { Link } = ReactRouterDOM
const { Route, NavLink } = ReactRouterDOM

import { MailPreview } from './mail-preview.jsx'
import { MailDetails } from './mail-details.jsx'

export function MailList({ mails, onDeleteMail }) {

    function checkRead(mail) {
        if (!mail.isRead) return 'read'
        return 'unread'
    }

    function onSelectEmail() {
        console.log("lected")
    }

    return <section className="mail-app">
        <ul>
            {/* <div className={`trash `}><i className="fa-solid fa-trash-can"></i></d> */}
            {
                mails.map(mail =>
                    <li key={mail.id} className="mail-list">
                        <div className='mark-option '>
                            <p onClick={() => onDeleteMail(mail.id)}>del</p>
                            {/* <span><img src="../../../assets/css/apps/email/img/icons8-important-note-30.png" alt="" /></span> */}
                            <span className=".star-favorite">☆</span>
                            <input type="checkbox" id="select" name="select" value="select" />
                        </div>
                        <div><Link to={`/mail/${mail.id}`}>
                            <div className={`mail-preview ${checkRead(mail)}`} key={mail.id}>
                                <MailPreview mail={mail} />
                            </div>
                        </Link></div>
                        {/* <Route exsect path={`/mail/${mail.id}`} component={MailDetails} /> */}
                    </li>
                    
                )
            }
        </ul>
        <Route path={`/mail/:mailId`} component={MailDetails} />
    </section >
}
