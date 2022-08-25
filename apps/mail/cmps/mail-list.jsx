const { Link } = ReactRouterDOM

import { MailPreview } from './mail-preview.jsx';
export function MailList({ mails, loadMails }) {

    function checkRead(mail) {
        if (!mail.isRead) return 'read'
        return 'unread'
    }


    return <section className="main-app">
        <ul>
            {
                mails.map(mail =>

                    <Link to={{ pathname: "/mail/" + mail.id, state: { loadMails: loadMails } }}>
                        <li className={`mail-preview ${checkRead(mail)}`} key={mail.id}>
                            <MailPreview mail={mail} />
                        </li></Link>
                )
                // <div className='main-app'><ul>{mails.map(mail => <li key={mail.id}><p>sadf</p> <p>{mail.subject}</p></li>)}</ul></div>
            }



        </ul>

    </section >
}
{/* <Link to={{
    pathname: '/Content/' + this.props.index
   state: { decrease: this.props.decreaseIndexProject }
}}>Page n°1</Link> */}