import { useState } from "react";
import Input from "../../../components/input/Input";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Navigate } from "react-router-dom";
import axios from "axios";
interface FormData {
  title: string;
  description: string;
  image: string;
  price: string;
}
export default function ProductCreate() {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    image: "",
    price: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post("products", formData);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (redirect) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <AdminLayout>
      <div className="mx-auto p-5  h-screen">
        <div className="col-span-9 shadow-xl rounded px-6 bg-white pt-5 pb-7 mt-6 lg:mt-0 ">
          <form onSubmit={handleSubmit} className="p-2">
            <h3 className="text-lg capitalize mb-4 font-semibold text-green-500">
              ເພີ່ມສິນຄ້າ
            </h3>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  id="title"
                  label="Title"
                  placeholder="ຊື່ສິຄ້າ"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  id="description"
                  label="Titdescriptionle"
                  placeholder="ລາຍລະອຽດ"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  id="image"
                  label="image"
                  placeholder="ຮູບພາບ"
                  value={formData.image}
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  id="price"
                  label="price"
                  placeholder="ລາຄາ"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-center text-center">
                <button type="submit" className="btn-btn-primary">
                  +Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
