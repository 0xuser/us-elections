import React, { Component} from 'react';
import {NavLink} from 'react-router-dom'
import "../sass/CandidatSingle.sass"
import SingleChartPie from'./SingleChartPie'

class CandidatSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch(`${this.props.path}api/getUsersAnalysissOverall`)
        .then(resp => resp.json())
        .then(data => {
            const dataArray= [];
            data[0].data.forEach(single => {
                 if(single[this.props.twitterName] !== undefined) 
                    dataArray.push(single[this.props.twitterName]);
            })
            this.setState({data: dataArray})
        })
    }

    render(){
        return ( 
            <div className="candidatSingle">
            <NavLink to="/" className="candidatSingle__back fas fa-chevron-circle-left"/>
                <img src={this.props.image} alt="Candidat img" className="candidatSingle__image"/>
                <h2 className="candidatSingle__name">{this.props.name}</h2>
                <div className="candidatSingle__container">
                    <p className="candidatSingle__location">{this.props.location}</p>
                    <p className="candidatSingle__desc">{this.props.desc}</p>
                    <p className="candidatSingle__profile"><span className="candidatSingle__profile--bold">Profil: </span><a href={this.props.url}>{this.props.url}</a></p>
                </div>
                <div className="candidatSingle__chartsContainer charts">
                    {this.state.data.length !== 0 ? 

                    <SingleChartPie title="Wykres pozyztywne/negatywne/neutralne" data={[{"name": "classified_negative", "value": this.state.data[0].classified_negative}, {"name": "classified_neutral", "value": this.state.data[0].classified_neutral}, {"name": "classified_positive", "value": this.state.data[0].classified_positive}]}/>
                    
                    : ""}
                </div>
            </div>
        );
    }
}
 
export default CandidatSingle;