import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, LabelList, Legend} from 'recharts';
import '../sass/SingleChartBar.sass'


const SingleChartBar = (props) => {
    

      const data = [];

      props.data.forEach(single => {
        data.push(single)
      })


      const singleBar = () => {
        const keys = [];
        data.forEach((single,index) => index === 1 ? keys.push(Object.keys(single)) : "")
        keys[0].splice(keys[0].indexOf("name"),1)
        keys[0].splice(keys[0].indexOf("title"),1)
      
        const colors = ["#8884d8","#82ca9d", "#ff6361"];
        const colorsAll = ["#bc5090","#ffa600"]

        return keys[0].map((single,index) => 
          <Bar key={index} dataKey={single} stackId="a" fill={keys[0][0] === "col_tweets" || keys[0][0] === "col_retweets" ? colorsAll[index] : colors[index]}>
            <LabelList dataKey={single} position="inside" fill="white" />
          </Bar>)
      }
     

    return ( 
      
        <div className="summary__single">
            <h2>{data[0].title}</h2>
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
                <Legend />
                
                {singleBar()}
                
            </BarChart>
            </ResponsiveContainer>
                
        </div>
     
     );
}
 
export default SingleChartBar;