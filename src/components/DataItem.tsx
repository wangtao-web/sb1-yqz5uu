import React from 'react'

interface DataItemProps {
  icon: string
  title: string
  value: number
  change: number
  unit: string
}

const DataItem: React.FC<DataItemProps> = ({ icon, title, value, change, unit }) => (
  <div className="bg-white p-2 rounded-lg shadow-sm">
    <div className="flex justify-between items-center mb-1">
      <div className="text-lg">{icon}</div>
      <div className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
      </div>
    </div>
    <div className="text-base mb-0.5">
      {value}
      <span className="text-xs text-gray-500 ml-0.5">{unit}</span>
    </div>
    <div className="text-xs text-gray-600 truncate">{title}</div>
  </div>
)

export default DataItem