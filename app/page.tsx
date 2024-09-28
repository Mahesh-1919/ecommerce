"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "@/components/productCard";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  setSelectedCategory,
  setSearchQuery,
  selectedCategory,
  searchQuery,
} from "@/store/slice";
type Props = {};

// const Page = (props: Props) => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [skip, setSkip] = useState(0);
//   const dispatch = useDispatch();
//   const category = useSelector(selectedCategory);
//   const searchValue = useSelector(searchQuery);

//   useEffect(() => {
//     const fetchCategories: any = async () => {
//       const response = await axios.get(
//         "https://dummyjson.com/products/categories"
//       );
//       setCategories(response.data);
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchProducts: any = async () => {
//       const limit = 10;
//       const categoryQuery = category ? `/category/${category}?` : "?";
//       const searchQueries = searchValue ? `/search?q=${searchValue}&` : "?";
//       const Query = category ? categoryQuery : searchQueries;

//       const response = await axios.get(
//         `https://dummyjson.com/products${Query}limit=${limit}&skip=${skip}`
//       );
//       setProducts(response.data.products);
//     };
//     fetchProducts();
//   }, [searchValue, category, skip]);

//   console.log(categories, products);

//   return (
//     <div className="flex gap-2 min-h-screen">
//       <div className="px-4 hidden md:block w-96 bg-zinc-50 ">
//         <h1 className="font-bold my-4 ">Categories</h1>
//         <ul>
//           <li
//             className="m-2 p-2 bg-zinc-200/20 hover:bg-zinc-200 rounded-lg text-center"
//             onClick={() => dispatch(setSelectedCategory(null))}
//           >
//             All Categories
//           </li>
//           {categories?.map((category: any, index) => (
//             <>
//               <li
//                 key={index}
//                 className="m-2 p-2 bg-zinc-200/20 hover:bg-zinc-200 rounded-lg text-center"
//                 onClick={() => dispatch(setSelectedCategory(category.name))}
//               >
//                 {category.name}
//               </li>
//             </>
//           ))}
//         </ul>
//       </div>
//       <div className=" w-full bg-zinc-50 p-4 rounded-xl">
//         <div className="flex justify-between my-4 px-8 ">
//           <h1 className="font-bold text-2xl">Products</h1>
//           <input
//             type="text"
//             placeholder="Search"
//             className="p-2 border border-gray-200 rounded-lg bg-zinc-100"
//             onChange={(e) => dispatch(setSearchQuery(e.target.value))}
//           />
//         </div>
//         <ul className="grid grid-cols-3 gap-4 ">
//           {products?.map((product: any, index) => (
//             <ProductCard product={product} key={index} />
//           ))}
//         </ul>

//         <div className="flex justify-center gap-6 my-4 px-8 ">
//           <Button
//             className=" text-white  rounded-lg"
//             onClick={() => setSkip(skip - 10)}
//           >
//             Previous
//           </Button>
//           <Button
//             className=" text-white  rounded-lg"
//             onClick={() => setSkip(skip + 10)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CategoryProductsLayout() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const dispatch = useDispatch();
  const category = useSelector(selectedCategory);
  const searchValue = useSelector(searchQuery);

  useEffect(() => {
    const fetchCategories: any = async () => {
      const response = await axios.get(
        "https://dummyjson.com/products/category-list"
      );
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts: any = async () => {
      const limit = 10;
      const categoryQuery = category ? `/category/${category}?` : "?";
      const searchQueries = searchValue ? `/search?q=${searchValue}&` : "?";
      const Query = category ? categoryQuery : searchQueries;

      const response = await axios.get(
        `https://dummyjson.com/products${Query}limit=${limit}&skip=${skip}`
      );
      setProducts(response.data.products);
    };
    fetchProducts();
  }, [searchValue, category, skip]);

  console.log(categories, products);
  return (
    <div className="flex min-h-screen flex-col ">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">My Store</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/products">Products</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0  overflow-y-scroll py-4">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="font-bold">
                  My Store
                </Link>
                <nav className="flex flex-col space-y-3">
                  <Link href="/products">Products</Link>
                  <Link href="/categories">Categories</Link>
                  <Link href="/about">About</Link>
                </nav>
                <div className="flex flex-col space-y-2">
                  <h2 className="font-semibold">Categories</h2>
                  <ul>
                    <li
                      className="p-2  hover:bg-zinc-100 rounded-lg "
                      onClick={() => dispatch(setSelectedCategory(null))}
                    >
                      All Categories
                    </li>
                    {categories?.map((category: any, index) => (
                      <>
                        <li
                          key={index}
                          className=" p-2  hover:bg-zinc-100 rounded-lg "
                          onClick={() =>
                            dispatch(setSelectedCategory(category))
                          }
                        >
                          {category}
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className=" flex gap-2 w-full">
        <aside className="fixed top-14 z-30 hidden h-full  shrink-0 md:sticky md:block w-64">
          <ScrollArea className="h-full px-8">
            <h2 className="my-4 text-lg font-semibold">Categories</h2>
            <nav className="grid grid-flow-row auto-rows-max text-sm ">
              <ul>
                <li
                  className="m-2 p-2  hover:bg-zinc-100 rounded-lg "
                  onClick={() => dispatch(setSelectedCategory(null))}
                >
                  All Categories
                </li>
                {categories?.map((category: any, index) => (
                  <>
                    <li
                      key={index}
                      className="m-2 p-2  hover:bg-zinc-100 rounded-lg "
                      onClick={() => dispatch(setSelectedCategory(category))}
                    >
                      {category}
                    </li>
                  </>
                ))}
              </ul>
            </nav>
          </ScrollArea>
        </aside>
        <div className=" w-full bg-zinc-50 p-4 px-8">
          <div className="flex justify-between my-4 px-8 md:flex-row flex-col gap-2 ">
            <h1 className="font-bold text-2xl">Products</h1>
            <input
              type="text"
              placeholder="Search"
              className="p-2 border border-gray-200 rounded-lg bg-zinc-100"
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
            {products.length === 0 && (
              <div className="text-center">No Products Found</div>
            )}

            {products?.map((product: any, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </ul>

          <div className="flex justify-center gap-6 my-4 px-8 ">
            <Button
              className=" text-white  rounded-lg"
              onClick={() => setSkip(skip - 10)}
            >
              Previous
            </Button>
            <Button
              className=" text-white  rounded-lg"
              onClick={() => setSkip(skip + 10)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
