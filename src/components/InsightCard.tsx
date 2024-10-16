import React from 'react'
import { TrendingUp, AlertTriangle, Users } from 'lucide-react'

const InsightCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">数据洞察</h3>
      <ul className="space-y-6">
        <li className="flex items-start">
          <TrendingUp className="text-green-500 w-6 h-6 mr-4 mt-1" />
          <div>
            <p className="text-base font-medium text-gray-800">伴学时长增长15%</p>
            <p className="text-sm text-gray-600 mt-1">学生学习积极性提高，建议继续保持当前教学策略。</p>
          </div>
        </li>
        <li className="flex items-start">
          <AlertTriangle className="text-yellow-500 w-6 h-6 mr-4 mt-1" />
          <div>
            <p className="text-base font-medium text-gray-800">督导C学生出勤率下降8%</p>
            <p className="text-sm text-gray-600 mt-1">建议与督导C沟通，了解原因并制定改进计划。</p>
          </div>
        </li>
        <li className="flex items-start">
          <Users className="text-blue-500 w-6 h-6 mr-4 mt-1" />
          <div>
            <p className="text-base font-medium text-gray-800">新增学生人数增长20%</p>
            <p className="text-sm text-gray-600 mt-1">招生策略效果显著，考虑扩大成功策略的应用范围。</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default InsightCard