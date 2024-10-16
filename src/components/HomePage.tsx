import React from 'react'
import Header from './Header'
import OperationOverview from './OperationOverview'
import TeacherPerformance from './TeacherPerformance'
import InsightCard from './InsightCard'

const HomePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-2 py-2">
        <div className="mb-2">
          <OperationOverview />
        </div>
        <div className="space-y-2">
          <TeacherPerformance />
          <InsightCard />
        </div>
      </main>
    </div>
  )
}

export default HomePage