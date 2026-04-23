"use client";

import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      id={`product-card-${product.slug}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white border border-border/50 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-border">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.images.mockup}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
          />
          {/* Coming Soon overlay */}
          {product.comingSoon && (
            <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-[11px] font-semibold text-white uppercase tracking-wider">
              Coming Soon
            </div>
          )}
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Quick-shop badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
            View Details →
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          {/* Color accent bar */}
          <div
            className="w-10 h-1 rounded-full mb-3 transition-all duration-500 group-hover:w-16"
            style={{ backgroundColor: product.colorHex }}
          />
          <h3 className="font-bold text-lg font-headline tracking-tight text-gray-900">
            {product.strain}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {product.tagline}
          </p>
          <div className="flex items-center justify-between mt-3">
            {product.comingSoon ? (
              <span className="text-sm font-semibold text-muted-foreground italic">
                Price TBA
              </span>
            ) : (
              <span className="text-lg font-bold" style={{ color: product.colorHex }}>
                {formatPrice(product.price)}
              </span>
            )}
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Strain Tees
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
