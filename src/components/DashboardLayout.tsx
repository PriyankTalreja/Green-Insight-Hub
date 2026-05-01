import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DashboardLayout = () => (
  <div className="min-h-screen flex flex-col bg-[hsl(var(--ey-grey-1))]">
    <Header />
    <main className="flex-1 container mx-auto px-6 py-8">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default DashboardLayout;
