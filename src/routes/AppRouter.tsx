import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "./paths";

import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import OtpVerifyPage from "@/pages/OtpVerify/OtpVerifyPage";
import ForgotPasswordPage from "@/pages/ForgotPassword/ForgotPasswordPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import MarketPage from "@/pages/Market/MarketPage";
import ListingsPage from "@/pages/Listings/ListingsPage";
import StoragePage from "@/pages/Storage/StoragePage";
import ProfilePage from "@/pages/Profile/ProfilePage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<Navigate to={ROUTES.LOGIN} replace />}
        />

        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.OTP_VERIFY} element={<OtpVerifyPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.MARKET} element={<MarketPage />} />
        <Route path={ROUTES.LISTINGS} element={<ListingsPage />} />
        <Route path={ROUTES.STORAGE} element={<StoragePage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}