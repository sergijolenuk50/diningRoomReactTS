// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import CreateMenu from './components/CreateMenu'
// import { Layout } from 'antd'
import AppLayout from './components/Layouts'
import MenuInfo from './components/MenuInfo'
import MenuTable from './components/MenuTable'
import EditMenu from './components/EditMenu'
// import { ProtectedRoute } from './security/ProtectedRoute'

function App() {
  // const [count, setCount] = useState(0)

  return (
    // <>
    // <AppLayout />
    // </>
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<p>Home Page!</p>} />
        <Route path='/Menu' element={<MenuTable />} />
        <Route path='/Menu/:id' element={<MenuInfo />} />
        <Route path='/create' element={
          <CreateMenu />
          // <ProtectedRoute>
          // </ProtectedRoute>
        } />
        <Route path='/edit/:id' element={<EditMenu />} />
        <Route path='*' element={<p>Page Not Found!</p>} />
      </Route>
    </Routes>
  )
}

export default App
