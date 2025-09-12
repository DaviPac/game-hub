import { Routes, Route } from "react-router"
import { Auth } from "../pages/AuthPage"
import { ProtectedRoute } from "../components/ProtectedRoute"
import { HomePage } from "../pages/HomePage"
import { TermoPage } from "../games/termo/TermoPage"
import AnglePageRefactor from "../games/angle/AnglePageRefactor"
import AdminPage from "../pages/AdminPage"

export function AppRoutes() {
    return <Routes>
        <Route path="login" element={<Auth />} />
        <Route path="/" element={
            <ProtectedRoute>
                <HomePage />
            </ProtectedRoute>
        } />
        <Route path="/termo" element={
            <ProtectedRoute>
                <TermoPage />
            </ProtectedRoute>
        } />
        <Route path="/angle" element={
            <ProtectedRoute>
                <AnglePageRefactor />
            </ProtectedRoute>
        } />
        <Route path="/admin" element={
            <ProtectedRoute>
                <AdminPage />
            </ProtectedRoute>
        } />
    </Routes>
}