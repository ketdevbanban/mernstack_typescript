import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Input from "../../../components/input/Input";
import AdminLayout from "../../../components/layout/AdminLayout";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}
interface FormData extends Product {
  id: string;
}
export default function ProductEdit() {
  const { id } = useParams<{ id: string }>();
  const [redirect, setRedirect] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    title: "",
    description: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`products/${id}`);
        setProduct(response.data);
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [id]);

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
      await axios.put(`products/${id}`, formData);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to="/admin/products" />;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="mx-auto p-5  h-screen">
        <div className="col-span-9 shadow-xl rounded px-6 bg-white  pb-7 mt-6 lg:mt-0 ">
          <form onSubmit={handleSubmit} className="p-2">
            <h3 className="text-lg capitalize mb-4 font-semibold text-green-500">
              Edit Product
            </h3>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  id="title"
                  placeholder="ຊື່ສິນຄ້າ"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  id="description"
                  placeholder="ລາຍລະອຽດ"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  id="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="ຮູບພາບ"
                />
                <Input
                  type="number"
                  id="price"
                  placeholder="ລາຄາ"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-2 flex justify-center text-center">
              <button
                type="submit"
                className="btn-btn-primary"
              >
                +Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
