import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Button } from "primereact/button";

export default function Layout({ onLogout }) {
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {visible && <Sidebar onLogout={onLogout} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="h-14 flex items-center px-4 border-b shadow-sm bg-white">
          {/* Hamburger button */}
          <Button
            icon="pi pi-bars"
            className="p-button-rounded p-button-text p-button-plain"
            onClick={() => setVisible(!visible)}
          />
        </div>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
