import React, {Component} from 'react';

class OverallPage extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: []
        }
    }
    render(){
        return ( 
            <div className="main__overallPage overall">
                <h2>Ogólne wyniki: </h2>
            </div> 
            );
    }
}
 
export default OverallPage;