import React, { useEffect, useState } from "react";

function Cart() {

  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [updatingItemId, setUpdatingItemId] = useState(null)
  const [RemoveItemId, setRemoveItemId] = useState(null)
  const [actionError, setActionError] = useState("")

  useEffect(() => {

    const fetchCart = async () => {

      try {
        const response = await fetch(`http://localhost:8000/api/v1/cart/carts/fetch`,
          {
            method: "GET",
            credentials: "include"
          }
        )

        const data = await response.json()

        // console.log("response object is : ",response);

        // console.log("data after conversion is : ",data);

        console.log("cart data is : ", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch the cart !!!")
        }

        setCart(data.data)

      }
      catch (error) {
        console.log("Cannot Fetch Cart Items Error: ", error);
        setError(error.message)
      }

      finally {
        setLoading(false)
      }
    }

    fetchCart()

  }, [])


  const updateQuantity = async (itemId, NewQuantity) => {

    if (NewQuantity < 1)
      return

    setUpdatingItemId(itemId)
    setActionError("")

    try {
      const response = await fetch(`http://localhost:8000/api/v1/cart/carts/${itemId}`,
        {
          method: "PATCH",
          credentials: "include",

          headers: {
            "Content-type": "application/json",
          },

          body: JSON.stringify({
            quantity: NewQuantity,
          })
        }
      )


      const data = response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update quantity");
      }


      setCart((prevCart) => ({

        ...prevCart,

        items: prevCart.items.map((item) =>

          item._id === itemId ? ({ ...item, quantity: NewQuantity }) : item
        )

      }))
    } catch (error) {
      console.log("the error is : ", error);
      setActionError(error.message)
    }
    finally {
      setUpdatingItemId(null)
    }
  }


  const removingItem = async (itemId) => {

    setRemoveItemId(itemId)

    try {
      const response = await fetch(`http://localhost:8000/api/v1/cart/carts/${itemId}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      )

      const data = response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to Delete the Cart!!!")
      }

      setCart((prevCart) => ({

        ...prevCart,

        items: prevCart.items.filter((item) => item._id !== itemId)
      }))
    } catch (error) {

      console.log("The Error shown is : ", error);
      setActionError(error.message)

    }
    finally {
      setRemoveItemId(null)
    }
  }

  if (loading) {
    return <div className="p-10 text-center">Loading your cart...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-3xl font-bold text-indigo-900">
          My Shopping Cart
        </h1>

        {actionError && (
          <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
            {actionError}
          </p>
        )}

        {cart?.items?.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-800">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-500">
              Add some products to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {cart?.items?.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-md sm:flex-row sm:items-center"
              >
                <img
                  src={item.product.images?.[0]?.url}
                  alt={item.product.name}
                  className="h-32 w-full rounded-lg object-cover sm:w-32"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.product.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.product.brand}
                  </p>

                  <p className="mt-2 text-gray-600">
                    Price: ₹{item.price}
                  </p>


                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-gray-600">Quantity:</span>

                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={
                        item.quantity <= 1 ||
                        updatingItemId === item._id ||
                        RemoveItemId === item._id
                      }
                      className="rounded-md border px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="min-w-6 text-center font-semibold">
                      {updatingItemId === item._id
                        ? "..."
                        : item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      disabled={
                        updatingItemId === item._id ||
                        RemoveItemId === item._id
                      }
                      className="rounded-md border px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removingItem(item._id)}
                    disabled={
                      RemoveItemId === item._id ||
                      updatingItemId === item._id
                    }
                    className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 disabled:opacity-50"
                  >
                    {RemoveItemId === item._id
                      ? "Removing..."
                      : "Remove"}
                  </button>

                </div>

                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-500">
                    Subtotal
                  </p>

                  <p className="text-2xl font-bold text-indigo-700">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Total Amount
                </h2>

                <p className="text-2xl font-bold text-indigo-700">
                  ₹
                  {cart?.items?.reduce(
                    (total, item) =>
                      total + item.price * item.quantity,
                    0
                  )}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;