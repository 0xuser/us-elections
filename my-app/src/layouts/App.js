import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Page from './Page.js'
import '../sass/App.sass'
import Sidebar from "react-sidebar";
import {NavLink} from 'react-router-dom'


const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        path: "http://46.41.151.95:5000/",
        sidebarDocked: mql.matches,
        sidebarOpen: false
      }

      this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
      this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

      this.linkList = [
        {name: "Kandydaci", path: "/", exact: true},
        {name: "Podsumowanie kandydatów", path: "/summary"},
        {name: "Wyszukiwania", path: "/search"},
        {name: "Ogólne", path: "/overall"},
    ]
    }

    componentWillMount() {
      mql.addListener(this.mediaQueryChanged);
    }
   
    componentWillUnmount() {
      this.state.mql.removeListener(this.mediaQueryChanged);
    }
   
    onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
    }
   
    mediaQueryChanged() {
      this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }
   
    handleClickCloseSideBar = () => {
      console.log("ok")
      this.setState(prevState => ({sidebarOpen: !prevState.sidebarOpen}));
    }
    
    

  render () {

    const singleItemList = this.linkList.map((item,index) => 
        <li className="nav__item" data-id={index} key={item.name}>
            <NavLink to={item.path} exact={item.exact ? item.exact : false} className='nav__link' activeClassName='nav__link--active' onClick={this.handleClickCloseSideBar}>
                <div className="nav__linkContainer">
                    <p className="nav__linkName">{item.name}</p>
                </div>
            </NavLink>
        </li>
    )

    return (  
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className={this.state.sidebarOpen ? 'app app--active' : 'app'}>
          <Sidebar
            sidebar={
                <>
                <i className="sidebar__closeIcon sidebar__closeIcon--active far fa-times-circle" onClick={this.handleClickCloseSideBar}></i>
                <h1 className="sidebar__title">Analysis of the US election campaign</h1>
                <nav className="sidebar__nav nav">
                    <ul className="nav__list">
                      {singleItemList}
                    </ul>
                </nav>
                <h2 className="sidebar__authors">Authors: Kantor Mateusz & Konecki Krystian</h2>
                </>}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            rootClassName="allSidebar"
            sidebarClassName="app__sidebar sidebar"
            onSetOpen={this.onSetSidebarOpen}
            overlayClassName="sidebar__overlay">
           <button onClick={() => this.onSetSidebarOpen(true)} className="sidebar__button fas fa-bars"></button>
        </Sidebar>
          <main className={`main ${this.state.active === false ? "main--active" : ""}`}>
            {<Page path={this.state.path}/>}
          </main>
        </div>
      </BrowserRouter>
  );
  }
}
 
export default App;