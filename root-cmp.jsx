import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailApp } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { NoteApp } from "./apps/note/views/note-root-cmp.jsx"
import { SideBar } from "./cmps/side-bar.jsx"
import { NoteEdit } from "./apps/note/cmps/note-edit.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {

    return <Router>
        
        <section className="app">
            <AppHeader />
            <Switch>
                <Route path="/mail" component={MailApp} />
                <Route path="/note" component={NoteApp} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
