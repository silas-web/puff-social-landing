import type { Metadata } from "next";
import { Header } from "@/components/puff/header";
import { Footer } from "@/components/puff/footer";
import { ProductCard } from "@/components/puff/product-card";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop Strain Tees | Puff Social",
  description:
    "Rep your favorite strain with premium Puff Social Strain Tees. Blue Dream, OG Kush, Lemon Cake, Purple Haze — cannabis culture you can wear.",
};

export default function ShopPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full py-20 md:py-28 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-purple-50/30 to-amber-50/30" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs uppercase tracking-[0.25em] font-semibold text-primary mb-4 px-4 py-1.5 rounded-full bg-primary/10">
                Limited Drop
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter font-headline">
                Strain Tees{" "}
                <span className="bg-gradient-to-r from-green-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
                  Collection
                </span>
              </h1>
              <p className="mt-5 text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed">
                Premium cannabis culture apparel. Each tee features hand-crafted
                typography inspired by your favorite strains, printed on
                heavyweight cotton.
              </p>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Premium Cotton
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Enjoy Responsibly
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Puff Social ✕ 420
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="w-full py-16 md:py-24" id="shop-products">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 2} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="w-full py-16 bg-puff-green-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-headline">
              More drops coming soon 🌿
            </h2>
            <p className="mt-3 text-foreground/70 max-w-md mx-auto">
              Follow us on socials to be the first to know about new collections
              and exclusive releases.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
