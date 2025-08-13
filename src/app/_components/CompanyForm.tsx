import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { toast } from "react-toastify";
import { useCompanystore } from "@/store/useCompanyStore";

type Props = {
  onClose: () => void;
};

const CompanyForm = ({ onClose }: Props) => {
  const { addCompany } = useCompanystore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget
    const formData = new FormData(form)

    const image = formData.get("imageUrl") as File;
    const cover = formData.get("coverUrl") as File;

    const atLeastOneFilled = [image, cover].some((f) => f && f.size > 0);

    if (!atLeastOneFilled) {
      toast.warning('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await addCompany(formData);
      onClose();
    } catch (err) {
      setError("Failed to add company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-115 overflow-auto">
      <Input
        placeholder="Company Name"
        name="name"
      />
      <Input
        placeholder="Phone Number"
        name="phone_number"
      />
      <Input
        type="email"
        placeholder="Email"
        name="email"
      />
      <Input
        placeholder="Description"
        name="description"
      />
      <Input
        placeholder="Website URL"
        name="website"
      />
      <Input
        placeholder="Address"
        name="address"
      />

      {/* Image Upload */}
      <div>
        <label className="block mb-1 text-sm font-medium">Company Image</label>
        <input
          type="file"
          name="imageUrl"
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
          file:rounded-full file:border-0 file:text-sm file:font-semibold 
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* Cover Upload */}
      <div>
        <label className="block mb-1 text-sm font-medium">Cover Image</label>
        <input
          type="file"
          name="coverUrl"
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
          file:rounded-full file:border-0 file:text-sm file:font-semibold 
          file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" disabled={loading} variant="primary">
        {loading
          ? "Adding..."
          : `Add Company (Clinic)`}
      </Button>
    </form>
  );
};

export default CompanyForm;
