import React from 'react'
import { Users, UserPlus, Clock, BookOpen, UserCheck, MessageSquare, FileText, AlertCircle } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Link } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const OperationOverview: React.FC = () => {
  const operationData = [
    { title: "总学生数", value: 1200, icon: <Users className="w-3 h-3" />, trend: "+5%", color: "bg-blue-500" },
    { title: "本月新增学生", value: 45, icon: <UserPlus className="w-3 h-3" />, trend: "+12%", color: "bg-green-500" },
    { title: "学生签到率", value: "92%", icon: <Clock className="w-3 h-3" />, trend: "+3%", color: "bg-yellow-500" },
    { title: "督学老师数量", value: 20, icon: <UserCheck className="w-3 h-3" />, trend: "+2", color: "bg-purple-500" },
    { title: "本月总伴学时长", value: "1500小时", icon: <BookOpen className="w-3 h-3" />, trend: "+8%", color: "bg-indigo-500" },
  ]

  const todayData = [
    { title: "今日伴学数", value: 150, icon: <BookOpen className="w-4 h-4" />, color: "bg-blue-100 text-blue-600" },
    { title: "今日点评数", value: 120, icon: <MessageSquare className="w-4 h-4" />, color: "bg-green-100 text-green-600" },
    { title: "今日制定计划数", value: 80, icon: <FileText className="w-4 h-4" />, color: "bg-yellow-100 text-yellow-600" },
  ]

  const studentChartData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '总学生数',
        data: [1000, 1050, 1100, 1150, 1180, 1200],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
      },
      {
        label: '新增学生数',
        data: [50, 55, 60, 48, 52, 45],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <h2 className="text-base text-gray-800 mb-2">运营概览</h2>
      <div className="grid grid-cols-5 gap-2 mb-3">
        {operationData.map((item, index) => (
          <div key={index} className={`${item.color} bg-opacity-10 rounded-lg p-2 flex flex-col justify-between transition-all duration-300 hover:shadow-md`}>
            <div className="flex justify-between items-center mb-1">
              <div className={`${item.color} text-white p-1 rounded-full`}>{item.icon}</div>
              <span className="text-xs font-medium text-green-500">{item.trend}</span>
            </div>
            <p className="text-xs text-gray-600">{item.title}</p>
            <p className="text-sm font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {todayData.map((item, index) => (
          <div key={index} className={`${item.color} rounded-lg p-2 flex items-center transition-all duration-300 hover:shadow-md`}>
            <div className="rounded-full p-1 mr-2">
              {item.icon}
            </div>
            <div>
              <p className="text-xs text-gray-600">{item.title}</p>
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 rounded-lg p-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm text-gray-800">学生数量趋势</h3>
          <Link 
            to="/inactive-students" 
            className="flex items-center text-xs text-red-500 hover:text-red-600 transition-colors duration-200"
          >
            <AlertCircle className="w-3 h-3 mr-1" />
            查看本月未签到学生
          </Link>
        </div>
        <div className="h-56 w-full">
          <Line options={chartOptions} data={studentChartData} />
        </div>
      </div>
    </div>
  )
}

export default OperationOverview