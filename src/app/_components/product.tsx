"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { decodeToken, getToken } from "@/server/utils/auth";

import { api } from "@/trpc/react";
import Pagination from "./pagination";

export function ProductCategory() {
  const [error, setError] = useState<string | null>(null);
  const [ products, setProducts ] = useState([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [ totalPages, setTotalPages] = useState(0);
  let itemPerPage = 6;
  const utils = api.useUtils();
  
  const getProductsAll = api.product.getAll.useMutation({
    onSuccess: async (res) => {
      console.log("products res", res);
      setTotalPages(Math.ceil(res.length/ itemPerPage));
      console.log(totalPages);
      console.log(Math.ceil(res.length/ itemPerPage));
    },
    onError: async (error) => {
      console.log(error);
      setError(error.message);
    },
    
  });
  const getUser = api.user.me.useMutation({
    onSuccess: async (res) => {
      console.log("usr res", res);
    },
    onError: async (error) => {
      console.log(error);
      setError(error.message);
    },
  })
  const getProducts = api.product.getAll.useMutation({
    onSuccess: async (res) => {
      console.log("products res", res);
      setProducts(res);
    },
    onError: async (error) => {
      console.log(error);
      setError(error.message);
    },
    
  });

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken) {
      console.log("decoded", decodedToken)
      getUser.mutate({ email : decodedToken});
    }}
  }, [])

  useEffect(() => {
      getProductsAll.mutate({ });
      const oldEmail = localStorage.getItem('verificationProp');
      getUser.mutate({ email : oldEmail});
      // const token = getToken();
      // if (token) {
      //   const decodedToken = decodeToken(token);
      //   if (decodedToken) {
      //   console.log("decoded", decodedToken)
      //   getUser.mutate({ email : decodedToken});
      // }}
  }, []);

  useEffect(() => {
    getProducts.mutate({ skip: (currentPage - 1)*6 , take : 6});
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-full max-w-xs text-black">
      {error && <p>{error}</p>}
      <div className="w-100 text-center mt-2">
           <p className="font-bold">Please mark your interests!</p>
           <p className="text-xs">We will keep you notified.</p>
      </div>
      <div className="w-100 text-left mt-2">
           <p className="text-sm">My saved interests!</p>
      </div>
      <form onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-2 mt-4">
          { 
            products.map((item, index) => {
              return <div><input type="checkbox" key={item.id} id={item.id} name={item.name} value={item.name}>
              </input>
              <label htmlFor={item.id}> {item.name}</label><br></br></div>
            })
 
          }
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
          
          </form>
      
    </div>
  );
}
