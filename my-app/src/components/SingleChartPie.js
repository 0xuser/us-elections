import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import '../sass/SingleChartPie.sass'

const SingleChartPie = (props) => {
    //const data = [{name: 'Page A', uv: 400}, {name: 'Page B', uv: 600}];

    const data = [];

    props.data.forEach(single => {
        data.push({name: single.name, val: single.value})
    })

    const colors = ["green", "blue", "red"]
    return ( 
        <div className="charts__single">
            <h3>{props.title}</h3>
            <ResponsiveContainer>
                <PieChart width={200} height={200}>
                    <Pie data={data} dataKey="val" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]}/>)
                        }
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
     );
}
 
export default SingleChartPie;