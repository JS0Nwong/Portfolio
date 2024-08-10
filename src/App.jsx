import { Route, Routes, } from 'react-router-dom'

import Home from './views/Home'
import Guestbook from './views/Guestbook'
import Craft from './views/Craft'
import Contact from './views/Contact'
import Menubar from './components/Menubar'
import Container from './components/Container'
import Error from './views/Error'

import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Container>
          <Menubar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guestbook" element={<Guestbook />} />
            <Route path="/craft" element={<Craft />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
