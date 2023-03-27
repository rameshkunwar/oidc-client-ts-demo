import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAuth } from 'react-oidc-context';
import { UserManager } from 'oidc-client-ts';
import { Route, Routes } from 'react-router';
import { About, Home } from './components/Home';
import ErrorPage from './components/Errorpage';

function App() {
  const auth = useAuth();

  const [count, setCount] = useState(0)

  const handleLogOut = (e: React.MouseEvent) => {
    e.preventDefault();
    // auth.removeUser();
    // auth.revokeTokens();
    auth.signoutRedirect();
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Home />} errorElement={<ErrorPage />} />
        <Route path='/about' element={<About />} errorElement={<ErrorPage />} />
      </Routes>

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>You are logged in as  {auth.user?.profile.email} </h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs" role={"link"}>
        <h5 onClick={(e) => handleLogOut(e)}>Log out</h5>
      </p> */}
    </div>
  )
}

export default App
