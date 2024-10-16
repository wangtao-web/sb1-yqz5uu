import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const DailyStatsChart: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState('点评数')
  const [selectedSupervisor, setSelectedSupervisor] = useState('全部')

  const generateDummyData = () => Array.from({ length: 31 }, () => Math.floor(Math.random() * 100))

  const supervisors = ['全部', '督导A', '督导B', '督导C', '督导D', '督导E']
  const datasets = supervisors.slice(1).map((supervisor, index) => ({
    label: supervisor,
    data: generateDummyData(),
    borderColor: `hsl(${index * 60}, 70%, 50%)`,
    backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.5)`,
    tension: 0.4,
  }))

  const getDaysInMonth = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}日`)
  }

  const data = {
    labels: getDaysInMonth(),
    datasets: selectedSupervisor === '全部' ? datasets : [datasets.find(d => d.label === selectedSupervisor)!],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 15,
          font: {
            size: 10
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10
          },
          stepSize: 20,
          max: 100
        }
      },
      x: {
        ticks: {
          font: {
            size: 10
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    },
  }

  return (
    <div>
      <div className="flex space-x-2 mb-2">
        <select
          value={selectedStat}
          onChange={(e) => setSelectedStat(e.target.value)}
          className="w-1/2 p-2 border rounded-md text-sm"
        >
          <option value="点评数">点评数</option>
          <option value="制定计划数">制定计划数</option>
          <option value="伴学数量">伴学数量</option>
        </select>
        <select
          value={selectedSupervisor}
          onChange={(e) => setSelectedSupervisor(e.target.value)}
          className="w-1/2 p-2 border rounded-md text-sm"
        >
          {supervisors.map((supervisor) => (
            <option key={supervisor} value={supervisor}>{supervisor}</option>
          ))}
        </select>
      </div>
      <div style={{ height: '250px' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

export default DailyStatsChart