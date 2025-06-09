import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TemperatureChart = ({ data, isCurrentDay }) => {
  // Format data for the chart
  const chartData = data.map((item, index) => ({
    time: index === 0 ? 'Now' : `+${index}h`,
    temp: item.temperature
  }));

  const chartColors = {
    line: isCurrentDay ? '#ffffff' : '#3B82F6',
    dot: isCurrentDay ? '#ffffff' : '#3B82F6',
    tooltip: isCurrentDay ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    text: isCurrentDay ? '#ffffff' : '#1F2937'
  };

  return (
    <div className="h-24 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis 
            dataKey="time" 
            tick={{ 
              fontSize: 10,
              fill: chartColors.text,
              opacity: 0.8
            }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            hide={true}
            domain={['dataMin - 2', 'dataMax + 2']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: chartColors.tooltip,
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '8px 12px'
            }}
            labelStyle={{
              color: chartColors.text,
              fontSize: '12px',
              fontWeight: '500'
            }}
            itemStyle={{
              color: chartColors.text,
              fontSize: '12px'
            }}
            formatter={(value) => [`${value}°C`, 'Temperature']}
          />
          <Line 
            type="monotone" 
            dataKey="temp" 
            stroke={chartColors.line}
            strokeWidth={2.5}
            dot={{ 
              fill: chartColors.dot,
              strokeWidth: 2,
              r: 3,
              stroke: isCurrentDay ? '#3B82F6' : '#ffffff'
            }}
            activeDot={{ 
              r: 5, 
              fill: chartColors.dot,
              stroke: isCurrentDay ? '#3B82F6' : '#ffffff',
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart; 