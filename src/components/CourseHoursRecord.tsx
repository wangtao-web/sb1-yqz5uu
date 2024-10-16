import React, { useState } from 'react';
import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface RecordData {
  id: string;
  studentName: string;
  uid: string;
  studyTime: string;
  videoStudyTime: string;
  operationType: string;
  flowType: string;
  flowValue: string;
  operator: string;
  date: string;
}

const CourseHoursRecord: React.FC = () => {
  const [records] = useState<RecordData[]>([
    { id: '1', studentName: '张三', uid: '11770181', studyTime: '2小时3分', videoStudyTime: '1小时3分', operationType: '扣减', flowType: '课时', flowValue: '-1小时3分', operator: '圆圆', date: '2024.06.21 15:30:23' },
    { id: '2', studentName: '小明', uid: '11770182', studyTime: '3小时', videoStudyTime: '1小时', operationType: '扣减', flowType: '课时', flowValue: '-1小时', operator: '圆圆', date: '2024.06.21 16:30:23' },
    { id: '3', studentName: '小红', uid: '11770183', studyTime: '5小时', videoStudyTime: '50分钟', operationType: '扣减', flowType: '畅学', flowValue: '1天', operator: '圆圆', date: '2024.06.21 16:30:23' },
    { id: '4', studentName: '小红', uid: '11770184', studyTime: '2小时', videoStudyTime: '30分钟', operationType: '扣减', flowType: '课次', flowValue: '-1次', operator: '圆圆', date: '2024.06.26 16:30:23' },
    { id: '5', studentName: '小美', uid: '11770185', studyTime: '3小时20分', videoStudyTime: '1小时2分', operationType: '扣减', flowType: '课次', flowValue: '-1次', operator: '圆圆', date: '2024.06.15 16:30:23' },
    { id: '6', studentName: '李四', uid: '11770186', studyTime: '1小时30分', videoStudyTime: '1小时', operationType: '扣减', flowType: '课时', flowValue: '-1小时', operator: '圆圆', date: '2024.06.10 16:30:23' },
  ]);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const time = date.toTimeString().slice(0, 5);

    return year === currentYear
      ? `${month}.${day} ${time}`
      : `${year}.${month}.${day} ${time}`;
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-base font-semibold">课时扣减记录</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              className="flex items-center text-white bg-blue-500 px-2 py-1 rounded text-xs"
              onClick={toggleDatePicker}
            >
              <Calendar className="w-3 h-3 mr-1" />
              <span>日期范围</span>
            </button>
            <button className="flex items-center text-white bg-green-500 px-2 py-1 rounded text-xs">
              <FileText className="w-3 h-3 mr-1" />
              <span>导出Excel</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-4">
        {showDatePicker && (
          <div className="bg-white p-4 mb-4 rounded-lg shadow-sm flex justify-center items-center space-x-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="开始日期"
              className="p-2 border rounded"
            />
            <span>至</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="结束日期"
              className="p-2 border rounded"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm">
              确定
            </button>
          </div>
        )}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex justify-between items-center border-b px-4 py-2">
            <div className="flex-grow flex justify-center space-x-2">
              <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-t-lg">全部</button>
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100">按老师查看</button>
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100">按小组查看</button>
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100">按学生查询</button>
            </div>
            <select className="px-2 py-1 text-xs border rounded">
              <option>全部模式</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学生/UID</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">督学时长</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">视频伴学</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作类型</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">流水类型</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">流水值</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作老师</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">扣减日期</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((record) => (
                  <tr key={record.id}>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">{record.studentName}/{record.uid}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{record.studyTime}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 bg-yellow-50">{record.videoStudyTime}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{record.operationType}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{record.flowType}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-red-500">{record.flowValue}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{record.operator}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">{formatDate(record.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-gray-50">
            <p className="text-xs text-gray-600">06-01~06-30日实际发生：督学时长 17小时 视频伴学 5小时小时</p>
            <p className="text-xs text-green-600 mt-1">06-01~06-30日实际扣减：课时3小时3分 课次2次 畅学 1天</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseHoursRecord;