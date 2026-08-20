import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import OrderMenu from "@/components/orders/OrderMenu";
import CartButton from "@/components/orders/CartButton";

export const metadata = { title: "Order Online" };

export default function OrderPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Pickup + table ordering"
        title="Order"
        text="Add dishes to your cart, use promo codes, choose pickup or order directly to a restaurant table."
        image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="px-3 py-6 md:px-5 md:py-10">
        <div className="mx-auto max-w-[1180px]">
          <OrderMenu />
        </div>
      </section>

      <CartButton />
    </LuxeShell>
  );
}
