import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <Image
          src="/Puff_Social_Full Color_Shadow.svg"
          alt="Puff Social"
          width={140}
          height={40}
          className="h-10 w-auto"
          priority
        />
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/shop"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          prefetch={false}
        >
          <ShoppingBag className="h-4 w-4" />
          Shop
        </Link>
        <Link
          href="/about"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          prefetch={false}
        >
          About
        </Link>
      </nav>
    </header>
  );
}
