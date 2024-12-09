import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Signup from './component/Signup/Signup';
import Login from './component/Login/Login';
import MainPage from './component/MainPage/MainPage';
import Detail from './component/Details/Detail';
import Navbar from './component/Navbar/Navbar';
import Loader from './component/Loader/Loader';
import Profile from './component/Profile/Profile';
import Editinfo from './component/EditInfo/EditInfo';
import Seller from './component/Seller/Seller';
import Confirm from './component/Confirm/Confirm';
import Basket from './component/Basket/Basket';
import Address from './component/AddNewAddress/Address';
import Delivery from './component/Delivery/Delivery';
import Contact from './component/Contact/Contact';
import Footer from './component/Footer/Footer';
import History from './component/History/History';
import Faq from './component/FAQ/Faq';
import Password from './component/Change Password/Password';
import Firstpage from './component/FirstPage/Firstpage';
import Privacy from './component/Privacy/Privacy';
const token =await localStorage.getItem('token');

const router = createBrowserRouter([
  {
    path: '/',
    element:!token?<Firstpage/>: <Navigate replace to="mainpage" />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'mainpage',
    element: token ? <MainPage /> : <Navigate replace to="/" />,
  },
  {
    path: 'details',
    element: token ? <Detail /> : <Navigate replace to="/" />,
  },
  {
    path: 'profile',
    element: token ? <Profile /> : <Navigate replace to="/" />,
  },
  {
    path: 'editinfo',
    element: token ? <Editinfo /> : <Navigate replace to="/" />,
  },
  {
    path: 'loading',
    element: token ? <Loader /> : <Navigate replace to="/" />,
  },
  {
    path: 'confirmed',
    element: token ? <Confirm /> : <Navigate replace to="/" />,
  },
  {
    path: 'sell',
    element: token ? <Seller /> : <Navigate replace to="/" />,
  },
  {
    path: 'yourbasket',
    element: token ? <Basket /> : <Navigate replace to="/" />,
  },
  {
    path: 'order',
    element: token ? <Delivery /> : <Navigate replace to="/" />,
  },
  {
    path: 'addnewaddress',
    element: token ? <Address /> : <Navigate replace to="/" />,
  },
  {
    path: 'contact',
    element: token ? <Contact /> : <Navigate replace to="/" />,
  },
  {
    path: 'orderhistory',
    element: token ? <History /> : <Navigate replace to="/" />,
  },
  {
    path: 'faq',
    element: <Faq /> ,
  },
  {
    path: 'change-password',
    element: token ? <Password /> : <Navigate replace to="/" />,
  },
  {
    path: 'terms-and-condition',
    element: <Privacy/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

reportWebVitals();
