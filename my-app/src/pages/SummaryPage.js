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

    generateDataToOverallChart = () => {
        const chartData = [];

        this.state.data.forEach(single => 
        chartData.push({"title": "Ogólna charakterystyka","name": single.name, "clas_poz": single.results.classified_positive, 
                      "clas_neu": single.results.classified_neutral, 
                    "clas_neg": single.results.classified_negative})
        )
        return chartData
    }

    generateDataToOverallChart_NoRetweets = () => {
        const chartData = [];

        this.state.data.forEach(single => 
        chartData.push({"title": "Ogólna charakterystyka bez retweetów","name": single.name, 
                        "clas_poz_re": single.results.classified_positive_without_retweets, 
                        "clas_neu_re": single.results.classified_neutral_without_retweets, 
                        "clas_neg_re": single.results.classified_negative_without_retweets})
        )
        return chartData
    }

    generateDataToOverallChart_All = () => {
        const chartData = [];

        this.state.data.forEach(single => 
        chartData.push({"title": "Ogólna liczba","name": single.name, 
                        "col_tweets": single.results.collected_tweets - single.results.retweets_in_collected, 
                        "col_retweets": single.results.retweets_in_collected})
        )
        return chartData
    }

    render(){
    
            return ( 
                <div className="main__summaryPage summary">
                    <h2 className="summary__title">Podsumowanie kandydatów: </h2> 
                    <div className="summary__container">
                        {this.state.data.length !== 0 ?
                            <>
                                <SingleChartBar data={this.generateDataToOverallChart()}/>
                                <SingleChartBar data={this.generateDataToOverallChart_NoRetweets()}/>
                                <SingleChartBar data={this.generateDataToOverallChart_All()}/>
                            </>
                        : "" }
                    </div>
                </div>
                );
    }
}
 
export default SummaryPage;