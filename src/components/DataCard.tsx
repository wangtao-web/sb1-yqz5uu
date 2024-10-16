import React, { ReactNode } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface DataCardProps {
  title: string
  value: number | string
  icon: ReactNode
  trend?: string
}

const DataCard: React.FC<DataCardProps> = ({ title, value, icon, trend }) => {
  const isTrendPositive = trend && trend.startsWith('+')

  return (
    <div className="dashboard-card p-3 animate-fadeIn">
      <div className="flex items-center justify-between mb-1">
        <div className="text-blue-600">{icon}</div>
        {trend && (
          <div className={`flex items-center ${isTrendPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isTrendPositive ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
            <span className="text-xs">{trend}</span>
          </div>
        )}
      </div>
      <h3 className="text-xs mb-0.5 text-gray-600 truncate">{title}</h3>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  )
}

export default DataCard