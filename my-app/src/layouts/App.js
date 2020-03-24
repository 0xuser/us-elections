import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import SideBar from './SideBar.js'
import Page from './Page.js'
import '../sass/App.sass'


class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        active: false,
        path: "http://46.41.151.95:5000/"
      }
    }

    handleClick = () => {
      this.setState(prevState => {return {active: !prevState.active}})
    }

    
    

  render () {
    return (  
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="app">
          <i className={`app__bar fas fa-bars ${this.state.active === false ? "app__bar--active" : ""}`} onClick={this.handleClick}></i>
          <div className={`sidebar ${this.state.active ? "sidebar--active" : ""}`}>
            {<SideBar  handleClick={this.handleClick}/>}
          </div>
          <main className={`main ${this.state.active === false ? "main--active" : ""}`}>
            {<Page path={this.state.path}/>}
          </main>
        </div>
      </BrowserRouter>
  );
  }
}
 
export default App;