import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer,LabelList} from 'recharts';
import '../sass/SingleChartBar.sass'


const SingleChartBar = (props) => {
    const data = [
        {
          name: 'Ogolem', clas_poz: props.data.clas_poz, clas_neu: props.data.clas_neu, clas_neg: props.data.clas_neg
        },
        {
          name: 'Ogolem bez retweetow', clas_poz_re: props.data.clas_poz_re, clas_neu_re: props.data.clas_neu_re, clas_neg_re: props.data.clas_neg_re
        },
        {
          name: 'Ogolna liczba', col_tweets: props.data.col_tweets - props.data.col_retweets, col_retweets: props.data.col_retweets
        }
      ];

      const generateCandidatName = () => {
        if(props.data.candidat === "realDonaldTrump") return "Donald Trump"
        else if (props.data.candidat === "JoeBiden") return "Joe Biden"
        else return "Bernie Sanders"
      }

    return ( 
        <div className="summary__single">
            <h2>{generateCandidatName()}</h2>
            <ResponsiveContainer width="100%" height="90%">
            <BarChart
                data={data}
                margin={{
                    top: 20, right: 20, left: 0, bottom: 5,
                  }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"  tick={{fontSize: 12}}/>
                <YAxis tick={{fontSize: 14}}/>
                <Tooltip />
                
                <Bar dataKey="clas_poz" stackId="a" fill="#8884d8">
                  <LabelList dataKey="clas_poz" position="middle" />
                </Bar>
                <Bar dataKey="clas_neu" stackId="a" fill="#82ca9d">
                  <LabelList dataKey="clas_neu" position="middle" />  
                </Bar>
                <Bar dataKey="clas_neg" stackId="a" fill="#ff6361" >
                  <LabelList dataKey="clas_neg" position="middle" />  
                </Bar>

                <Bar dataKey="clas_poz_re" stackId="a" fill="#8884d8" >
                  <LabelList dataKey="clas_poz_re" position="middle" />  
                </Bar>
                <Bar dataKey="clas_neu_re" stackId="a" fill="#82ca9d" >
                  <LabelList dataKey="clas_neu_re" position="middle" />  
                </Bar>
                <Bar dataKey="clas_neg_re" stackId="a" fill="#ff6361" >
                  <LabelList dataKey="clas_neg_re" position="middle" />  
                </Bar>

                <Bar dataKey="col_tweets" stackId="a" fill="#bc5090" >
                  <LabelList dataKey="col_tweets" position="middle" />  
                </Bar>
                <Bar dataKey="col_retweets" stackId="a" fill="#ffa600" >
                  <LabelList dataKey="col_retweets" position="middle" />  
                </Bar>

               
            </BarChart>
            </ResponsiveContainer>
        </div>
     );
}
 
export default SingleChartBar;