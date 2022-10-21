import Image from "next/image";
import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { removeFromBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";

const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
}) => {
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5 pb-10 bg-white">
      <Image src={image} width={200} height={200} objectFit="contain" />

      <div className="details col-span-3 mx-5">
        <p>{title}</p>

        <div className="flex">
          <StarIcon className="h-10 text-yellow-500 " />
        </div>

        <div className="text-xs my-2 line-clamp-3">{description}</div>

        <div className=""> ${price}</div>

        <div className="flex items-center space-x-2">
          <img
            loading="lazy"
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt="prime"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      </div>


      <div className="flex flex-col space-y-2 mx-auto justify-self-end ">
        <button className="button">Add To Cart</button>
        <button className="button" onClick={removeItem}>
          Remove From Cart
        </button>
      </div>


    </div>
  );
};

export default CheckoutProduct;
