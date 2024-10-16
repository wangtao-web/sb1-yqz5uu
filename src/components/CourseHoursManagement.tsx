import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface StudentData {
  id: string;
  name: string;
  uid: string;
  class: string;
  remainingHours: number;
  totalHours: number;
  isPreDeductionEnabled: boolean;
  isStudyTimeDeductionEnabled: boolean;
}

const CourseHoursManagement: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentData[]>([
    {
      id: '1',
      name: '王艺樵',
      uid: '11770181',
      class: '初一(1)班',
      remainingHours: 20,
      totalHours: 50,
      isPreDeductionEnabled: true,
      isStudyTimeDeductionEnabled: false,
    },
    {
      id: '2',
      name: '李明',
      uid: '11770182',
      class: '初二(3)班',
      remainingHours: 15,
      totalHours: 40,
      isPreDeductionEnabled: false,
      isStudyTimeDeductionEnabled: true,
    },
    {
      id: '3',
      name: '张华',
      uid: '11770183',
      class: '初三(2)班',
      remainingHours: 25,
      totalHours: 60,
      isPreDeductionEnabled: true,
      isStudyTimeDeductionEnabled: true,
    },
    {
      id: '4',
      name: '刘芳',
      uid: '11770184',
      class: '高一(1)班',
      remainingHours: 30,
      totalHours: 70,
      isPreDeductionEnabled: false,
      isStudyTimeDeductionEnabled: false,
    },
  ]);

  const handleToggle = (id: string, field: 'isPreDeductionEnabled' | 'isStudyTimeDeductionEnabled') => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, [field]: !student[field] } : student
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white mr-4">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-lg font-semibold">《状元教育》督学时长管理</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-white">
              <Search className="w-5 h-5 mr-1" />
              <span>搜索</span>
            </button>
            <button className="flex items-center text-white" onClick={() => navigate('/course-hours-record')}>
              <HelpCircle className="w-5 h-5 mr-1" />
              <span>操作历史</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学生/UID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">班级</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">课时剩余/累计充入</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">预排扣减</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">伴学时长扣减</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student, index) => (
                  <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-xs font-medium text-gray-900">{student.name}</div>
                      <div className="text-xs text-gray-500">{student.uid}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">{student.class}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                      {student.remainingHours} / {student.totalHours}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={student.isPreDeductionEnabled}
                          onChange={() => handleToggle(student.id, 'isPreDeductionEnabled')}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={student.isStudyTimeDeductionEnabled}
                          onChange={() => handleToggle(student.id, 'isStudyTimeDeductionEnabled')}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">充时长</button>
                      <button className="text-red-600 hover:text-red-900">减时长</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseHoursManagement;