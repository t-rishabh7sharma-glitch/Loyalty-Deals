import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CustomerLayout } from "./components/customer/CustomerLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminCategoriesPage } from "./pages/admin/AdminCategoriesPage";
import { AdminDealsPage } from "./pages/admin/AdminDealsPage";
import { AdminHomePage } from "./pages/admin/AdminHomePage";
import { AdminMerchantsPage } from "./pages/admin/AdminMerchantsPage";
import { AdminProductsPage } from "./pages/admin/AdminProductsPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AgentHomePage } from "./pages/agent/AgentHomePage";
import { AgentMerchantsPage } from "./pages/agent/AgentMerchantsPage";
import { AgentMonitorPage } from "./pages/agent/AgentMonitorPage";
import { AgentPipelinePage } from "./pages/agent/AgentPipelinePage";
import { CustomerBrowsePage } from "./pages/customer/CustomerBrowsePage";
import { CustomerCashbackPage } from "./pages/customer/CustomerCashbackPage";
import { CustomerCategoryPage } from "./pages/customer/CustomerCategoryPage";
import { CustomerCouponDetailPage } from "./pages/customer/CustomerCouponDetailPage";
import { CustomerCouponsPage } from "./pages/customer/CustomerCouponsPage";
import { CustomerDealDetailPage } from "./pages/customer/CustomerDealDetailPage";
import { CustomerHome } from "./pages/customer/CustomerHome";
import { CustomerNearbyPage } from "./pages/customer/CustomerNearbyPage";
import { CustomerPointsPage } from "./pages/customer/CustomerPointsPage";
import { CustomerProfilePage } from "./pages/customer/CustomerProfilePage";
import { CustomerReferPage } from "./pages/customer/CustomerReferPage";
import { CustomerScratchPage } from "./pages/customer/CustomerScratchPage";
import { LoginPage } from "./pages/LoginPage";
import { MerchantCategoriesPage } from "./pages/merchant/MerchantCategoriesPage";
import { MerchantCouponsPage } from "./pages/merchant/MerchantCouponsPage";
import { MerchantDealsPage } from "./pages/merchant/MerchantDealsPage";
import { MerchantHomePage } from "./pages/merchant/MerchantHomePage";
import { MerchantProductsPage } from "./pages/merchant/MerchantProductsPage";
import { PortalPage } from "./pages/PortalPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/portal" element={<PortalPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="admin">
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/partners"
            element={
              <ProtectedRoute role="admin">
                <AdminMerchantsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/merchants" element={<Navigate to="/admin/partners" replace />} />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute role="admin">
                <AdminProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute role="admin">
                <AdminCategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/deals"
            element={
              <ProtectedRoute role="admin">
                <AdminDealsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/merchant"
            element={
              <ProtectedRoute role="merchant">
                <MerchantHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/merchant/products"
            element={
              <ProtectedRoute role="merchant">
                <MerchantProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/merchant/categories"
            element={
              <ProtectedRoute role="merchant">
                <MerchantCategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/merchant/deals"
            element={
              <ProtectedRoute role="merchant">
                <MerchantDealsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/merchant/coupons"
            element={
              <ProtectedRoute role="merchant">
                <MerchantCouponsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/agent"
            element={
              <ProtectedRoute role="agent">
                <AgentHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent/pipeline"
            element={
              <ProtectedRoute role="agent">
                <AgentPipelinePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent/monitor"
            element={
              <ProtectedRoute role="agent">
                <AgentMonitorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent/merchants"
            element={
              <ProtectedRoute role="agent">
                <AgentMerchantsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/app"
            element={
              <ProtectedRoute role="customer">
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CustomerHome />} />
            <Route path="browse" element={<CustomerBrowsePage />} />
            <Route path="nearby" element={<CustomerNearbyPage />} />
            <Route path="points" element={<CustomerPointsPage />} />
            <Route path="cashback" element={<CustomerCashbackPage />} />
            <Route path="refer" element={<CustomerReferPage />} />
            <Route path="scratch" element={<CustomerScratchPage />} />
            <Route path="category/:categoryId" element={<CustomerCategoryPage />} />
            <Route path="coupons" element={<CustomerCouponsPage />} />
            <Route path="coupons/:couponId" element={<CustomerCouponDetailPage />} />
            <Route path="deals/:dealId" element={<CustomerDealDetailPage />} />
            <Route path="profile" element={<CustomerProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
