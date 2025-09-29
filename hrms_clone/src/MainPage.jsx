import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function MainPage() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);

  // Dummy Data (replace with API)
  useEffect(() => {
    setEmployees([
      {
        id: 1,
        status: "Active",
        name: "Pallavi Prakash Sawant",
        code: "EMP001235",
        department: "AI",
        designation: "Manager",
        phone: "9865874563",
        manager: "N/A",
      },
      {
        id: 2,
        status: "Active",
        name: "Saurabh S Rawool",
        code: "EMP001236",
        department: "AI",
        designation: "Manager",
        phone: "9658745632",
        manager: "Pallavi Sawant",
      },
    ]);
  }, []);

  const skills = ["AI", "IT", "Admin", "HR"];

  // Action Buttons
  const actionBodyTemplate = () => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-eye" className="p-button-rounded p-button-success p-button-outlined" tooltip="View" />
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-button-outlined" tooltip="Edit" />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-outlined" tooltip="Delete" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 🔹 Top Bar (Buttons + Filters) */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          {/* Show Deleted Employees Button */}
          <Button
            label={showDeleted ? "Hide Deleted Employees" : "Show Deleted Employees"}
            icon="pi pi-user-minus"
            className="p-button-outlined p-button-secondary"
            onClick={() => setShowDeleted(!showDeleted)}
          />

          {/* Skills Dropdown */}
          <Dropdown
            value={selectedSkill}
            options={skills.map((s) => ({ label: s, value: s }))}
            onChange={(e) => setSelectedSkill(e.value)}
            placeholder="-- Select Skills --"
            className="w-60"
          />

          {/* Search Box */}
          <span className="p-input-icon-left w-80">
            <i className="pi pi-search" />
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Keyword Search"
              className="w-full"
            />
          </span>

          {/* Add New Employee Button */}
          <Button
            label="Add New Employee"
            icon="pi pi-plus"
            className="px-5 py-2 text-white font-medium rounded-md shadow-md"
            style={{
              background: "linear-gradient(90deg, #36d1dc, #5b86e5)", // 🔵 gradient
              border: "none",
            }}
          />
        </div>
      </div>

      {/* 🔹 Employee Table */}
      <DataTable value={employees} paginator rows={5} responsiveLayout="scroll">
        <Column field="status" header="Status" sortable />
        <Column field="name" header="Name" sortable />
        <Column field="code" header="Employee Code" sortable />
        <Column field="department" header="Department" sortable />
        <Column field="designation" header="Designation" sortable />
        <Column field="phone" header="Phone Number" sortable />
        <Column field="manager" header="Manager" sortable />
        <Column body={actionBodyTemplate} header="View / Edit / Delete" />
      </DataTable>
    </div>
  );
}
