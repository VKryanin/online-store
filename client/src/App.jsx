import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Shop } from "./components/Shop/Shop";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Basket } from "./components/Basket/Basket";
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration'
import { DevicePage } from './components/DevicePage/DevicePage';
import { Admin } from './components/Admin/Admin';
import { NotFound } from "./components/NotFound/NotFound";
import { CurrentUserContext } from "./context/CurrentUserContext";
import { DeviceTypeContext, DeviceBrandContext, DeviceContext } from "./context/DeviceContext";

import { userApi } from "./Api/userApi";
import { deviceApi } from './Api/deviceApi'
import { LOCAL_STORAGE_TOKEN_KEY } from "./utils/constants";
import { Profile } from "./components/Profile/Profile";

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ? true : false,
  });
  const [deviceTypes, setDeviceType] = useState()
  const [deviceBrand, setDeviceBrand] = useState();
  const [devices, setDevice] = useState();
  const isLogin = location.pathname === '/login';

  const deviceType = () => {
    deviceApi.getType()
      .then(setDeviceType)
      .catch(e => console.error(e))
  }

  const deviceBrands = () => {
    deviceApi.getBrand()
      .then(setDeviceBrand)
      .catch(e => console.error(e))
  }

  const device = () => {
    deviceApi.getDevice
      .then(setDevice)
      .catch(e => console.error(e))
  }

  useEffect(() => {
    deviceType()
    deviceBrands()
  }, [])

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      checkToken();
    }
  }, [currentUser.isLoggedIn]);

  const formAuth = async ({ email, password, name }) => {
    try {
      if (isLogin) {
        await userApi.singin({ email, password })
          .then(({ token }) => {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
            setCurrentUser(prev => ({ ...prev, isLoggedIn: true }))
            navigate('/', { replace: true })
          })
          .catch(e => console.log(e))
      } else {
        userApi.singup({ email, password, name })
      }
    }
    catch (e) {
      console.log(e.response.data.message);
    }
  }

  const checkToken = async () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      try {
        const userInfo = await userApi.getUserInfo(token);
        setCurrentUser(prev => ({
          ...prev,
          name: userInfo.name,
          email: userInfo.email,
          role: userInfo.role,
          isLoggedIn: true,
        }));

      } catch (error) {
        localStorage.clear();
        setCurrentUser(prev => ({
          ...prev,
          isLoggedIn: false,
        }));
      }
    }
  }

  const logout = () => {
    localStorage.clear();
    setCurrentUser({ isLoggedIn: false })
    navigate('/')
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser} >
        <DeviceTypeContext.Provider value={deviceTypes}>
          <DeviceBrandContext.Provider value={deviceBrand}>
            <DeviceContext.Provider value={devices}>
              <Routes>
                <Route
                  path='/'
                  element={<Shop setCurrentUser={setCurrentUser} logout={logout} />}
                />
                <Route element={<ProtectedRoute />}>
                  <Route path="/basket" element={<Basket />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
                <Route
                  path='/login'
                  element={<Login auth={formAuth} />}
                />
                <Route
                  path='/registration'
                  element={<Registration auth={formAuth} />}
                />
                <Route
              path='/device/:id'
              element={<DevicePage setCurrentUser={setCurrentUser}  />}
            />
                <Route
              path='/admin'
              element={<Admin />}
            />
                <Route
                  path='/*'
                  element={<NotFound />}
                />
              </Routes>
            </DeviceContext.Provider>
          </DeviceBrandContext.Provider>
        </DeviceTypeContext.Provider>
      </CurrentUserContext.Provider>
    </>

  );
}

export default App;