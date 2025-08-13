// 'use client'
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import LabForm from "./LabForm";
import CompanyForm from "./CompanyForm";
import { useCompanystore } from "@/store/useCompanyStore";

const SERVICE_TYPES = [
  { type: "doctor", label: "Add Doctor" },
  { type: "lab", label: "Add Lab" },
  { type: "technician", label: "Add Technician" },
  { type: "company", label: "Add Company" },
];

const NewServiceBanner = ({ companies }: any) => {
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<null | "doctor" | "lab" | "technician" | "company">(null);
  let userRole = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
  const openTypeModal = () => {
    setIsTypeModalOpen(true);
    setSelectedType(null);
  };

  const handleTypeSelect = (type: "doctor" | "lab" | "technician" | "company") => {
    setIsTypeModalOpen(false);
    setSelectedType(type);
  };

  const handleFormClose = () => {
    setSelectedType(null);
  };

  let filteredServiceTypes = SERVICE_TYPES;

  if (companies?.length > 0) {
    filteredServiceTypes = SERVICE_TYPES.filter(
      (role) => role.type !== 'company'
    );
  }

  return (
    <>
      {/* 🟢 زر عائم في الزاوية اليمنى السفلية */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-5 py-3 rounded-full shadow-lg"
          onClick={openTypeModal}
        >
          <FaPlus />
          Add New Service
        </Button>
      </div>

      {/* 🟡 المودال لاختيار نوع الخدمة */}
      <Modal
        isOpen={isTypeModalOpen}
        closeModal={() => setIsTypeModalOpen(false)}
        title="Select Service Type"
      >
        <div className="flex flex-col gap-3 w-full mt-2">
          {filteredServiceTypes.filter((role) => userRole === 'admin' ? role.type : role.type === userRole).map((service) => (
            <Button
              key={service.type}
              className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-600"
              onClick={() => handleTypeSelect(service.type as any)}
            >
              {service.label}
            </Button>
          ))}
        </div>
      </Modal>

      {/* 🔵 مودال نموذج إضافة الخدمة */}
      <Modal
        isOpen={selectedType !== null}
        closeModal={handleFormClose}
        title={
          selectedType
            ? `Add New ${selectedType === "company"
              ? "Company"
              : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
            }`
            : ""
        }
      >
        {selectedType === 'lab' ?
          <LabForm onClose={handleFormClose} />
          : selectedType === 'company' ? <CompanyForm onClose={handleFormClose} />
            : null
        }
      </Modal>
    </>
  );
};

export default NewServiceBanner;


