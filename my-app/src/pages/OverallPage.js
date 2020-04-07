import React, {Component} from 'react';
import '../sass/OverallPage.sass'
import DaysPicker from '../components/DaysPicker.js'


class OverallPage extends Component {
    constructor(props) {
        super(props);
        this.state= {
                from: "",
                to: "", 
                trackedS: [],
                data: []
        }
    }

    componentDidMount(){
        fetch(`${this.props.path}api/getTrackedSearches`)
        .then(resp => resp.json())
        .then(data => {
            const tags = [];
            data.forEach(single => {
                tags.push(single.search)
            })
            this.setState({trackedS: tags})
        })
    }

     updateData = (from,to) => {
            const fromVal = from.split('/').reverse().join("-")
            const fromDay = fromVal.slice(5,7)
            const fromYear = fromVal.slice(0,4)
            const fromMonth = fromVal.slice(8,10)
            const reverseFrom = `${fromYear}-${fromMonth}-${fromDay}`
    
            const toVal = to.split('/').reverse().join("-")
            const toDay = toVal.slice(5,7)
            const toYear = toVal.slice(0,4)
            const toMonth = toVal.slice(8,10)
            const reverseTo = `${toYear}-${toMonth}-${toDay}`

            const dat1 = [];

            this.state.trackedS.forEach(single => {
                const collectedTweets = [];
                const collecredRetweets = []
                const averageSentimentPolarity = [];
                const averageSentimentPolarityWithoutRetweets = [];
                const averageSentimentSubjectivity = [];
                const countPositive = [];
                const countNegative = [];
                const countNeutral = [];


                fetch(`${this.props.path}api/getSearchAnalysissAggregatedByDays/collectedTweets/${single.slice(1,single.length)}/${reverseFrom}/${reverseTo}`)
                .then(resp => resp.json())
                .then(data => {
                    collectedTweets.push(data)
                    return fetch(`${this.props.path}api/getSearchAnalysissAggregatedByDays/collectedRetweets/${single.slice(1,single.length)}/${reverseFrom}/${reverseTo}`)
                })
                .then(resp => resp.json())
                .then(data => {
                    collecredRetweets.push(data)
                    return fetch(`${this.props.path}api/getSearchAnalysissAggregatedByDays/averageSentimentPolarity/${single.slice(1,single.length)}/${reverseFrom}/${reverseTo}`)
                })
                .then(resp => resp.json())
                .then(data => {
                    averageSentimentPolarity.push(data)
                    return fetch(`${this.props.path}api/getSearchAnalysissAggregatedByDays/averageSentimentPolarityWithoutRetweets/${single.slice(1,single.length)}/${reverseFrom}/${reverseTo}`)
                })
                .then(resp => resp.json())
                .then(data => {
                    averageSentimentPolarityWithoutRetweets.push(data)
                    return fetch(`${this.props.path}api/getSearchAnalysissAggregatedByDays/averageSentimentSubjectivity/${single.slice(1,single.length)}/${reverseFrom}/${reverseTo}`)
                })
                .then(resp => resp.json())
                .then(data => {
                    averageSentimentSubjectivity.push(data)
                    return fetch(`${this.props.path}api/getSearchAnalysissAggregatedByDays/countPositive/${single.slice(1,single.length)}/${reverseFrom}/${reverseTo}`)
                })
                .then(resp => resp.json())
                .then(data => {
                    countPositive.push(data)
                    return fetch(`${this.props.path}api/getSearchAnalysissAggregatedByDays/countNegative/${single.slice(1,single.length)}/${reverseFrom}/${reverseTo}`)
                })
                .then(resp => resp.json())
                .then(data => {
                    countNegative.push(data)
                    return fetch(`${this.props.path}api/getSearchAnalysissAggregatedByDays/countNeutral/${single.slice(1,single.length)}/${reverseFrom}/${reverseTo}`)
                })
                .then(resp => resp.json())
                .then(data => {
                    countNeutral.push(data)
                })


                dat1.push({"name": single,
                           "colTweets": collectedTweets, 
                           "colRetweets": collecredRetweets,
                           "averageSentimentPolarity": averageSentimentPolarity,
                           "averageSentimentPolarityWithoutRetweets": averageSentimentPolarityWithoutRetweets,
                           "averageSentimentSubjectivity": averageSentimentSubjectivity,
                           "countPositive": countPositive,
                           "countNegative": countNegative,
                           "countNeutral": countNeutral})

            
            })

            console.log(dat1)
            this.setState({from: reverseFrom, to: reverseTo, data: dat1})
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