import React, { Suspense } from 'react'
import { Navigate, Route, Routes, useRoutes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import Test from 'src/views/pages/Test/Test'

const AppContent = () => {
  let element = useRoutes(routes)
  // console.log(element)
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        {element}

        <Routes>
          {/* <Route path="/" element={<Outlet />}>
            <Route path="products" element={<Outlet />}>
              <Route index element={<Test />} />
              <Route path="list" element={<Test />} />
              <Route path="add" element={<Test />} />
            </Route>
          </Route> */}
          {/* {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })} */}
          <Route path="/" element={<Navigate to="products" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
