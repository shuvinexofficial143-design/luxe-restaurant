import { notFound } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import OrderItemDetail from "@/components/order/OrderItemDetail";
import { dishes } from "@/lib/menu/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return dishes.map((dish) => ({ slug: dish.slug }));
}

export default async function OrderItemPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ table?: string }>;
}) {
  const { slug } = await params;
  const { table = "" } = await searchParams;
  const dish = dishes.find((item) => item.slug === slug);

  if (!dish) notFound();

  return (
    <LuxeShell hideHeader hideFooter>
      <OrderItemDetail
        dish={{
          slug: dish.slug,
          name: dish.name,
          category: dish.category,
          description: dish.description,
          image: dish.image,
          price: dish.price,
          dietary: dish.dietary,
          spice: dish.spice,
        }}
        initialTable={table}
      />
    </LuxeShell>
  );
}
