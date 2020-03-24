import React, { Component } from 'react';
import CandidatSingleInfo from './CandidatSingleInfo'
import '../sass/CandidatsPage.sass'
import WhiteHouse from "../images/WhiteHouse.png"

class CandidatsPage extends Component {
    constructor(props){
        super(props);
        this.state= {
            candidats: []
        }
    }


    componentDidMount = () => {
        fetch(`${this.props.path}api/getTrackedUsers`)
        .then(resp => resp.json())
        .then(data => {
            const candidates = [];

            data.forEach(single => candidates.push(single))
            this.setState({candidats: candidates}) 
        });   
    }


    render () {
        const singleCandidat = this.state.candidats.map((single,index) => <CandidatSingleInfo key={index} id={single.username_id} path={this.props.path}/>)

        return ( 
        <div className="main__candidatsPage candidats">
            <img className="candidats__whiteH" src={WhiteHouse} alt="White House"/>
            <h2 className="candidats__title">Kto zostanie prezydentem Prezydentem Stanów Zjednoczonych w 2020r. ?</h2>
            <div className="candidats__container">
                {singleCandidat}
            </div>
        </div>
        );
    }
}


export default CandidatsPage