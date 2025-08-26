
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    name: string;
    value: number;
    color: string;
}

interface ProgressChartProps {
    data: ChartData[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Fases da Obra</h2>
            <div className="w-full flex-grow h-80 lg:h-[350px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number, name: string) => [`${value}%`, name]} />
                        <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" 
                          wrapperStyle={{ paddingLeft: '20px' }}
                          formatter={(value, entry) => <span className="text-gray-600 text-sm md:text-base">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProgressChart;
