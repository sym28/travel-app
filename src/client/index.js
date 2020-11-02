import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import {myEvents} from './js/events'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'

console.log(checkForName);

export {
    checkForName,
    handleSubmit,
    myEvents
}

window.addEventListener('DOMContentLoaded', myEvents)

const date = new Date()

console.log(typeof date.getFullYear())
console.log(date.getMonth())
console.log(date.getDay())