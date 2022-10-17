import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const Product = ({ id, title, price, description, category, image }) => {
  const dispatch = useDispatch();
  const Min_Stars = 1;
  const Max_Stars = 5;

 

  const [rating, setRating] = useState();
  const [hasPrime, setPrime] = useState();

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (Max_Stars - Min_Stars + 1)) + Min_Stars
    );
    setPrime(Math.random() < 0.5);
  }, []);

  const addToCart = () => {
    const product = {
      id,
      title,  
      price,
      description,
      category,
      image,
      rating,
      hasPrime
    };

    dispatch(addToBasket(product));
  };
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{title}</h4>

      <div className="stars flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-10 text-yellow-500 " />
          ))}
      </div>

      <div className="text-xs my-2  line-clamp-2">{description}</div>

      <div className="mb-5">{price}</div>

      {hasPrime && (
        <div className="flex items-center space-x-2 mt-5">
          <img
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt="prime"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addToCart} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
