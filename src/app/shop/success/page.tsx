import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/puff/header";
import { Footer } from "@/components/puff/footer";
import { CheckCircle2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmed | Puff Social",
  description: "Thank you for your order! Your Puff Social merch is on the way.",
};

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-20 text-center max-w-lg">
          {/* Success icon with animation */}
          <div className="relative mx-auto w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight">
            Order Confirmed! 🎉
          </h1>
          <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
            Thanks for repping the culture. Your Strain Tee is on its way.
            Check your email for order details and tracking info.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop">
              <Button variant="default" size="lg" className="rounded-xl">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-xl">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="mt-12 text-xs text-muted-foreground">
            Questions about your order?{" "}
            <Link
              href="mailto:contact@puffsocialapp.com"
              className="text-primary hover:underline"
            >
              contact@puffsocialapp.com
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
