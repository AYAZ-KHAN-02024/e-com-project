import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ProductInfo() {
    const {id}=useParams();
    const [Product,setProduct]=useState(null);

    useEffect(()=>{
        // this is for production
        // fetch(`https://fakestoreapi.com/products/${id}`)

        // and this is for development or testing
        //and this comes from productById.json file , with another port 3002
        fetch(`http://localhost:3002/${id}`)
        .then((res)=>res.json())
        .then((res)=>{setProduct([res])})
        .catch(error=>console.log("something wrong in api",error)
        )
    },[id]);


    //this is for- when products fetching
    function Loading() {
      if (!Product || Product.length < 1) {
        return (
          <div className="h-[100vh]">
            <div className=" text-2xl font-semibold flex m-auto mt-10 w-fit">
              loading <span className='loading'>...</span>
            </div>
          </div>)
      }
    }   

  return (
    <div className="bg-transparent bg-gradient-to-r to-indigo-50 from-red-50  w-screen">
    
    <div className="mx-auto max-w-4xl  p-4">
     <Loading/>
      <div className="grid  grid-cols-1  gap-4">
        {Product && Product.map((product,index) => {
          return(
          <div key={index} className="grid md:grid-cols-2 grid-rows gap-4  border border-slate-400 p-2 rounded-lg shadow-xl group">
            <div className=" w-full overflow-hidden rounded-lg bg-gray-200 ">
              <img
                src={product.image}
                alt={'img'}
                className="h-full w-full object-cover object-center "
              />
            </div>
            <div className=" p-4  w-full overflow-hidden rounded-lg bg-indigo-100 ">
            <h3 className="mt-4 text-sm text-gray-800 md:font-semibold md:text-2xl">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">₹{product.price}</p>
            {[0, 1, 2, 3, 4].map((val) => {
                      if (product.rating.rate >= val + 1) {
                        return <i key={val} className="fa-solid fa-star" />;
                      } else if (product.rating.rate >= val + 0.5) {
                        return <i key={val} className="fa-solid fa-star-half-alt" />;
                      } else {
                        return <i key={val} className="fa-regular fa-star" />;
                      }
                    })}
                    {product.rating.rate}
            <h4 className=" text-normal text-slate-700">{product.rating.count} ratings</h4>
            <h4 className=' font-thin md:text-2xl'>{product.description}</h4>
            </div>
          </div>
        )})}
        <button className=' bg-indigo-600 text-white p-2 rounded-xl shadow-md'>Add to Cart</button>
        <button className=' bg-pink-600 text-white p-2 rounded-xl shadow-md'>Buy Now</button>
      </div>
    </div>
  </div>
 
  )
}

export default ProductInfo
