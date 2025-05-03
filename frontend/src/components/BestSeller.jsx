import React, { useEffect } from 'react'
import { useContext , useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(() =>{
        const bestProduct = products.filter((item) => item.bestseller === true);
        setBestSeller(bestProduct.slice(0,5));
    },[])

  return (          
    <div className='my-10'>
        <div className="text-3xl text-center py-8">
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='width-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 '>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {bestSeller.map((item , index) => (
               <ProductItem
               key={index}
               id={item._id}
               name={item.name}
               image={item.image}
               price={item.price}
               />
            ))}
        </div>
    </div>
  )
}

export default BestSeller