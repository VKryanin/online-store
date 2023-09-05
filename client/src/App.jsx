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
  const [deviceTypes, setDeviceType] = useState()
  const [deviceBrand, setDeviceBrand] = useState();
  const [filter, setFilter] = useState()
  const [devices, setDevice] = useState();
  const isLogin = location.pathname === '/login';
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ? true : false,
  });

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
    deviceApi.getDevices()
      .then(setDevice)
      .catch(e => console.error(e))
  }

  useEffect(() => {
    deviceType()
    deviceBrands()
    device()
  }, [])

  useEffect(() => {
    filterDevice(filter)
  }, [filter])

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

  const handleAddType = async ({ name }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    const newType = await deviceApi.addType(name, token)
    try {
      setDeviceType(prev => ({
        ...prev,
        name: newType.name
      }))
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const handleAddBrand = async ({ name }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    const newBrand = await deviceApi.addBrand(name, token)
    try {
      setDeviceBrand(prev => ({
        ...prev,
        name: newBrand.name
      }))
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const handleAddDevice = async (data) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    try {
      let newDevice = await deviceApi.addDevice(data, token);
      setDevice(prev => ({
        ...prev,
        name: newDevice.name,
        price: newDevice.newPrice,
        img: newDevice.image,
        brandId: newDevice.brandId,
        typeId: newDevice.typeId,
        info: newDevice.info
      }))
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const getDevice = async (id) => {
    try {
      const deviceInfo = await deviceApi.getDevice(id);
      return deviceInfo
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const filterDevice = async (filter) => {
    try {
      deviceApi.getDevices(filter)
        .then(setDevice)
        .catch(e => console.error(e))
    } catch (error) {
      console.log(error.response.data.message);
    }
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
                  element={<Shop setCurrentUser={setCurrentUser} logout={logout} setFilter={setFilter} />}
                />
                <Route element={<ProtectedRoute />}>
                  <Route path="/basket" element={<Basket />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route
                    path='/admin'
                    element={
                      <Admin
                        handleAddType={handleAddType}
                        handleAddBrand={handleAddBrand}
                        handleAddDevice={handleAddDevice}
                        logout={logout}
                      />
                    }
                  />
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
                  element={<DevicePage setCurrentUser={setCurrentUser} getDevice={getDevice} logout={logout} />}
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