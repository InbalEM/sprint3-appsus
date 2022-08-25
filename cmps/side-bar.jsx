
const { Link, NavLink, withRouter } = ReactRouterDOM

export function SideBar() {

    return <section className="side-bar">
        <Link to="/">
            <h3>LOGO!</h3>
        </Link>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </section>
}
