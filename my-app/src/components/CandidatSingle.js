import React from 'react';
import {NavLink} from 'react-router-dom'
import "../sass/CandidatSingle.sass"

const CandidatSingle = (props) => {
    console.log(props)
    return ( 
        <div className="candidatSingle">
           <NavLink to="/" className="candidatSingle__back fas fa-chevron-circle-left"/>
            <img src={props.image} alt="Candidat img" className="candidatSingle__image"/>
            <h2 className="candidatSingle__name">{props.name}</h2>
            <div className="candidatSingle__container">
                <p className="candidatSingle__location">{props.location}</p>
                <p className="candidatSingle__desc">{props.desc}</p>
    <p className="candidatSingle__profile"><span className="candidatSingle__profile--bold">Profil: </span><a href={props.url}>{props.url}</a></p>
            </div>
        </div>
     );
}
 
export default CandidatSingle;