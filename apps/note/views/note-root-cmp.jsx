import { AppHeader } from "../../../cmps/app-header.jsx"
import { NoteIndex } from "../views/note-index.jsx"
import { NoteEdit } from "../cmps/note-edit.jsx"
import { SideBar } from "../../../cmps/side-bar.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function NoteApp() {
    return  <section className="note-app">
            {/* <AppHeader /> */}
            {/* <div className="app-layout"> */}
                {/* <SideBar /> */}
                <Switch>
                    <Route path="/note/edit/:noteId?" component={NoteEdit} />
                    <Route path="/note/edit" component={NoteEdit} />
                    <Route path="/note" component={NoteIndex} />
                </Switch>
            {/* </div> */}
        </section>
}