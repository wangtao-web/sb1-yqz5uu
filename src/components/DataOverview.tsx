import React from 'react'
import DataItem from './DataItem'

const DataOverview: React.FC = () => {
  const data = [
    { icon: "✅", title: "今日签到", value: 450, change: 5, unit: "人" },
    { icon: "📝", title: "今日督学计划", value: 80, change: 8, unit: "个" },
    { icon: "💬", title: "今日点评", value: 120, change: -3, unit: "人" },
    { icon: "🤝", title: "今日伴学", value: 40, change: 2, unit: "小时" },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {data.map((item, index) => (
        <DataItem key={index} {...item} />
      ))}
    </div>
  )
}

export default DataOverview