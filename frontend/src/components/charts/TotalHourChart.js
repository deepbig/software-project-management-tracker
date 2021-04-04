import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Label, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9966FF'];



const TotalHourChart = ({ chartData }) => {
  let data = [
    { name: 'Analysis', value: chartData.hour_analysis !== undefined && chartData.hour_analysis !== null ? chartData.hour_analysis : 0 },
    { name: 'Designing', value: chartData.hour_designing !== undefined && chartData.hour_designing !== null ? chartData.hour_designing : 0 },
    { name: 'Coding',value: chartData.hour_coding !== undefined && chartData.hour_coding !== null ? chartData.hour_coding : 0 },
    { name: 'Testing', value: chartData.hour_testing !== undefined && chartData.hour_testing !== null ? chartData.hour_testing : 0 },
    { name: 'Proj. Management', value: chartData.hour_proj_mgt !== undefined && chartData.hour_proj_mgt !== null ? chartData.hour_proj_mgt : 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={100} height={100}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={3}
          dataKey="value"
          label
          // label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label 
          value={`Total ${chartData.hour_total !== undefined && chartData.hour_total !== null ? chartData.hour_total : 0 } hrs`}
          offset={0} position="center"
          />
          {/* <LabelList dataKey="value" position="inside" /> */}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TotalHourChart;
