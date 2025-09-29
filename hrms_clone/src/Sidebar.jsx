// Sidebar.js
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

export default function Sidebar({ onLogout }) {
  return (
    <div className="h-screen w-64 bg-white border-r shadow-sm flex flex-col">
      {/* Menu */}
      <nav className="flex-1 p-4">
        {/* Logo / Title */}
        <div className="font-bold text-lg mb-4 border-b pb-2">Softlabs HRMS</div>

        <ul className="space-y-4 text-gray-700">
          <li>
            <Link to="/dashboard" className="flex items-center gap-2">
              <i className="pi pi-home"></i> Dashboard
            </Link>
          </li>

          <li>
            <p className="font-semibold mb-2">Employee</p>
            <ul className="ml-4 space-y-2">
              <li>
                <Link to="/employee/list" className="flex items-center gap-2">
                  <i className="pi pi-list"></i> List
                </Link>
              </li>
              <li>
                <Link
                  to="/employee/evaluation"
                  className="flex items-center gap-2"
                >
                  <i className="pi pi-chart-line"></i> Employee Evaluation
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/recruitment" className="flex items-center gap-2">
              <i className="pi pi-briefcase"></i> Recruitment
            </Link>
          </li>

          <li>
            <Link to="/daily-updates" className="flex items-center gap-2">
              <i className="pi pi-calendar"></i> Daily Updates
            </Link>
          </li>

          <li>
            <Link to="/leaves" className="flex items-center gap-2">
              <i className="pi pi-calendar-times"></i> Leaves
            </Link>
          </li>

          <li>
            <Link to="/salary-slips" className="flex items-center gap-2">
              <i className="pi pi-money-bill"></i> Salary Slips
            </Link>
          </li>

          <li>
            <Link to="/all-salary-slips" className="flex items-center gap-2">
              <i className="pi pi-file"></i> ALL Salary Slips
            </Link>
          </li>

          <li>
            <Link to="/reimbursement" className="flex items-center gap-2">
              <i className="pi pi-wallet"></i> Reimbursement
            </Link>
          </li>

          <li>
            <Link to="/masters" className="flex items-center gap-2">
              <i className="pi pi-cog"></i> Masters
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 mt-auto border-t">
        <Button 
          label="Logout"
          icon="pi pi-sign-out" 
          className="w-full p-button-danger" 
          onClick={onLogout} 
        />
      </div>
    </div>
  );
}