import './index.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from './Mycomponents/Home.jsx';
import LoginPage from './Mycomponents/auth/login/LoginPage.jsx';
import SignUpPage from './Mycomponents/auth/signup/SignUpPage.jsx';
import Sidebar from './Mycomponents/sidebar.jsx';
import ProfilePage from './Mycomponents/Profile.jsx';
import NotificationPage from './Mycomponents/NotificationPage.jsx';
import RightPanel from './Mycomponents/RightPanel.jsx';
import Header from './Mycomponents/Header.jsx';
import Explore from './Mycomponents/Explore.js';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './common/LoadingSpinner.jsx';
import Travelpage from './Mycomponents/travelpage.jsx';
import HariharFort from './Mycomponents/HariharFort.jsx'; // Import the LocationDetails component
import ChadarTrek from './Mycomponents/ChadarTrek.jsx';
import ValleyOfFlowers from './Mycomponents/ValleyOfFlowers.jsx';
import Goa from './Mycomponents/Goa.jsx';
import Manali from './Mycomponents/Manali.jsx';
import Kochi from './Mycomponents/Kochi.jsx';
import CommunityPage from './Mycomponents/Community.jsx';
import TravelDetails from './Mycomponents/travelDetails.js';
import TravelPackageDetails from './Mycomponents/travelpacks/travelPackagedetails.jsx';

function App() {
  const location = useLocation();

  const hideSidebarAndRightPanel = ['/login', '/signup'].includes(location.pathname);

  const { data: authUser, isLoading } = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className='flex max-w-full mx-0 '>
        {!hideSidebarAndRightPanel && <Sidebar />}
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/Notifications" element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
          <Route path="/Explore" element={authUser ? <Explore /> : <Navigate to="/login" />} />
          <Route path="/travel" element={authUser ? <Travelpage />: <Navigate to="/login" />} />
          <Route path="/community" element={authUser ? <CommunityPage userId={authUser.id}/> : <Navigate to ="/login" />}/>
          <Route path="/travel/:id" element={authUser ?<TravelDetails  />: <Navigate to="/login" />} /> {/* Add route for location details */}
          <Route path="/travel/harihar-fort" element={authUser ?<HariharFort />: <Navigate to="/login" />} />
          <Route path="/travel/chadar-trek" element={authUser ?<ChadarTrek />: <Navigate to="/login" />} />
          <Route path="/travel/valley-of-flowers" element={authUser ?<ValleyOfFlowers />: <Navigate to="/login" />} />
          <Route path="/travel/goa" element={authUser ?<Goa />: <Navigate to="/login" />}/>
          <Route path="/travel/manali" element={authUser ?<Manali />: <Navigate to="/login" />} />
          <Route path="/travel/kochi" element={authUser ?<Kochi />: <Navigate to="/login" />} />
          <Route path="/community/:communityId" element={authUser ? <CommunityPage userId={authUser.id}/> : <Navigate to ="/login" />}/>
          <Route path="/community/:userId" element={authUser ? <CommunityPage userId={authUser.id}/> : <Navigate to ="/login" />}/>
          <Route path="/packages/:id" element={authUser ?<TravelPackageDetails />: <Navigate to="/login" />} /> 
          {/* <Route path="/packages/goa-beach-getaway" element={authUser ?<GoaBeachgetaway />: <Navigate to="/login" />} /> */}
          <Route path="/Explore/:id" element={<Explore />} />
        </Routes>
        {!hideSidebarAndRightPanel && <RightPanel />}
        <Toaster />
      </div>
    </>
  );
}

export default App;
