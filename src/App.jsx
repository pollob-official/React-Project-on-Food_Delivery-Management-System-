import { useState } from 'react'
import Layout from './layout/Layout'
import '@fortawesome/fontawesome-free/css/all.min.css';


import { BrowserRouter, Route, Routes } from 'react-router-dom'

import RoleList from './pages/roles/RoleList'
import CreateRole from './pages/roles/CreateRole'
import EditRole from './pages/roles/EditRole'

import UserList from './pages/users/UserList'
import CreateUser from './pages/users/CreateUser'

import Home from './pages/Dashboard/Home'

import OrderList from './pages/order/OrderList'
import CreateOrder from './pages/order/CreateOrder'
import EditOrder from './pages/order/EditOrder'

import CustomerList from './pages/customers/CustomerList'
import CreateCustomer from './pages/customers/CreateCustomer'
import EditCustomer from './pages/customers/EditCustomer'

import MenuItemList from './pages/menu_items/MenuitemList'
import CreateMenuItem from './pages/menu_items/CreateMenuItem'
import EditMenuItem from './pages/menu_items/EditMenuItem'

import RestaurantList from './pages/restaurant/RestaurantList'
import CreateRestaurant from './pages/restaurant/CreateRestaurant'
import EditRestaurant from './pages/restaurant/EditRestaurant'

import RiderList from './pages/rider/RiderList'
import CreateRider from './pages/rider/CreateRider'
import EditRider from './pages/rider/EditRider'
import OrderListResturant from './pages/order/OrderListResturant'

import TrackingList from './pages/tracking/TrackingList'


import OrderInvoice from './pages/orderdetails/OrderInvoice';
import RiderOrderList from './pages/order/RiderOrderList';
import Counter from './components/Counter';
import HeavyCalculation from './components/HeavyCalculation';
import ChildButton from './components/ChildButton';
import UseCallBack from './components/UseCallBack';
import Login from './login/login';
import LoginLayout from './login/LoginLayout'
import PrivateRoute from './route/PrivateRoute'
import EditUser from './pages/users/EditUser';






function App() {
  const user = {
    name: "admin",
    password: "12345",
    age:30,
    email: "admin@foodapp.com"
  }

  return (
    <>
    


       <BrowserRouter basename={import.meta.env.BASE_URL}>
         <Routes>

              <Route path='/login'   element={<Login/>}  />
              <Route path='/' element={<PrivateRoute><Layout/> </PrivateRoute>}>


               <Route path='/loginlayout' element={<LoginLayout/>} />

               <Route path='/' element={<Home/>} />
               <Route path='/role' element={<RoleList/>} />
               <Route path='/role/create' element={<CreateRole/>} />
               <Route path='/role/edit/:roleId' element={<EditRole/>} />

                

               <Route path='/user' element={<UserList/>} />
               <Route path='/user/create' element={<CreateUser/>} />
                <Route path="/user/edit/:userid" element={<EditUser/>} />
              
               <Route path='/order/edit/:orderId' element={<EditOrder/>} />
               <Route path='/customer' element={<CustomerList/>} />
               <Route path='/customer/create' element={<CreateCustomer/>} />
               <Route path='/customer/edit/:customerId' element={<EditCustomer/>} />
               <Route path='/menuitem' element={<MenuItemList/>} />
               <Route path='/menuitem/create' element={<CreateMenuItem/>} />
               <Route path='/menuitem/edit/:menuitemId' element={<EditMenuItem/>} />

               <Route path='/restaurant' element={<RestaurantList/>} />
               <Route path='/restaurant/create' element={<CreateRestaurant/>} />
               <Route path='/restaurant/edit/:restaurantId' element={<EditRestaurant/>} />
               <Route path='/restaurant/order/:restaurantId' element={<OrderListResturant/>} />
               

               <Route path='/rider' element={<RiderList/>} />
               <Route path='/rider/create' element={<CreateRider/>} />
               <Route path='/rider/edit/:riderId' element={<EditRider/>} />
               <Route path='/rider/order/:rider_id' element={<RiderOrderList/>} />

               <Route path='/tracking' element={<TrackingList/>} />

               <Route path='/order' element={<OrderList/>} />
               <Route path='/order/create' element={<CreateOrder/>} />
               <Route path="/order/invoice/:id" element={<OrderInvoice/>} />

               <Route path='/use/memo' element={<HeavyCalculation/>}/>
              <Route path='/counter' element={<Counter/>} />

              <Route path='/childbutton' element={<ChildButton/>} />
              <Route path='/callback' element={<UseCallBack/>} />


               




             </Route>
         </Routes>
       
       
       </BrowserRouter>
    </>
  )
}

export default App
