import React, { Component } from 'react';
import CandidatSingleInfo from '../components/CandidatSingleInfo'
import '../sass/CandidatsPage.sass'


class CandidatsPage extends Component {
    constructor(props){
        super(props);
        this.state= {
            candidats: []
        }
    }


    componentDidMount = () => {
        fetch("http://localhost:5000/api/getTrackedUsers")
        .then(resp => resp.json())
        .then(data => {
            const candidates = [];

            data.forEach(single => candidates.push(single))
            this.setState({candidats: candidates}) 
        });   
    }


    render () {
        const singleCandidat = this.state.candidats.map((single,index) => <CandidatSingleInfo key={index} id={single.username_id}/>)

        return ( 
        <div className="main__candidatsPage candidats">
            <h2 className="candidats__title">Aktualni kandydaci na prezydenta USA</h2>
            <div className="candidats__container">
                {singleCandidat}
            </div>
        </div>
        );
    }
}


export default CandidatsPage