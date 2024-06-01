import { useEffect, useState } from "react";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [ProductsList, setProductsList] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  //console.log(products);
 
  useEffect(() => {
    
    // this is for production
    // fetch('https://fakestoreapi.com/products')

    // and this is for development or testing
    //and this comes from products.json file , with  port 3000
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((res) => { setProducts(res), setProductsList(res)})
      .catch(error=>console.log("something wrong in api",error))
  }, []);

  useEffect(() => {
    if (products && searchKeyword.length > 2) {
      setProductsList(products.filter((val) => val.title.toLowerCase().includes(searchKeyword.toLowerCase())))
    }
    else {
      setProductsList(products)
    }

  }, [searchKeyword]);

//  this is for if any product not found after searching
  function NotFound() {
    if ((!ProductsList || ProductsList.length < 1) && searchKeyword.length > 2) {
      return (
        <div className=" w-[80vw] h-[100vh]">
          <div className=" text-2xl font-semibold flex m-auto mt-10 w-fit">
            product not found <span className="loading">!!!</span>
          </div>
        </div>)
    }
  }

  //this is for loading
  function Loading() {
    if ((!ProductsList || ProductsList.length <1) &&  searchKeyword.length < 1) {
      return (
        <div className="h-[100vh]">
          <div className=" text-2xl font-semibold flex m-auto mt-10 w-fit">
            loading <span className='loading'>...</span>
          </div>
        </div>)
    }
  }   

  return (
    <>
      <div className="pt-8 bg-transparent bg-gradient-to-r to-indigo-50 from-red-50  w-screen">
        <input className=" bg-slate-100 border border-slate-400 placeholder:text-black w-[90%]
        md:w-1/2 rounded-xl p-2 flex m-auto shadow-md" type="text" name="searchBar" id="searchBar" placeholder="search..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 ">
        <Loading/>
          <div className="grid  grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

            {ProductsList && ProductsList.map((product, index) => {
              return (

                //here href jump to the productInfo page by id
                <a key={index} href={`/${product.id}`} className="border border-slate-400 p-2 rounded-lg shadow-xl group">
                  <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.image}
                      alt={'img'}
                      className="h-full sm:h-[350px] w-full object-cover object-center group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">₹{product.price}</p>
                  <h4>
                  {/* this is for ratings of starts */}
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
                  </h4>
                  <h4 className=" text-normal text-slate-700">{product.rating.count} ratings</h4>
                </a>
              )
            })}

            <NotFound />
          </div>
        </div>
      </div>
    </>
  )
}
