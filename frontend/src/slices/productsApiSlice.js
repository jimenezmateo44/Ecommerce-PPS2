import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
        query: () => ({
            url: PRODUCTS_URL,   
        }), 
        keepUnusedDataFor: 5
    }),
       getProductsDetails: builder.query({
        query: (productoId) => ({
            url: `${PRODUCTS_URL}/${productoId}`,   
        }), 
        keepUnusedDataFor: 5
    }),
    createProduct: builder.mutation({
        query: () => ({
            url: PRODUCTS_URL,
            method: 'POST',
        }),
        invalidsTags: ['Producto'],
    }),
    }),
});

export const { useGetProductsQuery, useGetProductsDetailsQuery, useCreateProductMutation } = productsApiSlice;