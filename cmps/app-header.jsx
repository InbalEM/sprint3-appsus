import { UserMsg } from './user-msg.jsx';

const { Link, NavLink, withRouter, UseLocation} = ReactRouterDOM
// import {useLocation} from 'react-router-dom';

export class AppHeader extends React.Component{


    state ={
        filterBy:{
            name: ''
        },

        location: window.location.href
    }

    componentDidMount = () => {
       

        console.log(this.state.location)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps.match.params)
        // if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
        //     this.loadMail()
        // }
    }

    handleChange = ({ target }) => {
        const field = target.id
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        })
        , () => {
            console.log(this.state.filterBy)
            // this.props.onSetFilter(this.state.filterBy)
        })
    }


    render(){
        const { name } = this.state.filterBy
    return <header className="app-header main-layout">
        <div >
        <Link to="/">
            <img src='../assets/img/Gmail_icon_(2020).svg.png' className='logo'></img><span className='logo-header'>Gmail</span>
        </Link>
        </div>

        <div>
            <input 
            type="text" 
            name="search-bar"
            id="name"
            placeholder='Search in mail'
            value={name}
            onChange={this.handleChange}
            />
        </div>

        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
        <UserMsg />
    </header>
    }
}
