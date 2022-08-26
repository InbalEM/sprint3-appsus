import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'
import { EmailFolderList } from '../cmps/email-folder-list.jsx'
import {ComposeMail} from '../cmps/compose-mail.jsx'

const { Link, NavLink, withRouter, UseLocation} = ReactRouterDOM
const { Route, Switch } = ReactRouterDOM

export class MailApp extends React.Component {
    state = {
        mails: null,
        filterBy: null
    }

    componentDidMount = () => {
        // console.log('didMount')
        this.loadMails()
    }

    loadMails = () => {
        console.log('from load')
        mailService.query(this.state.filterBy)
            .then(mails => this.setState({ mails }))
    }

    onDeleteMail = (id) => {
        //    this.loadMails()
        mailService.deleteEmail(id)
            .then(() => {
                this.loadMails()
            })
    }

    onSetFilterBy = (filterBy) => {
        // console.log(filterBy)
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }



    onSetFilter = (value) => {
        mailService.checkIsRead(value, this.state.mails)
            .then((mails) => this.setState({ mails: mails }))
    }

    onUpdateList = (mail) => {
        mailService.updateToRead(mail)
            .then(() => {
                this.loadMails()
            })
    }

    createMail = () => {

    }

    render() {
        const { mails } = this.state
        if (!mails) return <h1>Loading..</h1>
        console.log('rendered');
        return (<section>

            <section className="mail-index">
                <div>
                    <Link to={{
                        pathname: '/mail/compose',
                        state: {'create': this.createMail}
                        }}>
                    <div className='compose'><i className="fa-solid fa-pencil"></i>Compose</div></Link>
                    <EmailFolderList onSetFilter={this.onSetFilterBy} />
                </div>
                <MailList mails={mails} onDeleteMail={this.onDeleteMail} onSetFilter={this.onSetFilter} onUpdateList={this.onUpdateList} />

            </section>
            <Switch>
        <Route path={'/mail/compose'} exact name="compose" component={ComposeMail} />
        </Switch>
        </section>
        )
    }
}
