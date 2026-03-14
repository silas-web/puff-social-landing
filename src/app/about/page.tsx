import { Header } from "@/components/puff/header";
import { Footer } from "@/components/puff/footer";
import { Leaf, Sparkles, Heart } from "lucide-react";

export const metadata = {
  title: "About | Puff Social",
  description:
    "Puff Social is redefining modern dating by centering connection, compatibility, and culture for the cannabis community.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="w-full py-12 md:py-20 bg-gradient-to-b from-puff-green-light to-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Puff Social
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80 md:text-xl">
              Redefining modern dating by centering connection, compatibility,
              and culture.
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="w-full py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-10">
            {/* Section 1 */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 mt-1 flex items-center justify-center w-12 h-12 rounded-full bg-primary/15">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold font-headline sm:text-3xl">
                  A digital social club for the modern cannabis lifestyle.
                </h2>
                <p className="text-foreground/80 text-lg leading-relaxed">
                  This app is redefining modern dating by centering connection,
                  compatibility, and culture. It&apos;s a digital social club for
                  people who see cannabis not as a taboo, but as part of their
                  lifestyle. Something that brings ease, openness, and
                  authenticity into how they connect with others.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 mt-1 flex items-center justify-center w-12 h-12 rounded-full bg-accent/15">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold font-headline sm:text-3xl">
                  Vibes meet values.
                </h2>
                <p className="text-foreground/80 text-lg leading-relaxed">
                  Built for those who value vibes as much as philosophies, the app
                  removes the awkward conversations and mismatches by aligning
                  people who already speak the same language. It&apos;s not about
                  getting high — it&apos;s about meeting higher standards in
                  dating: culture, chemistry, and community.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 mt-1 flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/15">
                <Heart className="h-6 w-6 text-rose-500" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold font-headline sm:text-3xl">
                  Intention meets elevation.
                </h2>
                <p className="text-foreground/80 text-lg leading-relaxed">
                  At its core, this platform is about creating real connections in
                  a world that&apos;s tired of surface-level swipes. A place where
                  intention meets elevation, and finding companionship finally
                  feels aligned.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-puff-green-light py-10 md:py-14">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              Ready to connect differently?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-foreground/80">
              Join the waitlist and be the first to experience Puff Social.
            </p>
            <div className="mt-8">
              <a
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Join the Waitlist
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
