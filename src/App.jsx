import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, Product, Princing, NotFound, AppLayout, Login } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Princing />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
