import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const categories = [
    { key: "Salad", value: "Salad" },
    { key: "Rolls", value: "Rolls" },
    { key: "Desserts", value: "Desserts" },
    { key: "Sandwich", value: "Sandwich" },
    { key: "Cake", value: "Cake" },
    { key: "Pure veg", value: "Pure Veg" },
    { key: "Pasta", value: "Pasta" },
    { key: "Noodles", value: "Noodles" },
  ];
  const url = "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: categories[0].value,
  });

  const onProductDataChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProductData((productData) => ({ ...productData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", Number(productData.price));
    formData.append("category", productData.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setProductData({
        name: "",
        description: "",
        price: "",
        category: categories[0].value,
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onProductDataChangeHandler}
            value={productData.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onProductDataChangeHandler}
            value={productData.description}
            name="description"
            rows="6"
            placeholder="Write content here"
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              onChange={onProductDataChangeHandler}
              value={productData.category}
            >
              {categories.map(({ key, value }) => {
                return (
                  <option key={key} value={key}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onProductDataChangeHandler}
              value={productData.price}
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
