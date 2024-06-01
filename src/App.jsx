import React, { useEffect } from 'react'
import Products from './Products'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import ProductInfo from './ProductInfo'

function App() {
 useEffect(()=>{window.scroll(0,0)},[]) ;

  return (
    <div className='bg-transparent bg-gradient-to-r to-indigo-50 from-pink-50 '>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='/:id' element={<ProductInfo/>}/>
        </Routes>
      </BrowserRouter>

      {/* footer  */}
      <div className='mt-32 w-screen bg-slate-400 p-2 flex flex-row justify-between items-center '>
        <p>&copy; 2024 , build by Ayaz.khan</p>
        <a href="https://www.linkedin.com/in/ayaz-khan-8750o" target='_blank' className=' text-blue-900 '>LinkedIn</a>
      </div>

    </div>
  )
}

export default App
