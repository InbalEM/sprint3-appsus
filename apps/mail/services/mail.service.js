'use strict'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    query,
    getMailById,
    deleteEmail
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
            emails.push(createMail())
        }
    }

    if (filterBy) {
        let { name } = filterBy
        console.log('filterBy from service', filterBy);
        emails = emails.filter(email => (
            email.subject.includes(name)
        ))
    }
    
    _saveToStorage(emails)
    gEmails = emails
    console.log(emails);
    return Promise.resolve(emails)
}



function createMail() {
    return {
        id: utilService.makeId(),
        subject: 'nsadfd adsd!',
        body: utilService.makeLorem(),
        isRead: utilService.getRandomIntInclusive(0, 1) ? true : false,
        sentAt: new Date().toLocaleTimeString(),
        to: 'momo@momo.com'
    }
}


function getMailById(id) {
    const mail = gEmails.find(mail => mail.id === id)
    console.log(mail);
    return Promise.resolve(mail)
}

function deleteEmail(id) {
    // let emails = gEmails
    console.log(id);
    let emails = _loadFromStorage()
    console.log(emails)
    emails = emails.filter(email => email.id !== id)
    console.log(emails)
    _saveToStorage(emails)
    return Promise.resolve(emails)
}

function _saveToStorage(emails) {
    storageService.saveToStorage(KEY, emails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

