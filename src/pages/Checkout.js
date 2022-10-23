import Image from "next/image";
import React from "react";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectItems, basketTotal } from "../slices/basketSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(basketTotal);
  const { data: session, status } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    /// call backend to create a checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    console.log("Axios Results ", checkoutSession);

    //redirect user to stripe checkout
    const result = await stripe.redirectToCheckout({
       sessionId: checkoutSession.data.id,
    })

    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-200">
      <Header />

      <div className="lg:flex max-w-screen-2xl mx-auto">
        {/* left  */}
        <div className="flex-grow m-5 shadow-sm">
          {/* top Ad */}
          <Image
            src={"https://links.papareact.com/ikj"}
            width={1020}
            height={250}
            objectFit="contain"
          />

          {/* Title */}
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b  pb-4">
              {items.lenght === 0
                ? "Your Amazon Basket is empty. "
                : "Shopping Basket"}
            </h1>
          </div>

          {/* Cart Items */}
          {items.map((item, index) => (
            <>
              <CheckoutProduct
                key={index + item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.desription}
                category={item.category}
                image={item.image}
                rating={item.rating}
                hasPrime={item.hasPrime}
              />
              {/* <div className="border bg-gray-200 border-b-0 m-10 " /> */}
            </>
          ))}
        </div>
        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2>
                Subtotal ({items.length} items)
                <span className="font-bold">$ {total}</span>
              </h2>

              <button
                role="link"
                disabled={!session}
                onClick={createCheckoutSession}
                className={`button mt-2  ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
