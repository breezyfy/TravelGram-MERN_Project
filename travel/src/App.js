import './index.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './Mycomponents/Home.jsx';
import LoginPage from './Mycomponents/auth/login/LoginPage.jsx';
import SignUpPage from './Mycomponents/auth/signup/SignUpPage.jsx';
import Sidebar from './Mycomponents/sidebar.jsx';
import ProfilePage from './Mycomponents/Profile.jsx';
import NotificationPage from './Mycomponents/NotificationPage.jsx';
import RightPanel from './Mycomponents/RightPanel.jsx';
import Header from './Mycomponents/Header.jsx';
import Travelpage from './Mycomponents/travelpage.jsx';
import LocationDetails from './Mycomponents/LocationDetails.jsx';
import HariharFort from './Mycomponents/HariharFort.jsx'; // Import the LocationDetails component
import ChadarTrek from './Mycomponents/ChadarTrek.jsx';
import ValleyOfFlowers from './Mycomponents/ValleyOfFlowers.jsx';
import Goa from './Mycomponents/Goa.jsx';
import Manali from './Mycomponents/Manali.jsx';
import Kochi from './Mycomponents/Kochi.jsx';

function App() {
  const location = useLocation();

  const hideSidebarAndRightPanel = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
      <Header />
      <div className='flex max-w-full mx-0 '>
        {!hideSidebarAndRightPanel && <Sidebar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/Notifications" element={<NotificationPage />} />
          <Route path="/travel" element={<Travelpage />} />
          <Route path="/travel/:id" element={<LocationDetails />} /> {/* Add route for location details */}
          <Route path="/travel/harihar-fort" element={<HariharFort />} />
          <Route path="/travel/chadar-trek" element={<ChadarTrek />} />
          <Route path="/travel/valley-of-flowers" element={<ValleyOfFlowers />} />
          <Route path="/travel/goa" element={<Goa />} />
          <Route path="/travel/manali" element={<Manali />} />
          <Route path="/travel/kochi" element={<Kochi />} />
          
        </Routes>
        {!hideSidebarAndRightPanel && <RightPanel />}
      </div>
    </>
  );
}

export default App;
