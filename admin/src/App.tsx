import './main.css'
import AppRoutes from './routes/app.route'
import AppProvider from './providers/app.provider'
function App() {

  return (
    <>
    <AppProvider>
      <AppRoutes/>
      </AppProvider>
    </>
  )
}

export default App
