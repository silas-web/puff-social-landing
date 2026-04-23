import { Header } from "@/components/puff/header";
import { Footer } from "@/components/puff/footer";
import { Newspaper, FileText, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Media | Puff Social",
  description:
    "Press releases, media resources, and news coverage for Puff Social — the social and dating app built for the cannabis community.",
};

const pressReleases = [
  {
    title:
      "Puff Social Welcomes Federal Reclassification of Cannabis to Schedule III",
    description:
      "The cannabis social and dating platform says today\u2019s DOJ action signals a new era of federal recognition, expanded research, and long-term stability for cannabis consumers and operators alike.",
    href: "/media/federal-reclassification-statement",
    date: "April 23, 2026",
    tag: "Press Release",
  },
  {
    title:
      "Blanche-Wesley Media Group Launches Puff Social on 4/20 \u2014 A Bold New Social Platform Redefining Cannabis Culture",
    description:
      "Designed to redefine the future of cannabis culture, Puff Social offers a centralized ecosystem that seamlessly blends social networking, dating, community building, and market intelligence.",
    href: "/media/pre-launch-announcement",
    date: "April 20, 2026",
    tag: "Press Release",
  },
];

export default function MediaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="w-full py-12 md:py-20 bg-gradient-to-b from-puff-green-light to-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 mb-6">
              <Newspaper className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Media &amp; Press
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80 md:text-xl">
              Official press releases and media resources for Puff Social.
            </p>
          </div>
        </section>

        {/* Press Releases */}
        <section className="w-full py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl font-bold font-headline sm:text-3xl mb-8">
              Press Releases
            </h2>
            <div className="space-y-6">
              {pressReleases.map((release, i) => (
                <Link
                  key={i}
                  href={release.href}
                  className="group flex items-start gap-5 rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0 mt-1 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {release.date}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
                        {release.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-headline group-hover:text-primary transition-colors">
                      {release.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground/70 leading-relaxed line-clamp-2">
                      {release.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Full Release
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contact CTA */}
        <section className="w-full bg-puff-green-light py-10 md:py-14">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              Media Inquiries
            </h2>
            <p className="mx-auto mt-4 max-w-md text-foreground/80">
              For press inquiries, interviews, or media kits, reach out to us
              directly.
            </p>
            <div className="mt-8">
              <a
                href="mailto:contact@puffsocialapp.com"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Contact Press Team
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
