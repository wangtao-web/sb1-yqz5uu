import React from 'react'
import { Users, BookOpen, FileText, UserPlus, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const FunctionMenu: React.FC = () => {
  const functions = [
    { icon: <FileText size={16} />, title: '课时明细', link: '/course-hours-record' },
    { icon: <BookOpen size={16} />, title: '伴学督查', link: '#' },
    { icon: <Users size={16} />, title: '学员管理', link: '/personnel-details' },
    { icon: <UserPlus size={16} />, title: '督导管理', link: '#' },
    { icon: <Shield size={16} />, title: '权限控制', link: '#' },
  ]

  return (
    <div className="py-1">
      {functions.map((func, index) => (
        <Link
          key={index}
          to={func.link}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <span className="mr-3">{func.icon}</span>
          <span>{func.title}</span>
        </Link>
      ))}
    </div>
  )
}

export default FunctionMenu