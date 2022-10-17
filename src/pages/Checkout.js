import Image from "next/image";
import React from "react";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

const Checkout = () => {
  const items = useSelector(selectItems);

  return (
    <div>
      <Header />

      <div className="flex">
        {/* left  */}
        <div className="flex-grow m-5 shadow-sm">
          {/* top Ad */}
          <Image
            src={"https://links.papareact.com/ikj "}
            width={1020}
            height={250}
            objectFit="contain"
          />

          {/* Title */}
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b  pb-4">Your Shopping Basket</h1>
          </div>

          {/* Cart Items */}
          {items.map((item,index) => (
                 <CheckoutProduct  id={item.id}
                 title={item.title}
                 price={item.price}
                 description={item.desription}
                 category={item.category}
                 image={item.image}
                 rating={item.rating}
                 hasPrime={item.hasPrime}/>
          ))}
       
        </div>
        {/* right */}
        <div className=" bg-gray-600"></div>
      </div>

      <div></div>
    </div>
  );
};

export default Checkout;
