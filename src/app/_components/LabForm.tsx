import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { toast } from "react-toastify";
import { useLabstore } from "@/store/useLabStore";

type Props = {
  onClose: () => void;
};

const LabForm = ({ onClose }: Props) => {
  const { addLab } = useLabstore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget
    const formData = new FormData(form)

    const image = formData.get("main_image") as File;
    const cover = formData.get("cover_image") as File;
    const image1 = formData.get("image1") as File;
    const image2 = formData.get("image2") as File;
    const image3 = formData.get("image3") as File;

    const atLeastOneFilled = [image, cover].some((f) => f && f.size > 0);

    if (!atLeastOneFilled) {
      toast.warning('Please fill in all fields.');
      return;
    }
    setLoading(true);

    try {
      console.log(formData);
      
      await addLab(formData);
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
        placeholder="Service Name"
        name="name"
      />
      <Input
        placeholder="Phone Number"
        name="phone_number"
      />
      <Input
        type="email"
        placeholder="email"
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

      <div>
        <label className="block mb-1 text-sm font-medium">Lab Image</label>
        <input
          type="file"
          name="main_image"
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
          file:rounded-full file:border-0 file:text-sm file:font-semibold 
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Lab Conver Image</label>
        <input
          type="file"
          name="cover_image"
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
          file:rounded-full file:border-0 file:text-sm file:font-semibold 
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Image One</label>
        <input
          type="file"
          name="image_one"
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
          file:rounded-full file:border-0 file:text-sm file:font-semibold 
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Image Two</label>
        <input
          type="file"
          name="image_two"
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
          file:rounded-full file:border-0 file:text-sm file:font-semibold 
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Image Three</label>
        <input
          type="file"
          name="image_three"
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
          file:rounded-full file:border-0 file:text-sm file:font-semibold 
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* type is hidden/auto-assigned */}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" disabled={loading} variant="primary">
        {loading ? "Adding..." : `Add Lab`}
      </Button>
    </form>
  );
};

export default LabForm; 