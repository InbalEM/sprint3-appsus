const { Link } = ReactRouterDOM
// const { Route, NavLink } = ReactRouterDOM
const { Route, Switch } = ReactRouterDOM

import { MailPreview } from './mail-preview.jsx'
import { MailDetails } from './mail-details.jsx'
import { mailService } from '../services/mail.service.js'


export function MailList({ mails , onDeleteMail}) {

    function checkRead(mail) {
        if (!mail.isRead) return 'read'
        return 'unread'
    }

    const onDelete = (id) => {
        // console.log(id)
       
        mailService.deleteEmail(id)
            .then(() => {
                
                onDeleteMail()
            })
    }

  
    
    function onSelectEmail() {
        console.log("lected")
    }

    return <section className="mail-app">
        <ul>
            {/* <div className={`trash `}><i className="fa-solid fa-trash-can"></i></d> */}
            {
                mails.map(mail =>
                    <li key={mail.id} className={`mail-list ${checkRead(mail)}`}>
                        <div className='mark-option '>
                            <span onClick={() => onDelete(mail.id)}><i className="fa-solid fa-trash"></i></span>
                            {/* <span><img src="../../../assets/css/apps/email/img/icons8-important-note-30.png" alt="" /></span> */}
                            <span className=".star-favorite">☆</span>
                            <input type="checkbox" id="select" name="select" value="select" />
                        </div>
                       <Link to={{
                        pathname: `/mail/${mail.id}`,
                        state: {decrease: onDeleteMail}
                        }}>
                            <div className="mail-preview" key={mail.id}>
                                <MailPreview mail={mail} />
                            </div>
                        </Link>
                        {/* <Route exsect path={`/mail/${mail.id}`} component={MailDetails} /> */}
                    </li>
                    
                )
            }
        </ul>
        <Switch>
        <Route path={`/mail/:mailId`} exact name="mail" component={MailDetails} />
        </Switch>
    </section >
}
