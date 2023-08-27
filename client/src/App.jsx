import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Shop } from "./components/Shop/Shop";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Basket } from "./components/Basket/Basket";
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration'
import { DevicePage } from './components/DevicePage/DevicePage';
import { Admin } from './components/Admin/Admin';
import { NotFound } from "./components/NotFound/NotFound";
import { CurrentUserContext } from "./context/CurrentUserContext";

export function App() {
  const type = [
    { type: 'Холодильники' },
    { type: 'Смартфоны' },
    { type: 'Ноутбуки' },
  ];
  const brands = [
    { brand: 'LG' },
    { brand: 'Apple' },
    { brand: 'Samsung' },
    { brand: 'Nokia' },
  ];
  const device = [
    { id: 0, device: 'IPhone 12 Pro' },
    { id: 1, device: 'Galaxy S10' },
    { id: 2, device: 'IPhone 12 Pro Max' },
    { id: 3, device: 'Galaxy S21' },
    { id: 4, device: 'Nokia 3310' },
    { id: 5, device: 'IPhone 13 Pro' },
    { id: 6, device: 'Galaxy S15' },
    { id: 7, device: 'Galaxy S10 Pro' },
  ]
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path='/'
            element={<Shop loggedIn={loggedIn} setLoggedIn={setLoggedIn} type={type} device={device} brands={brands} />}
          />
          <Route
            path="/basket"
            element={
              <ProtectedRoute
                element={Basket}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/registration'
            element={<Registration />}
          />
          <Route
            path='/device/:id'
            element={<DevicePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} device={device} />}
          />
          <Route
            path='/admin'
            element={<Admin types={type} brands={brands} />}
          />
          <Route
            path='/*'
            element={<NotFound />}
          />
        </Routes>
      </CurrentUserContext.Provider>
    </>

  );
}

export default App;