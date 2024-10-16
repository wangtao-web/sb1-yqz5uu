import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, FileText, X, ChevronLeft, ChevronRight, Upload, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  uid: string;
  class: string;
  phone: string;
  paymentAmount: number;
  paymentScreenshots: string[];
  courseStatus: {
    type: 'lessons' | 'hours' | 'period';
    remaining: number;
    total: number;
    startDate?: string;
    endDate?: string;
  };
  salesPerson: string;
  teacher: string;
}

const PersonnelDetails: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const studentsPerPage = 10;

  useEffect(() => {
    // 模拟获取学生数据
    const fetchStudents = () => {
      const mockStudents: Student[] = Array.from({ length: 400 }, (_, index) => ({
        id: (index + 1).toString(),
        name: `学生${index + 1}`,
        uid: `1177018${(index + 1).toString().padStart(3, '0')}`,
        class: `${['初一', '初二', '初三', '高一', '高二', '高三'][Math.floor(Math.random() * 6)]}(${Math.floor(Math.random() * 5) + 1})班`,
        phone: `1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        paymentAmount: Math.floor(Math.random() * 10000) + 1000,
        paymentScreenshots: Math.random() > 0.3 ? Array(Math.floor(Math.random() * 3) + 1).fill('').map(() => `https://picsum.photos/200/300?random=${Math.random()}`) : [],
        courseStatus: {
          type: ['lessons', 'hours', 'period'][Math.floor(Math.random() * 3)] as 'lessons' | 'hours' | 'period',
          remaining: Math.floor(Math.random() * 10),
          total: Math.floor(Math.random() * 50) + 10,
          startDate: '2023-01-01',
          endDate: '2023-12-31',
        },
        salesPerson: `销售${Math.floor(Math.random() * 5) + 1}`,
        teacher: `老师${Math.floor(Math.random() * 10) + 1}`,
      }));
      setStudents(mockStudents);
      setTotalPages(Math.ceil(mockStudents.length / studentsPerPage));
    };

    fetchStudents();
  }, []);

  const handleEdit = (student: Student) => {
    setEditingStudent({ ...student });
  };

  const handleSave = () => {
    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
      setEditingStudent(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editingStudent) {
      setEditingStudent({ ...editingStudent, [e.target.name]: e.target.value });
    }
  };

  const handleDeleteScreenshot = (index: number) => {
    if (editingStudent) {
      const newScreenshots = [...editingStudent.paymentScreenshots];
      newScreenshots.splice(index, 1);
      setEditingStudent({ ...editingStudent, paymentScreenshots: newScreenshots });
    }
  };

  const handleAddScreenshot = () => {
    if (editingStudent) {
      const newScreenshot = `https://picsum.photos/200/300?random=${Math.random()}`;
      setEditingStudent({ ...editingStudent, paymentScreenshots: [...editingStudent.paymentScreenshots, newScreenshot] });
    }
  };

  const handleAddSalesPerson = () => {
    if (editingStudent) {
      const newSalesPerson = prompt('请输入新的销售人员姓名');
      if (newSalesPerson) {
        setEditingStudent({ ...editingStudent, salesPerson: newSalesPerson });
      }
    }
  };

  const isLowCourseStatus = (student: Student) => {
    if (student.courseStatus.type === 'period') {
      const endDate = new Date(student.courseStatus.endDate || '');
      const daysRemaining = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysRemaining <= 3;
    }
    return student.courseStatus.remaining <= 3;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-indigo-600 text-white p-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold">学员管理</h1>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="搜索学生"
              className="px-2 py-1 text-xs text-gray-900 bg-white rounded"
            />
            <button className="flex items-center bg-white text-indigo-600 px-2 py-1 rounded text-xs">
              <FileText className="w-4 h-4 mr-1" />
              导出Excel
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-4">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="sticky left-0 z-10 bg-gray-50 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    学生姓名/UID
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">所属班级</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">手机号码</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">付款金额</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">付款截图</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">课时情况</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">销售人员</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">负责老师</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage).map((student, index) => (
                  <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="sticky left-0 z-10 bg-inherit px-4 py-3 whitespace-nowrap">
                      <div className="text-xs font-medium text-gray-900">{student.name}</div>
                      <div className="text-xs text-gray-500">{student.uid}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">{student.class}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">{student.phone}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">{student.paymentAmount}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                      {student.paymentScreenshots.length > 0 ? (
                        <div className="flex items-center">
                          <img
                            src={student.paymentScreenshots[0]}
                            alt="付款截图"
                            className="h-8 w-8 object-cover cursor-pointer"
                            onClick={() => {
                              setSelectedImages(student.paymentScreenshots);
                              setCurrentImageIndex(0);
                            }}
                          />
                          <span className="ml-1">{student.paymentScreenshots.length}</span>
                        </div>
                      ) : (
                        "未上传"
                      )}
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap text-xs ${isLowCourseStatus(student) ? 'bg-red-100' : ''}`}>
                      {student.courseStatus.type === 'lessons' && `课次：${student.courseStatus.remaining}次/${student.courseStatus.total}次`}
                      {student.courseStatus.type === 'hours' && `课时：${student.courseStatus.remaining}小时/${student.courseStatus.total}小时`}
                      {student.courseStatus.type === 'period' && `时间段：${student.courseStatus.startDate}/${student.courseStatus.endDate}`}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">{student.salesPerson}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">{student.teacher}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-xs font-medium">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        编辑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {editingStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2 text-center">编辑学生信息</h3>
              <div className="mt-2 text-xs">
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">学生姓名/UID</label>
                  <input type="text" value={`${editingStudent.name} / ${editingStudent.uid}`} readOnly className="w-full px-2 py-1 border rounded bg-gray-100" />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">所属班级</label>
                  <input type="text" value={editingStudent.class} readOnly className="w-full px-2 py-1 border rounded bg-gray-100" />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">手机号码</label>
                  <input type="text" name="phone" value={editingStudent.phone} onChange={handleInputChange} className="w-full px-2 py-1 border rounded" />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">付款金额</label>
                  <input type="number" name="paymentAmount" value={editingStudent.paymentAmount} onChange={handleInputChange} className="w-full px-2 py-1 border rounded" />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">付款截图</label>
                  <div className="flex flex-wrap">
                    {editingStudent.paymentScreenshots.map((screenshot, index) => (
                      <div key={index} className="relative m-1">
                        <img src={screenshot} alt={`付款截图 ${index + 1}`} className="w-16 h-16 object-cover" />
                        <button
                          onClick={() => handleDeleteScreenshot(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddScreenshot}
                      className="w-16 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-gray-500 hover:border-gray-400"
                    >
                      <Upload className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">课时情况</label>
                  <input type="text" value={
                    editingStudent.courseStatus.type === 'lessons' ? `课次：${editingStudent.courseStatus.remaining}次/${editingStudent.courseStatus.total}次` :
                    editingStudent.courseStatus.type === 'hours' ? `课时：${editingStudent.courseStatus.remaining}小时/${editingStudent.courseStatus.total}小时` :
                    `时间段：${editingStudent.courseStatus.startDate}/${editingStudent.courseStatus.endDate}`
                  } readOnly className="w-full px-2 py-1 border rounded bg-gray-100" />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">销售人员</label>
                  <div className="flex items-center">
                    <input type="text" name="salesPerson" value={editingStudent.salesPerson} onChange={handleInputChange} className="flex-grow px-2 py-1 border rounded" />
                    <button onClick={handleAddSalesPerson} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs">新增</button>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 mb-1">负责老师</label>
                  <input type="text" value={editingStudent.teacher} readOnly className="w-full px-2 py-1 border rounded bg-gray-100" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 text-xs font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedImages.length > 0 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <img src={selectedImages[currentImageIndex]} alt="付款截图" className="w-full h-auto" />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentImageIndex(prev => (prev - 1 + selectedImages.length) % selectedImages.length)}
                className="px-4 py-2 bg-gray-300 text-gray-700 text-xs font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                上一张
              </button>
              <button
                onClick={() => setCurrentImageIndex(prev => (prev + 1) % selectedImages.length)}
                className="px-4 py-2 bg-gray-300 text-gray-700 text-xs font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                下一张
              </button>
            </div>
            <button
              onClick={() => {
                setSelectedImages([]);
                setCurrentImageIndex(0);
              }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonnelDetails;