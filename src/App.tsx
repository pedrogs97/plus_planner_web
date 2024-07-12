import { Login, Dashboard } from '@/pages'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Providers } from './providers'

function App() {
  return (
    <Router>
        <Providers>
            <Routes>
                <Route path="/login" element={<Login />} />
                
                {/* Place new routes over this */}
                <Route path="/app/*" element={<Dashboard />} />

                <Route path="*" element={<Navigate to="/login" replace />}/> 

            </Routes>
        </Providers>
    </Router> 
  )
}

export default App
