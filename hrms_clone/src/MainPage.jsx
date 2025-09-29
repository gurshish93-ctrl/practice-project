import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import api from "./api"; // Import the authenticated API client
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees/");
        setEmployees(response.data);
      } catch (err) {
        setError("Failed to fetch employees.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillOptions = [
    { label: "All", value: null },
    { label: "Administrator", value: "Administrator" },
    { label: "CA", value: "CA" },
    { label: "Manager", value: "Manager" },
  ];

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-eye" rounded outlined severity="info" />
      <Button icon="pi pi-pencil" rounded outlined severity="warning" />
      <Button icon="pi pi-trash" rounded outlined severity="danger" />
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-3 text-2xl font-bold">Employee List</h2>

      {/* Toolbar */}
      <Toolbar
        left={
          <Button label="Show Deleted Employees" icon="pi pi-trash" className="p-button-info" />
        }
        right={
          <div className="flex gap-2">
            <Dropdown
              value={selectedSkill}
              options={skillOptions}
              onChange={(e) => setSelectedSkill(e.value)}
              placeholder="-- Select Skills --"
            />
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                type="search"
                onInput={(e) => setGlobalFilter(e.target.value)}
                placeholder="Keyword Search"
              />
            </span>
            <Button label="Add New Employee" icon="pi pi-plus" className="p-button-success" />
          </div>
        }
      />

      {/* DataTable */}
      <DataTable
        value={employees}
        paginator
        rows={5}
        globalFilter={globalFilter}
        responsiveLayout="scroll"
        className="mt-4"
      >
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
