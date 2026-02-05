"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/puff/header";
import { Footer } from "@/components/puff/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log(`Signing up with email: ${email}`);
      setIsSignedUp(true);
      // Here you would typically send the email to your backend service
    }
  };

  const WaitlistForm = () => {
    if (isSignedUp) {
      return (
        <div className="flex justify-center">
          <p className="text-center text-lg font-medium text-primary">
            You're on the list. We'll be in touch soon.
          </p>
        </div>
      );
    }
    return (
      <form
        onSubmit={handleSignUp}
        className="flex w-full max-w-md items-center space-x-2"
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
          className="flex-1"
        />
        <Button type="submit">Join the Waitlist</Button>
      </form>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full border-b py-20 md:py-32 lg:py-40 bg-gradient-to-b from-puff-green-light to-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Where cannabis culture meets real connection.
                </h1>
                <p className="mt-4 max-w-[600px] text-foreground/80 md:text-xl">
                  A social and dating app built for the cannabis community—designed for connection, discovery, and culture.
                </p>
                <div className="mt-8 w-full max-w-md">
                  <WaitlistForm />
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/IMG_7026-portrait.png"
                  alt="Puff Social Matches Screen"
                  width={300}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Stigma and Trust Section */}
        <section className="w-full border-b bg-puff-green-light py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
              <div className="flex flex-col items-start text-left">
                 <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                    Most dating apps make cannabis users hide who they are.
                    <span className="block text-primary">Puff Social was built so you don’t have to.</span>
                </h2>
              </div>

              <div className="flex flex-col items-start gap-6 rounded-lg bg-background/50 p-8">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold font-headline">
                    A community you can trust.
                  </h3>
                </div>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-lg sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                  <li className="flex flex-col items-start">
                    <span className="font-semibold text-primary">21+</span>
                    <span className="text-muted-foreground">Community</span>
                  </li>
                  <li className="flex flex-col items-start">
                    <span className="font-semibold text-primary">Privacy-first</span>
                    <span className="text-muted-foreground">Profiles</span>
                  </li>
                  <li className="flex flex-col items-start">
                    <span className="font-semibold text-primary">Inclusive</span>
                    <span className="text-muted-foreground">& Judgment-Free</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Combined Features & Visuals Section */}
        <section className="w-full border-b py-12 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-start">
                    
                    {/* Feature 1 */}
                    <div className="flex flex-col items-center animate-in fade-in-0 slide-in-from-bottom-10 duration-500">
                        <div className="mb-6 flex h-[480px] items-center">
                           <Image
                              src="/IMG_7026-portrait.png"
                              alt="Puff Social Matches Screen"
                              width={240}
                              height={480}
                              className="rounded-2xl shadow-xl"
                            />
                        </div>
                        <h3 className="text-2xl font-bold font-headline">Find Your People</h3>
                        <p className="mt-2 text-foreground/80 max-w-xs">
                            Meet like-minded people who actually share your lifestyle.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col items-center animate-in fade-in-0 slide-in-from-bottom-10 duration-700" style={{ animationDelay: '200ms' }}>
                        <div className="mb-6 flex h-[480px] items-center">
                            <Image
                              src="/IMG_7025-portrait.png"
                              alt="Puff Social User Profile"
                              width={240}
                              height={480}
                              className="rounded-2xl shadow-xl"
                            />
                        </div>
                        <h3 className="text-2xl font-bold font-headline">Discover Dispensaries</h3>
                        <p className="mt-2 text-foreground/80 max-w-xs">
                            Real reviews and recommendations from the community.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col items-center animate-in fade-in-0 slide-in-from-bottom-10 duration-900" style={{ animationDelay: '400ms' }}>
                        <div className="mb-6 flex h-[480px] items-center">
                             <Image
                              src="/IMG_7024-left.png"
                              alt="Puff Social News Feed"
                              width={240}
                              height={480}
                              className="rounded-2xl shadow-xl object-cover object-left"
                            />
                        </div>
                        <h3 className="text-2xl font-bold font-headline">Stay Connected</h3>
                        <p className="mt-2 text-foreground/80 max-w-xs">
                            Cannabis news, culture, and community updates in one place.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full bg-puff-green-light py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              Join the waitlist and be the first to know.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-foreground/80">
              Get early access to Puff Social and help shape the future of cannabis connection.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
