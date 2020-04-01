import React, {Component} from 'react';
import SingleChartBar from '../components/SingleChartBar'
import '../sass/SummaryPage.sass'


class SummaryPage extends Component{
    constructor(props){
        super(props);
        this.state= {
            data: []
        }
    }

    componentDidMount = () => {
        fetch(`${this.props.path}api/getUsersAnalysissOverall`)
        .then(resp => resp.json())
        .then(data => {
            const dataArr = [];
            const tags = ["realDonaldTrump", "JoeBiden", "berniesanders"]
            data[0].data.forEach(single => {
                tags.forEach(ele => {
                    if(single[ele] !== undefined) dataArr.push({name: ele, results: single[ele]})
                })
            })
            this.setState({data: dataArr}) 
        });   
    }

    render(){
        const renderdCharts = this.state.data.map((single,index) =>  
            <SingleChartBar key={index} data={{ 
                                   candidat: single.name, 
                                   clas_poz: single.results.classified_positive, 
                                   clas_neu: single.results.classified_neutral, 
                                   clas_neg: single.results.classified_negative, 
                                   clas_poz_re: single.results.classified_positive_without_retweets, 
                                   clas_neu_re: single.results.classified_neutral_without_retweets, 
                                   clas_neg_re: single.results.classified_negative_without_retweets,
                                   col_tweets: single.results.collected_tweets,
                                   col_retweets: single.results.retweets_in_collected 
                                }}/>     
            )
            return ( 
                <div className="main__summaryPage summary">
                    <h2 className="summary__title">Podsumowanie kandydatów: </h2> 
                    <div className="summary__container">
                        {renderdCharts}
                    </div>
                </div>
                );
    }
}
 
export default SummaryPage;