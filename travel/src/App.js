import './index.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from './Mycomponents/Home.jsx';
import LoginPage from './Mycomponents/auth/login/LoginPage.jsx';
import SignUpPage from './Mycomponents/auth/signup/SignUpPage.jsx';
import Sidebar from './Mycomponents/sidebar.jsx';
import ProfilePage from './Mycomponents/Profile.jsx';
import NotificationPage from './Mycomponents/NotificationPage.jsx';
import RightPanel from  './Mycomponents/RightPanel.jsx'
import Header from './Mycomponents/Header.jsx';
import Explore from './Mycomponents/Explore.js';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './common/LoadingSpinner.jsx';

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
    <Header/>
    <div className='flex max-w-full mx-0 '>
    {!hideSidebarAndRightPanel && <Sidebar/>}
    <Routes>
      <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
      <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
      <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/" />}/>
      <Route path="/profile/:username" element={authUser ? <ProfilePage/> : <Navigate to="/login" />}/>
      <Route path="/Notifications" element={authUser ? <NotificationPage/> : <Navigate to="/login" />}/>
      <Route path="/Explore" element={authUser ? <Explore/> : <Navigate to="/login" />}/>
    </Routes>
    {!hideSidebarAndRightPanel && <RightPanel/>}
    <Toaster/>
     </div>
    </>
  );
}

export default App;
