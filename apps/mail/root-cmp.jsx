
import { MailIndex } from "./views/mail-index.jsx"
import { MailDetails } from "./cmps/mail-details.jsx"
import { SideBar } from "../../cmps/side-bar.jsx"
import { AppHeader } from "../../cmps/app-header.jsx"


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function MailApp() {
    return <Router>
        <section className="mail-app">
            <AppHeader />
            <div className="app-layout">
                <SideBar />
                <Switch>
                    <Route path="/mail/:mailId" component={MailDetails} />
                    <Route path="/" component={MailIndex} />
                </Switch>
            </div>
        </section>
    </Router>
}
