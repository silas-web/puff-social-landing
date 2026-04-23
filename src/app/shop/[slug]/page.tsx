"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { Header } from "@/components/puff/header";
import { Footer } from "@/components/puff/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, getProductBySlug, formatPrice } from "@/lib/products";
import { ArrowLeft, Loader2, ShoppingBag, Check, Bell } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [isNotified, setIsNotified] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  if (!product) {
    notFound();
  }

  const images = [
    { src: product.images.mockup, label: "Lifestyle" },
    { src: product.images.front, label: "Front" },
    { src: product.images.detail, label: "Detail" },
  ];

  const handleCheckout = async () => {
    if (!selectedSize || isLoading || product.comingSoon) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          size: selectedSize,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      alert("Connection error. Please try again.");
      setIsLoading(false);
    }
  };

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || notifyLoading) return;

    setNotifyLoading(true);
    try {
      const res = await fetch("/api/merch-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: notifyEmail,
          productId: product.id,
        }),
      });

      const data = await res.json();
      setNotifyMessage(data.message || "You're on the list!");
      setIsNotified(true);
    } catch (err) {
      setNotifyMessage("Something went wrong. Please try again.");
    } finally {
      setNotifyLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
          {/* Back link */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-border/50">
                <Image
                  src={images[selectedImage].src}
                  alt={`${product.name} - ${images[selectedImage].label}`}
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Coming Soon overlay badge */}
                {product.comingSoon && (
                  <div className="absolute top-4 right-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-sm font-semibold text-white uppercase tracking-wider">
                    Coming Soon
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i
                        ? "border-primary shadow-lg scale-[1.02]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Strain badge */}
              <span
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full w-fit mb-4"
                style={{
                  backgroundColor: `${product.colorHex}15`,
                  color: product.colorHex,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: product.colorHex }}
                />
                Strain Tees
              </span>

              <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight">
                {product.name}
              </h1>
              <p className="mt-1 text-lg text-muted-foreground italic">
                {product.tagline}
              </p>

              {/* Price or Coming Soon */}
              <div className="mt-4">
                {product.comingSoon ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 border border-amber-200">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-sm font-semibold text-amber-700">
                      Coming Soon — Price TBA
                    </span>
                  </div>
                ) : (
                  <>
                    <span
                      className="text-3xl font-bold"
                      style={{ color: product.colorHex }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      + free shipping
                    </span>
                  </>
                )}
              </div>

              <p className="mt-6 text-foreground/80 leading-relaxed">
                {product.description}
              </p>

              {/* Coming Soon: Notify Me form */}
              {product.comingSoon ? (
                <div className="mt-8 p-6 rounded-2xl bg-gray-50 border border-border/50">
                  {isNotified ? (
                    <div className="flex items-center gap-3 text-primary">
                      <Check className="h-5 w-5" />
                      <span className="font-semibold">
                        {notifyMessage || "We'll notify you when this drops! 🔥"}
                      </span>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-semibold text-foreground mb-1">
                        Get notified when it drops
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Be the first to know when this tee is available.
                      </p>
                      {notifyMessage && !isNotified && (
                        <p className="text-sm text-red-500 mb-3">{notifyMessage}</p>
                      )}
                      <form
                        onSubmit={handleNotify}
                        className="flex gap-2"
                      >
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={notifyEmail}
                          onChange={(e) => setNotifyEmail(e.target.value)}
                          required
                          disabled={notifyLoading}
                          className="flex-1"
                        />
                        <Button type="submit" variant="default" disabled={notifyLoading}>
                          {notifyLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Bell className="mr-2 h-4 w-4" />
                          )}
                          {notifyLoading ? "Saving..." : "Notify Me"}
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {/* Size selector */}
                  <div className="mt-8">
                    <label className="text-sm font-semibold text-foreground block mb-3">
                      Select Size
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`relative w-14 h-14 rounded-xl border-2 text-sm font-semibold transition-all duration-300 ${
                            selectedSize === size
                              ? "border-primary bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                              : "border-border bg-white text-foreground hover:border-primary/50 hover:bg-primary/5"
                          }`}
                        >
                          {size}
                          {selectedSize === size && (
                            <Check className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-primary text-white rounded-full p-0.5" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Buy Button */}
                  <div className="mt-8 space-y-3">
                    <Button
                      onClick={handleCheckout}
                      disabled={!selectedSize || isLoading}
                      className="w-full h-14 text-base font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                      style={{
                        backgroundColor: selectedSize ? product.colorHex : undefined,
                      }}
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Redirecting to checkout...
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="mr-2 h-5 w-5" />
                          {selectedSize
                            ? `Buy Now — ${formatPrice(product.price)}`
                            : "Select a size"}
                        </>
                      )}
                    </Button>
                    {!selectedSize && (
                      <p className="text-center text-xs text-muted-foreground">
                        Choose your size above to continue
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Details */}
              <div className="mt-10 pt-8 border-t border-border/50 space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  Details
                </h3>
                <ul className="grid grid-cols-2 gap-3 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Premium heavyweight cotton
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Relaxed, unisex fit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Screen-printed graphics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Puff Social branding
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Pre-shrunk fabric
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Machine washable
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
