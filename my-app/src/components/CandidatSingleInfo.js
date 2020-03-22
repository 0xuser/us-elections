import React, {Component} from 'react';
import '../sass/CandidatsPageInfo.sass'

class CandidatSingleInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidate: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/getUser/${this.props.id}`)
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
        return (
            <div className={`candidats__single candidat ${candidate.name === "Donald J. Trump" ? "candidat--big" : ""}`}>
                <h2 className="candidat__name">{candidate.name}</h2>
                <img src={candidate.profile_image_url} alt="Candidate img" className="candidat__image"/>
                <p className="candidat__desc">{candidate.description}</p>
            </div>
        )
    }


}
 
export default CandidatSingleInfo;