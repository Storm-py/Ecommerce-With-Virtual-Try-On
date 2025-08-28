import React from 'react'
import RTE from './RTE'
import Input from './Input'
import { useForm } from 'react-hook-form'
import Select from './Select'

const PostForm = ({post}) => {
  const options=[
    'Men','Women','Kids','Shoes','Accessories','Bags'
  ]

  const {control,register,handleSubmit,getValues} = useForm({
    defaultValues:{
       name:post?.name || '',
       price:post?.price || '',
       description:post?.description || '',
       category:post?.category || '',
       images:post?.images || '',
       stock:post?.stock || '',
    }
  })

  const submit=async (data)=>{
    const formdata= new FormData()

    formdata.append('name',data.name)
    formdata.append('price',data.price)
    formdata.append('content',data.content)
    formdata.append('category',data.category)
    formdata.append('stock',data.stock)
    formdata.append('images',data.images)

    if(data.images && data.images.length > 0){
      for(let i=0; i<data.images.length;i++){
        formdata.append('images',data.images[i])
      }
    }
     if(post){
      //get the data from the frontend
      //update that data
      //update the images
      //delete the previous images
      const file=await fetch(`http://localhost:4000/api/v1/admin/update-product`,{
        method:"POST",
        body:formdata
      })
     }
  }
  return (
    <div className='w-[80vw] h-screen p-12'>
      <h1 className='text-3xl font-bold m-3 mt-6'>Add Product</h1>
      <form onSubmit={handleSubmit(submit)}>

      
      <div className='flex items-center justify-between my-8 gap-2'>
          <div>
            <h1 className='text-[1vw] font-medium text-gray-500 my-2'>Product Name</h1>
            
            <Input
            type='text'
            placeholder='Enter Product Name'
            {...register('name',{
              required:true
            })}
            />
          </div>
          <div>
            <h1 className='text-[1vw] font-medium text-gray-500 my-2'>Product Price</h1>
            <Input
            type='number'
            placeholder='Enter Product Price'
            {...register('price',{
              required:true
            })}
            />
          </div>
      </div>

      
      <div>
        <h1 className='text-[1vw] font-medium text-gray-500 my-2'>Product Description</h1>
        <RTE control={control} name={'description'} defaultValue={getValues("description")}/>
      </div>

      
      <div className='flex items-center justify-between mt-6'>
        <div>
            <h1 className='text-[1vw] font-medium text-gray-500 my-2'>Product Category</h1>
            <Select options={options}{...register('category',{
              required:true
            })}/>
            </div>
            <div>
            <h1 className='text-[1vw] font-medium text-gray-500 my-2'>Product Stock</h1>
            <Input
            type='number'
            placeholder='Enter Product Stock'
            {...register('stock',{
              required:true
            })}
            />
        </div>
      </div>

     
      <div className='mt-6'>
        <h1 className='text-[1vw] font-medium text-gray-500 my-2'>Upload Product Images</h1>
        <Input 
          type="file" 
          multiple 
          accept="image/png , image/jpg , image/jpeg, image/gif" 
          className='border border-gray-300 w-full py-2 px-3 rounded cursor-pointer'
          {...register("images")}
        />
      </div>

      
      <div className='mt-8'>
        <button 
          type="submit" 
          className='bg-[#ff491f] text-white font-medium py-2 px-6 rounded-lg shadow hover:opacity-90'>
          Submit
        </button>
      </div>

      </form>
    </div>
  )
}

export default PostForm
