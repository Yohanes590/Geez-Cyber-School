import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Completed', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Overdue', value: 200 },
];

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd']; 

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function StudentPieChart() {
  return (
    <div style={{ width: '100%', height: 300 }}> {/* fixed height wrapper */}
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
