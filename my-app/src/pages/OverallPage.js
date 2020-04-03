import React, {Component} from 'react';
import '../sass/OverallPage.sass'
import DaysPicker from '../components/DaysPicker.js'


class OverallPage extends Component {
    constructor(props) {
        super(props);
        this.state= {
                from: "",
                to: ""
        }
    }

    updateData = (from,to) => {
            this.setState({from: from.replace(/\//gi,"-"), to: to.replace(/\//gi,"-")})
    }


    render(){
        return ( 
            <div className="main__overallPage overall">
                <h2 className="overall__title">Ogólne wyniki</h2>
                <p className="overall__desc">Zakres wyników (data):</p>
                <div className="overall_dayPicker">
                    <DaysPicker updateData={this.updateData}/>
                </div>

            </div> 
            );
    }
}
 
export default OverallPage;