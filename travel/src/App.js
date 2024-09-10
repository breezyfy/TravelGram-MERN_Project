import './index.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './Mycomponents/Home.jsx';
import LoginPage from './Mycomponents/auth/login/LoginPage.jsx';
import SignUpPage from './Mycomponents/auth/signup/SignUpPage.jsx';
import Sidebar from './Mycomponents/sidebar.jsx';
import ProfilePage from './Mycomponents/Profile.jsx';
import NotificationPage from './Mycomponents/NotificationPage.jsx';
import RightPanel from  './Mycomponents/RightPanel.jsx'
import Header from './Mycomponents/Header.jsx';

function App() {
  const location = useLocation();

  const hideSidebarAndRightPanel = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
    <Header/>
    <div className='flex max-w-full mx-0 '>
    {!hideSidebarAndRightPanel && <Sidebar/>}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/profile/:username" element={<ProfilePage/>}/>
      <Route path="/Notifications" element={<NotificationPage/>}/>
    </Routes>
    {!hideSidebarAndRightPanel && <RightPanel/>}
     </div>
    </>
  );
}

export default App;
