import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import '../sass/CandidatsPageInfo.sass'

class CandidatSingleInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidate: []
        }
    }

    componentDidMount() {
        fetch(`${this.props.path}api/getUser/${this.props.id}`)
        .then(resp => resp.json())
        .then(data => {
            const bracketIndex = data.name.indexOf('(')
            let newName = ""
            if(bracketIndex !== -1) {
                newName=data.name.slice(0,bracketIndex-1)
                const copyCandidate = data;
                copyCandidate.name = newName;

                this.setState({candidate : copyCandidate})
            }
            else {
                this.setState({candidate : data})
            }

        })

            
    }

    checkIfContainsBrackets = () => {
        console.log(this.state.candidate)
        const bracketIndex = this.state.candidate[0].name.indexOf("(")
        let newName = "";

        if(bracketIndex !== -1) newName = this.state.candidate[0].name.slice(0,bracketIndex)
        else newName = this.state.candidate[0].name;

        return newName;
    }


    

    render() {
        const {candidate} = this.state
        const navLinkPropsPass = {"pathname": `/${this.state.candidate.id}`, aboutProps: {"id": this.state.candidate.id, "location": this.state.candidate.location, "name": this.state.candidate.name, "image": this.state.candidate.profile_image_full_url, "desc": this.state.candidate.description, "url": this.state.candidate.url, "prevPath": "/", "path": this.props.path, "twitter_name": this.state.candidate.twitter_name === "BernieSanders" ? "berniesanders" : this.state.candidate.twitter_name }}
        
        return (
            <div className={`candidats__single candidat ${candidate.name === "Donald J. Trump" ? "candidat--big" : ""}`}>
                <div className="candidat__imgContainer">
                    <img src={candidate.profile_image_full_url} alt="Candidate img" className="candidat__image"/>
                </div>
                <div className="candidat__personalInfo">
                    <h2 className="candidat__name">{candidate.name}</h2>
                    <h3 className="candidat__location">{candidate.location}</h3>
                    <p className="candidat__desc">{candidate.description}</p>
                    <NavLink to={navLinkPropsPass} className="candidat__more">Więcej informacji  </NavLink>
                </div>
            </div>
        )
    }


}
 
export default CandidatSingleInfo;