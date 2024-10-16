import React from 'react'

interface BarChartProps {
  data: { name: string; value: number }[]
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value))

  return (
    <div className="w-full">
      {data.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <div className="w-20 text-sm">{item.name}</div>
          <div className="flex-grow bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            ></div>
          </div>
          <div className="w-12 text-right text-sm">{item.value}</div>
        </div>
      ))}
    </div>
  )
}