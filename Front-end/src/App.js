import { Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/mainpages/Home';
import Login from './pages/Forms/Login';
import SignUp from './pages/Forms/Sign-up';
import WorkSpaces from './pages/mainpages/WorkSpaces';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import CreateOffer from './pages/Forms/CreateOffer';
import OfferList from './pages/mainpages/OfferList';
import Dashboard from './pages/AdminPages/Dashboard';
import DiscoverAdmin from './pages/AdminPages/DiscoverAdmin';
import OfferAdmin from './pages/AdminPages/OfferAdmin';
import CreateFullWorkSpace from './pages/Forms/CreateFullWorkSpace';
import RequireAuth from './components/RequireAuth';
import ProfileManager from './components/ProfileData/ProfileManager';
import WorkSpaceProfile from './pages/WorkSpaceProfile/WorkSpaceProfile';
import RoomList from './pages/WorkSpaceProfile/RoomList';
import CreateRoom from './pages/Forms/CreateRoom';
import Requests from './pages/Requests';
import BookingRoom from './pages/WorkSpaceProfile/BookingRoom';
import EventsWorshops from './pages/mainpages/EventsWorkshops';
import Books from './pages/Books';
import CreateEvent from './pages/Forms/CreateEvent';
import Favourites from './pages/Favourites';
import PortalLogin from './pages/Forms/PortalLogin';
import EmailAuthentication from './pages/Forms/EmailAuthentication';
import ForgotPassword from './pages/Forms/ForgetPassword';
import ResetPassword from './pages/Forms/ResetPassword';
import ScrolltoTop from './components/ScrollToTop';
import PersonalInformation from './pages/ProfilePages/PersonalInformation';
import WorkSpaceSettings from './pages/ProfilePages/WorkSpaceSettings';
import RoomsSettings from './pages/ProfilePages/RoomsSettings';
import OffersSettings from './pages/ProfilePages/OffersSettings';
import EventsSettings from './pages/ProfilePages/EventsSettings';
import Moderators from './pages/ProfilePages/Moderators';
import AdjustRoom from './pages/ProfilePages/AdjustRoom';
import AdjustOffer from './pages/ProfilePages/AdjustOffer';
import AdjustEvent from './pages/ProfilePages/AdjustEvent';
import Payment from './pages/Payment';
import Review from './pages/Review';
import AboutUs from './pages/mainpages/AboutUs';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import AdjustModerator from './pages/ProfilePages/AdjustModerator';
import ClientRequests from './pages/ProfilePages/ClientRequests';
import ClientBookings from './pages/ProfilePages/ClientBooks';
import EventAdmin from './pages/AdminPages/eventAdmin';
import CancelBook from './pages/CancelBook';
import TermsAndConditions from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
function App() {
  return (
    <>
      <ScrolltoTop />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='aboutus' element={<AboutUs />}></Route>
        <Route path='termsofservice' element={<TermsAndConditions />}></Route>
        <Route path='privacypolicy' element={<PrivacyPolicy />}></Route>
        <Route path='portal-login' element={<PortalLogin />}></Route>
        <Route path='sign-up' element={<SignUp />}></Route>
        <Route path='email authentication' element={<EmailAuthentication />}></Route>
        <Route path='forgotPassword' element={<ForgotPassword />}></Route>
        <Route path='resetpassword' element={<ResetPassword />}></Route>
        <Route path='workspaces' element={<><Outlet /></>}>
          <Route path="" element={<WorkSpaces />} />
          <Route path=":cwID" element={<WorkSpaceProfile />} />
        </Route>
        <Route path='offers' element={<OfferList />}></Route>
        <Route path='events&workshops' element={<EventsWorshops />}></Route>
        <Route element={<RequireAuth allowedRoles={["client"]} />} >
          <Route path='workspaces/:cwID/rooms' element={<><Outlet /></>}>
            <Route path="" element={<RoomList />} />
            <Route path=":roomid" element={<BookingRoom />} />
          </Route>
          <Route path='favourites' element={<Favourites />}></Route>
          <Route path='payment' element={<Payment />}></Route>
          <Route path='reviewbook' element={<Review />}></Route>
          <Route path='cancelbook' element={<CancelBook />}></Route>
          <Route element={<ProfileManager />} >
            <Route path='client-requests' element={<ClientRequests />}></Route>
            <Route path='client-books' element={<ClientBookings />}></Route>
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["owner", "moderator"]} />} >
          <Route path='requests' element={<Requests />}></Route>
          <Route path='books' element={<Books />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["owner", "client", "moderator"]} />} >
          <Route element={<ProfileManager />} >
            <Route path='personal-information' element={<PersonalInformation />}></Route>
          </Route>
          <Route path='discoverEdit' element={<DiscoverAdmin />}></Route>
          <Route path='offerEdit' element={<OfferAdmin />}></Route>
          <Route path='eventEdit' element={<EventAdmin />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["owner"]} />} >
          <Route element={<ProfileManager />} >
            <Route path='workspace-data' element={<WorkSpaceSettings />}></Route>
            <Route path='rooms-data' element={<><Outlet /></>}>
              <Route path="" element={<RoomsSettings />} />
              <Route path=":roomid" element={<AdjustRoom />} />
            </Route>
            <Route path='offers-data' element={<><Outlet /></>}>
              <Route path="" element={<OffersSettings />} />
              <Route path=":offerid" element={<AdjustOffer />} />
            </Route>
            <Route path='events&workshops-data' element={<Outlet />}>
              <Route path="" element={<EventsSettings />} />
              <Route path=":eventid" element={<AdjustEvent />} />
            </Route>
          </Route>
          <Route element={<ProfileManager />} >
            <Route path='moderators' element={<><Outlet /></>}>
              <Route path="" element={<Moderators />} />
              <Route path=":moderid" element={<AdjustModerator />} />
            </Route>
          </Route>
          <Route path='createworkspace' element={<CreateFullWorkSpace />}></Route>
          <Route path='createOffer' element={<CreateOffer />}></Route>
          <Route path='createRoom' element={<CreateRoom />}></Route>
          <Route path='createEvent' element={<CreateEvent />}></Route>
        </Route>
        <Route path='dashboard' element={<Dashboard />}></Route>
        <Route path='faQs' element={<FAQs />}></Route>
        <Route path='contact' element={<Contact />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
