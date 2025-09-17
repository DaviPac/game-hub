import { Routes, Route } from "react-router"
import { Auth } from "../pages/AuthPage"
import { ProtectedRoute } from "../components/ProtectedRoute"
import { HomePage } from "../pages/HomePage"
import { TermoPage } from "../games/termo/TermoPage"
import AnglePage from "../games/angle/AnglePage"
import AdminPage from "../pages/AdminPage"
import ScoundrelPage from "../games/scoundrel/ScoundrelPage"
import ScrabblePage from "../games/scrabble/ScrabblePage"

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
                <AnglePage />
            </ProtectedRoute>
        } />
        <Route path="/admin" element={
            <ProtectedRoute>
                <AdminPage />
            </ProtectedRoute>
        } />
        <Route path="/scoundrel" element={
            <ProtectedRoute>
                <ScoundrelPage />
            </ProtectedRoute>
        } />
        <Route path="/scrabble" element={
            <ProtectedRoute>
                <ScrabblePage />
            </ProtectedRoute>
        } />
    </Routes>
}