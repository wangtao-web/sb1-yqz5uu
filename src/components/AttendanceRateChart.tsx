import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const AttendanceRateChart: React.FC = () => {
  const data = {
    labels: ['督导A', '督导B', '督导C', '督导D', '督导E'],
    datasets: [
      {
        label: '出勤率',
        data: [95, 88, 92, 85, 90],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  }

  return <Bar data={data} />
}

export default AttendanceRateChart