import React, { useEffect, useState } from 'react';
import RTE from './RTE';
import Input from './Input';
import { useForm } from 'react-hook-form';
import Select from './Select';

const PostForm = ({ post }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const options = ['Men', 'Women', 'Kids', 'Shoes', 'Accessories', 'Bags'];

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
      description: '',
      category: '',
      stock: '',
    },
  });

  useEffect(() => {
    if (post) {
      reset({
        name: post.name,
        price: post.price,
        description: post.description,
        category: post.category,
        stock: post.stock,
      });
    }
  }, [post, reset]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    clearErrors('images');
  };

  const submit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formdata = new FormData();
      formdata.append('name', data.name);
      formdata.append('price', data.price);
      formdata.append('description', data.description);
      formdata.append('category', data.category);
      formdata.append('stock', data.stock);

      if (selectedImages.length > 0) {
        selectedImages.forEach((image) => {
          formdata.append('images', image);
        });
      }

      const url = post
        ? `${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/admin/update-product/${post._id}`
        : `${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/admin/add-product`;

      const response = await fetch(url, {
        method: post ? 'PUT' : 'POST',
        body: formdata,
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitStatus({
          type: 'success',
          message: `Product ${post ? 'Updated' : 'Added'} Successfully!`,
        });
        console.log('Success:', result);

        if (!post) {
          setSelectedImages([]);
          reset();
        }
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Submission failed. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[80vw] min-h-screen p-12 bg-gray-50">
      <h1 className="text-3xl font-bold m-3 mt-6">
        {post ? 'Edit Product' : 'Add Product'}
      </h1>

      {submitStatus && (
        <div
          className={`p-4 mb-6 rounded-lg ${
            submitStatus.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between my-8 gap-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter Product Name"
              {...register('name', { required: 'Product name is required' })}
              error={errors.name}
            />
          </div>
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Enter Product Price"
              {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' } })}
              error={errors.price}
            />
          </div>
        </div>

        <div className="my-6">
          <RTE control={control} name="description" defaultValue={getValues('description')} />
        </div>

        <div className="flex items-center justify-between mt-6 gap-6">
          <div className="flex-1">
            <Select
              options={options}
              {...register('category', { required: 'Category is required' })}
              error={errors.category}
            />
          </div>
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Enter Product Stock"
              {...register('stock', { required: 'Stock quantity is required', min: { value: 0, message: 'Stock cannot be negative' } })}
              error={errors.stock}
            />
          </div>
        </div>

        <div className="mt-6">
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="mt-8 flex gap-4">
          <button type="submit" disabled={isSubmitting} className="bg-[#ff491f] text-white py-2 px-6 rounded-lg">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
