"use client";

import { useState } from "react";
import { cartStore } from "@/lib/orders/cart-storage";

export default function AddToCartButton({
  dish,
  className = "",
  label = "Add to cart",
}: {
  dish: {
    slug: string;
    name: string;
    price: number;
    image: string;
  };
  className?: string;
  label?: string;
}) {
  const [added, setAdded] = useState(false);

  function add() {
    cartStore.add({
      slug: dish.slug,
      name: dish.name,
      price: dish.price,
      image: dish.image,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={add}
      className={className}
      aria-live="polite"
    >
      {added ? "Added ✓" : label}
    </button>
  );
}
