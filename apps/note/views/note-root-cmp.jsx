import { NoteIndex } from "../views/note-index.jsx"

const { Route, Switch } = ReactRouterDOM

export function NoteApp() {

    return <section className="note-app">
            <Switch>
                <Route path="/note" component={NoteIndex} />
            </Switch>
    </section>

}