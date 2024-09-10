import './index.css';
import Sidebar from './Mycomponents/sidebar.jsx';
import RightPanel from  './Mycomponents/RightPanel.jsx'
import Header from './Mycomponents/Header.jsx';
import React from 'react'

export default function Main() {
  return (
    <> 
    <Header/>
    <div className="main-container">
        <Sidebar className="sidebar"/>
        <div className="main-content">Home Content</div>
        <RightPanel className="right-panel"/>
      </div>
    </>
  )
}
