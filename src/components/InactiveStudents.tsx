import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Search, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  uid: string;
  class: string;
  teacher: string;
  lastSignIn: string;
  lastStudy: string;
}

const InactiveStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>('全部');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const teachers = ['全部', '王老师', '赵老师', '张老师', '李老师', '陈老师'];

  useEffect(() => {
    // 模拟获取学生数据
    const fetchStudents = () => {
      const mockStudents: Student[] = Array.from({ length: 50 }, (_, index) => ({
        id: `${index + 1}`,
        name: `学生${index + 1}`,
        uid: `1177018${index + 1}`,
        class: `${['初一', '初二', '初三', '高一', '高二', '高三'][Math.floor(Math.random() * 6)]}(${Math.floor(Math.random() * 5) + 1})班`,
        teacher: teachers[Math.floor(Math.random() * (teachers.length - 1)) + 1],
        lastSignIn: `2023-05-${Math.floor(Math.random() * 30) + 1}`,
        lastStudy: `2023-05-${Math.floor(Math.random() * 30) + 1}`,
      }));
      setStudents(mockStudents);
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => 
    (selectedTeacher === '全部' || student.teacher === selectedTeacher) &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.uid.includes(searchTerm))
  );

  const handleTeacherSelect = useCallback((teacher: string) => {
    setSelectedTeacher(teacher);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <header className="bg-indigo-600 text-white p-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold">本月未签到学生</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索学生"
                className="pl-8 pr-2 py-1 rounded text-sm bg-indigo-500 text-white placeholder-indigo-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-200" />
            </div>
            <button className="flex items-center bg-indigo-500 hover:bg-indigo-400 text-white text-sm py-1 px-2 rounded transition-colors duration-200">
              <Download className="w-4 h-4 mr-1" />
              导出Excel
            </button>
          </div>
        </div>
      </header>

      <main className="py-4">
        <div className="flex justify-center mb-4 space-x-2">
          {teachers.map((teacher) => (
            <button
              key={teacher}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                selectedTeacher === teacher
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 hover:bg-indigo-100'
              }`}
              onClick={() => handleTeacherSelect(teacher)}
            >
              {teacher}
            </button>
          ))}
        </div>

        <div className="bg-white shadow overflow-hidden">
          <div className="px-4 py-2 border-b">
            <p className="text-sm text-gray-600">共 {filteredStudents.length} 名未签到学生</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学生/UID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">班级</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">负责老师</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后签到</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最近学习</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.uid}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{student.teacher}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{student.lastSignIn}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{student.lastStudy}</td>
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

export default InactiveStudents;