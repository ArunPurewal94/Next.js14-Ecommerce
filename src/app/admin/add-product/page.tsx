import { FormSubmitButton } from "@/components/form/form-submit-button";
import { addProduct } from "@/actions/add-product";
import { sizes } from "@/constants/sizes";
import { categories } from "@/constants/categories";

export const metadata = {
  title: "Add Product | E-Commerce",
};

export default function AddProductPage() {
  const filteredCategories = categories.filter(
    (category) => category.label !== "All"
  );
  return (
    <div>
      <h1 className="text-lg font-bold mb-3">Add Product</h1>
      <form action={addProduct}>
        <input
          type="text"
          required
          name="name"
          placeholder="Name..."
          className="input input-bordered w-full mb-3"
        />
        <textarea
          required
          name="description"
          placeholder="Description..."
          className="textarea textarea-bordered mb-3 w-full"
        />

        <div className="my-6">
          <h1 className="text-lg font-bold my-6 text-center">Categories</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredCategories.map((category, index) => (
              <div className="flex items-center gap-2" key={index}>
                <category.icon />
                <input
                  type="radio"
                  id={`category-${index}`}
                  name="categories"
                  value={category.label}
                  className="radio"
                />
                <label htmlFor={`category-${index}`}>{category.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="my-6">
          <h1 className="text-lg font-bold my-6 text-center">Sizes</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sizes.map((size, index) => (
              <div className="flex items-center gap-2" key={index}>
                <input
                  type="checkbox"
                  id={`size-${index}`}
                  name="sizes"
                  value={size.label}
                  className="checkbox"
                />
                <label htmlFor={`size-${index}`}>{size.label}</label>
              </div>
            ))}
          </div>
        </div>

        <input
          type="text"
          required
          name="imageUrl"
          placeholder="Image URL..."
          className="input input-bordered w-full mb-3"
        />
        <input
          type="text"
          required
          name="price"
          placeholder="Price...(to two decimal places if required)"
          className="input input-bordered w-full mb-3"
          step="0.01"
          pattern="^\d+(.\d{1,2})?$"
        />

        <FormSubmitButton className="btn-primary mb-3">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
