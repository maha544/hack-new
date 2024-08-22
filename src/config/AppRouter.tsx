import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import HomePage from "../screens/home";
import BookingScreen from "../screens/booking/booking";
import InventoryScreen from "../screens/inventory/inventoryScr";
import PaymentScreen from "../screens/payment/payment";
import ReportScreen from "../screens/report/reportScr";
import ServiceScreen from "../screens/service/serviceScreens";
import StaffScreen from "../screens/staff/staff";
import PersistentDrawerLeft from "../components/dashboard";
import CustomerList from "../screens/customer/customerList";
import Room from "../screens/room/room";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="dashboard" element={<PersistentDrawerLeft />}>
          <Route path="booking" element={<BookingScreen />} />
          <Route path="customer" element={<CustomerList />} />
          <Route path="inventory" element={<InventoryScreen />} />
          <Route path="payment" element={<PaymentScreen />} />
          <Route path="report" element={<ReportScreen />} />
          <Route path="room" element={<Room />} />
          <Route path="service" element={<ServiceScreen />} />
          <Route path="staff" element={<StaffScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
