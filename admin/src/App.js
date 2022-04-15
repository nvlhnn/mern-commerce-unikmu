import React, { Component, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function NonAuth() {
  const user = useSelector((state) => state.user)
  if (user.currentUser && !user.error) {
    console.log('ok')
    if (window.history.state?.usr) {
      return <Navigate to={window.history.state.usr} />
    } else {
      return <Navigate to="/products" />
    }
  } else {
    return <Outlet />
  }
  // return <Outlet />
  // return user.currentUser && !user.error ? <Navigate to="/" /> : <Outlet />;
}

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/" element={<NonAuth />}>
            <Route exact path="login" name="Login Page" element={<Login />} />
            <Route exact path="register" name="Register Page" element={<Register />} />
          </Route>
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
