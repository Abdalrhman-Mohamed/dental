import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useServices } from "../../context/ServicesContext";

type Props = {
  type: "doctor" | "lab" | "technician" | "clinic";
  onClose: () => void;
};

const ServiceForm = ({ type, onClose }: Props) => {
  const { addService } = useServices();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title || !image) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    addService({ title, image, type });
    setLoading(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        placeholder="Service Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      {/* type is hidden/auto-assigned */}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" disabled={loading} variant="primary">
        {loading ? "Adding..." : `Add ${type === "clinic" ? "Company (Clinic)" : type.charAt(0).toUpperCase() + type.slice(1)}`}
      </Button>
    </form>
  );
};

export default ServiceForm; 