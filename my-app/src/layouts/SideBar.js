import React from 'react';
import {NavLink} from 'react-router-dom'
import '../sass/SideBar.sass'

const linkList = [
    {name: "Describe", path: "/", exact: true},
    {name: "Tag analysis", path: "/tags"},
    {name: "Users", path: "/users"},
    {name: "Portfolio", path: "/other"},
]


const SideBar = (props) => {
    const singleItemList = linkList.map((item,index) => 
        <li className="nav__item" data-id={index} key={item.name}>
            <NavLink to={item.path} exact={item.exact ? item.exact : false} className='nav__link' activeClassName='nav__link--active'>
                <div className="nav__linkContainer">
                    <p className="nav__linkName">{item.name}</p>
                </div>
            </NavLink>
        </li>
    )
    


    return ( 
        <>
        <i className="sidebar__closeIcon sidebar__closeIcon--active far fa-times-circle" onClick={props.handleClick}></i>
        <h1 className="sidebar__title">Analysis of the US election campaign</h1>
        <nav className="sidebar__nav nav">
            <ul className="nav__list">
              {singleItemList}
            </ul>
        </nav>
        <h2 className="sidebar__authors">Authors: Kantor Mateusz & Konecki Krystian</h2>
        </>
     );
}
 
export default SideBar;