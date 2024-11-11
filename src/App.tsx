import { Login } from '@/pages'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Providers } from './providers'
import { Toaster } from "react-hot-toast"
import { Layout } from './layouts'

function App() {
  return (
    <>
      <Router>
          <Providers>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  
                  {/* Place new routes over this */}
                  <Route path="/app/*" element={<Layout />} />

                  <Route path="*" element={<Navigate to="/login" replace />}/> 

              </Routes>
          </Providers>
      </Router> 
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'alert',
          success: {
            className: 'alert alert-success',
          },
          error: {
            className: 'alert alert-error',
          }
        }}
        />
    </>
  )
}

export default App
