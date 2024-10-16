import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ChevronDown, ArrowLeft } from 'lucide-react'
import FunctionMenu from './FunctionMenu'

const Header: React.FC = () => {
  const [title, setTitle] = useState('状元教育督学首页')
  const [isEditing, setIsEditing] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleTitleClick = () => {
    setIsEditing(true)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleTitleBlur = () => {
    setIsEditing(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-3 text-white hover:text-blue-200 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              className="text-lg font-bold bg-transparent border-b-2 border-white outline-none focus:border-blue-300 transition-colors duration-200"
              autoFocus
            />
          ) : (
            <h1 className="text-lg font-bold cursor-pointer hover:text-blue-200 transition-colors duration-200" onClick={handleTitleClick}>
              {title}
            </h1>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Link 
            to="/course-hours" 
            className="flex items-center bg-white text-blue-600 hover:bg-blue-100 font-medium text-xs py-1.5 px-3 rounded-full transition-colors duration-200"
          >
            <Clock className="w-3 h-3 mr-1" />
            <span>课时管理</span>
          </Link>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center bg-blue-500 hover:bg-blue-400 text-white font-medium text-xs py-1.5 px-3 rounded-full transition-colors duration-200"
            >
              <span className="mr-1">更多</span>
              <ChevronDown className="w-2 h-2" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10">
                <FunctionMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header