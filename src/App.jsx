import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css'
import Home from "./components/Home";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import appStore from './Store/appStore'
import QuizPage from './components/QuizPage ';
const appRoute=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  }
  ,
  {
    path:'/quiz',
    element:<QuizPage/>
  }
])
function App() {

  return (
    <div className="bg-[#070916]">
      <Provider store={appStore}>

      <RouterProvider router={appRoute}></RouterProvider>
      </Provider>


    </div>
  )
}

export default App
