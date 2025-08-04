import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useAllServices } from "@/context/allServicesContext";

type Props = {
  type: "doctor" | "lab" | "technician" | "company";
  onClose: () => void;
};

const CompanyForm = ({ type, onClose }: Props) => {
  const { addCompany } = useAllServices();
  const [form, setForm] = useState({
    name: '',
    description: '',
    address: '',
    phone_number: '',
    email: '',
    website: '',
    imageUrl: '',
    coverUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.phone_number || !form.email || !form.address) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    addCompany(form);
    setLoading(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        placeholder="Company Name"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        required
      />
      <Input
        placeholder="Phone Number"
        value={form.phone_number}
        onChange={(e) => setForm((prev) => ({ ...prev, phone_number: e.target.value }))}
        required
      />
      <Input
        type="email"
        placeholder="email"
        value={form.email}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        required
      />
      <Input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
      />
      <Input
        placeholder="Website URL"
        value={form.website}
        onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
      />
      <Input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
        required
      />
      <Input
        placeholder="image url"
        value={form.imageUrl}
        onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
      />
      <Input
        placeholder="cover url"
        value={form.coverUrl}
        onChange={(e) => setForm((prev) => ({ ...prev, coverUrl: e.target.value }))}
      />
      {/* type is hidden/auto-assigned */}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" disabled={loading} variant="primary">
        {loading ? "Adding..." : `Add ${type === "company" ? "Company (Clinic)" : type.charAt(0).toUpperCase() + type.slice(1)}`}
      </Button>
    </form>
  );
};

export default CompanyForm; 