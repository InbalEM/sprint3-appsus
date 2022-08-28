'use strict'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    query,
    getMailById,
    deleteEmail,
    checkIsRead,
    updateToRead,
    createMail,
    markStar,
}

const KEY = 'emailsDB'

let gEmails

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query(filterBy) {
    let emails = _loadFromStorage()
    // let emails

    if (!emails) {
        emails = []
        for (let i = 0; i < 10; i++) {
            emails.push(create())
            _saveToStorage(emails)
        }
    }


    if (filterBy) {
        // let { name } = filterBy
        switch (filterBy) {
            case 'inbox':
                console.log('filterBy from service', filterBy);
                emails = emails.filter(email => (
                    email.to === loggedinUser.email && !email.isTrashed
                ))
                break;
            case 'starred':
                console.log('filterBy from service', filterBy);
                emails = emails.filter(email => (
                    email.isStarred === true && !email.isTrashed
                ))
                break;
            case 'sent':
                console.log('filterBy from service', filterBy);
                emails = emails.filter(email => (
                    email.to !== loggedinUser.email && !email.isTrashed
                ))
                break;
            case 'trashed':
                console.log('filterBy from service', filterBy);
                emails = emails.filter(email => (
                    email.isTrashed === true
                ))
                break;

            default:
                break;
        }
    }

    gEmails = emails
    console.log(emails);
    return Promise.resolve(emails)
}


function create(){
    return{
        id: utilService.makeId(),
        subject: utilService.makeLorem(20),
        body: utilService.makeLorem(20),
        isRead: utilService.getRandomIntInclusive(0,1) > 0.5 ? true : false,
        isStarred: false,
        isTrashed: false,
        sentAt: new Date().toLocaleTimeString(),
        to: 'momo@gmail.com'
    }
}


function createMail({subject, body, email}) {
    const newMail = {
        id: utilService.makeId(),
        subject: subject,
        body: body,
        isRead: (email !== loggedinUser.email) ? true : false,
        isStarred: false,
        isTrashed: false,
        sentAt: new Date().toLocaleTimeString(),
        to: email
    }

    gEmails.push(newMail)

    _saveToStorage(gEmails)
    return Promise.resolve()

}


function getMailById(id) {
    const mail = gEmails.find(mail => mail.id === id)
    return Promise.resolve(mail)
}

function deleteEmail(id) {
    // let emails = gEmails
    let mails = _loadFromStorage()

    mails = mails.map(
        mail => mail.id === id
            ? { ...mail, isTrashed: true }
            : mail
    )

    // const unTrashMails = mails.filter(mail => (!mail.isTrashed) )
    
    _saveToStorage(mails)
    return Promise.resolve()
}

function updateToRead(email) {
    let mails = _loadFromStorage()
    mails = mails.map(
        mail => mail.id === email.id
            ? { ...mail, isRead: true }
            : mail
    )
    console.log('email from update:', mails)
    _saveToStorage(mails)

    return Promise.resolve()
}

function checkIsRead(value) {
    let mails = gEmails
    if (value === 'read') { mails = mails.filter(mail => (mail.isRead)) }
    else if (value === 'unread') { mails = mails.filter(mail => (mail.isRead === false)) }

    console.log(mails)
    
    return Promise.resolve(mails)
}

function markStar(id){
    let emails = _loadFromStorage()
    console.log('star')
    emails =  emails.map(
        mail => mail.id === id
            ? { ...mail, isStarred: !mail.isStarred}
            : mail
    )
   _saveToStorage(emails)
   return Promise.resolve()
}

function _saveToStorage(emails) {
    storageService.saveToStorage(KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

