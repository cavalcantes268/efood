import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Perfil from './pages/Perfil'

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurante/:id" element={<Perfil />} />
    </Routes>
  )
}