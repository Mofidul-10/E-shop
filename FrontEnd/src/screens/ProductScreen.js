import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';

const ProductScreen = () => {
    const params = useParams();
    const history = useNavigate()
    const match = params.id

    const [qty, setQty] = useState(0)

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);

    const { loading, error, product } = productDetails;


    useEffect(() => {
        dispatch(listProductDetails(match))
    }, [])

    const addToCartHandler = () => {
        history(`/cart/${match}?qty=${qty}`)
    }

    return (

        <div className='container lg:px-20 sm:px-10'>
            {loading ? <Loader /> : error ? <Message message={error} /> :
                <div className='flex justify-center items-center '>
                    <div className="container grid lg:grid-cols-3 sm:grid-cols-1  gap-x-8 ">
                        <img src={product.image} alt={product.name} />

                        <ul class="text-xl font-medium text-gray-900  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li class="py-4 px-4 w-full border-b border-gray-200 dark:border-gray-600">
                                <h1>{product.name}</h1>
                            </li>
                            <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600"> <Rating value={product.rating} text={product.numReviews} /></li>
                            <li class="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
                                <h1 className='text-2xl'> Price : {product.price} $</h1>
                            </li>
                            <li class="py-2 px-4 w-full ">Description : {product.description}</li>
                        </ul>
                        <div class=" w-80 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <button aria-current="true" type="button" class="py-2 px-4 w-full font-medium text-left text-white bg-blue-700 border-b border-gray-200 cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600">
                                <div className='container grid grid-cols-2  gap-4 '>
                                    <h1>Price :</h1>
                                    <h1>{product.price}</h1>
                                </div>
                            </button>
                            <button aria-current="true" type="button" class="py-2 px-4 w-full font-medium text-left text-white bg-blue-700 border-b border-gray-200 cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600">
                                <div className='container grid grid-cols-2  gap-4 '>
                                    <h1>Status :</h1>
                                    <h1>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</h1>
                                </div>
                            </button>

                            {product.countInStock > 0 && <div className='container grid grid-cols-2  gap-4 py-2 px-4 bg-gray-800'>
                                <h1>Quantity :</h1>
                                <div className="inline-block relative">
                                    <select className="block appearance-none w-full bg-black border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" value={qty}
                                        onChange={(e) => setQty(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            }

                            <button type="button" onClick={addToCartHandler} className="py-2 px-4 w-full text-center font-medium  border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>}
            <Link className='btn btn-dark'>Back</Link>
        </div>
    )
}

export default ProductScreen