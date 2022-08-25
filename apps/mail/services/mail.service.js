'use strict'
import { storageService } from '../../../services/storage.service.js'
export const mailService = {
    query,
    getMailById,
    deleteEmail
}

const KEY = 'emailsDB'

const gEmails = [{
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: new Date().toLocaleTimeString(),
    to: 'momo@momo.com'
},
{
    id: 'e102',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: true,
    sentAt: new Date().toLocaleTimeString(),
    to: 'momo@momo.com'
}]

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function query() {
    let emails = _loadFromStorage()
    if (!emails) {
        let emails = gEmails
        _saveToStorage(emails)
    }
    console.log(emails);
    return Promise.resolve(emails)
}


function getMailById(id) {
    const mail = gEmails.find(mail => mail.id === id)
    return Promise.resolve(mail)
}

function deleteEmail(id) {
    // let emails = gEmails
    // console.log(emails);
    let emails = _loadFromStorage()
    // console.log(emails)
    emails = emails.filter(email => email.id !== id)
    console.log(emails)
    _saveToStorage(emails)
    return Promise.resolve()
}

function _saveToStorage() {
    storageService.saveToStorage(KEY, gEmails)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

