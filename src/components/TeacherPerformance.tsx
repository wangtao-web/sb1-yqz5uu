import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const TeacherPerformance: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [endDate, setEndDate] = useState(new Date())

  const teachers = ['张老师', '李老师', '王老师', '赵老师', '刘老师']
  const chartData = {
    labels: teachers,
    datasets: [
      {
        label: '督学学生数',
        data: teachers.map(() => Math.floor(Math.random() * 50) + 20),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: '计划制定数',
        data: teachers.map(() => Math.floor(Math.random() * 40) + 10),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: '点评完成数',
        data: teachers.map(() => Math.floor(Math.random() * 30) + 15),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  }

  const generateTeacherStudyTimeData = () => {
    const data = teachers.map((teacher, index) => ({
      teacher,
      studyTime: Math.floor(Math.random() * 50) + 10
    }));
    return data.sort((a, b) => b.studyTime - a.studyTime);
  }

  const sortedTeacherStudyTimeData = generateTeacherStudyTimeData();

  const teacherStudyTimeData = {
    labels: sortedTeacherStudyTimeData.map(item => item.teacher),
    datasets: [{
      label: '伴学时长（小时）',
      data: sortedTeacherStudyTimeData.map(item => item.studyTime),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  }

  const generateSupervisorStudentData = () => {
    return teachers.map(teacher => ({
      teacher,
      totalStudents: Math.floor(Math.random() * 50) + 30,
      attendedStudents: Math.floor(Math.random() * 30) + 20,
    }));
  }

  const supervisorStudentData = generateSupervisorStudentData();

  const supervisorStudentChartData = {
    labels: teachers,
    datasets: [
      {
        label: '总学生数',
        data: supervisorStudentData.map(item => item.totalStudents),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: '已签到学生数',
        data: supervisorStudentData.map(item => item.attendedStudents),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    barThickness: 15,
  }

  const supervisorStudentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base text-gray-800">督导考核数据</h2>
        <div className="flex items-center space-x-2">
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="p-1 text-xs border rounded"
          />
          <span className="text-xs">至</span>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="p-1 text-xs border rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-2">
          <h3 className="text-sm text-gray-800 mb-1">督导伴学统计</h3>
          <div className="h-60 w-full">
            <Bar options={barOptions} data={teacherStudyTimeData} />
          </div>
          <p className="mt-1 text-xs text-gray-600">
            数据分析：督导伴学统计显示了每位老师的伴学时长，按时长从多到少排序。可以观察到{teacherStudyTimeData.labels[0]}的伴学时间最长，而{teacherStudyTimeData.labels[teacherStudyTimeData.labels.length - 1]}的伴学时间最短。
            建议进一步分析造成这些差异的原因，并考虑制定相应的策略来提高整体伴学时长的效率和均衡性。
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg p-2">
          <h3 className="text-sm text-gray-800 mb-1">督导工作情况统计</h3>
          <div className="h-60 w-full">
            <Bar options={chartOptions} data={chartData} />
          </div>
          <p className="mt-1 text-xs text-gray-600">
            数据分析：在选定的时间范围内，张老师在督学学生数和计划制定数方面表现最为突出，而王老师在点评完成数上领先。
            建议其他老师向他们学习工作方法，以提高整体工作效率。同时，应关注表现相对较弱的老师，提供必要的支持和培训。
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-2 lg:col-span-2">
          <h3 className="text-sm text-gray-800 mb-1">督导学生统计</h3>
          <div className="h-60 w-full">
            <Bar options={supervisorStudentChartOptions} data={supervisorStudentChartData} />
          </div>
          <p className="mt-1 text-xs text-gray-600">
            数据分析：此图表展示了每位督导老师名下的总学生数和已签到学生数。可以看出{teachers[0]}和{teachers[2]}的学生总数较多，
            但{teachers[1]}的学生签到率似乎更高。建议进一步分析造成这些差异的原因，并考虑如何提高学生的整体签到率。
          </p>
        </div>
      </div>
    </div>
  )
}

export default TeacherPerformance