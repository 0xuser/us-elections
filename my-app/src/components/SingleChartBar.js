import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, Legend } from 'recharts';
import '../sass/SingleChartBar.sass'


const SingleChartBar = (props) => {
    const data = [
        {
          name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
          name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
        },
        {
          name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
        }
      ];

    return ( 
        <div className="summary__single">
            <h2>Bar chart</h2>
            <ResponsiveContainer width="100%" height="90%">
            <BarChart
                width="100%"
                height="100%"
                data={data}
                margin={{
                    top: 20, right: 30, left: 0, bottom: 5,
                  }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tick={{fontSize: 14}}/>
                <Tooltip />
                
                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                
            </BarChart>
            </ResponsiveContainer>
        </div>
     );
}
 
export default SingleChartBar;