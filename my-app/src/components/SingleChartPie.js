import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import '../sass/SingleChartPie.sass'

const SingleChartPie = (props) => {
    const data = [];
    props.data.forEach(single => {
        data.push({name: single.name, val: single.value})
    })

    const colors = [];
    props.colors.forEach(single => colors.push(single))

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return ( 
        <div className="charts__single">
            <h3>{props.title}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="val" nameKey="name" innerRadius="10%" outerRadius="70%" fill="#8884d8" label={renderCustomizedLabel} labelLine={false}>
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)
                        }
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} payload={
                        data.map((item,index) => ({
                            type: ":)",
                            value: `${item.name} (${item.val})`,
                            color: colors[index]
                        })
                        )
                    }/>
                </PieChart>
            </ResponsiveContainer>
        </div>
     );
}
 
export default SingleChartPie;