import { Header } from "@/components/puff/header";
import { Footer } from "@/components/puff/footer";
import { ArrowLeft, Download, Calendar, Building2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type ContactInfo = {
  name: string;
  role: string;
  email: string;
};

type PressRelease = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  pdfHref: string;
  aboutText: string;
  contacts: ContactInfo[];
  content: React.ReactNode;
};

const pressReleases: PressRelease[] = [
  {
    slug: "federal-reclassification-statement",
    title:
      "Puff Social Welcomes Federal Reclassification of Cannabis to Schedule III, Citing Historic Step Forward for Community, Culture, and the Industry",
    subtitle:
      "The cannabis social and dating platform says today\u2019s DOJ action signals a new era of federal recognition, expanded research, and long-term stability for cannabis consumers and operators alike.",
    date: "April 23, 2026",
    location: "CHICAGO, IL",
    pdfHref: "/press/Puff Social Media Release (1).docx.pdf",
    aboutText:
      "Puff Social is a social and dating app built for the cannabis community \u2014 designed for connection, discovery, and culture. The platform\u2019s three core pillars \u2014 420 Matchmaking, Communities, and Discovery \u2014 connect America\u2019s 31.6 million cannabis consumers with one another, with local events, and with the dispensaries and brands they love. Puff Social launched its beta in Chicago, IL on April 20, 2026, and is currently expanding to additional markets.",
    contacts: [
      {
        name: "Leslie Jones",
        role: "Chief of Staff, Puff Social",
        email: "Leslie@puffsocialapp.com",
      },
      {
        name: "Mya Jones",
        role: "Chief Marketing Officer, Puff Social",
        email: "Mya@puffsocialapp.com",
      },
    ],
    content: (
      <>
        <p>
          <strong>Puff Social</strong>, the social and dating app built
          exclusively for the cannabis community, today issued a statement in
          response to the Trump Administration&apos;s announcement that the
          Department of Justice and Drug Enforcement Administration (DEA) are
          immediately reclassifying FDA-approved and state-licensed medical
          marijuana products from Schedule I to Schedule III under the Controlled
          Substances Act.
        </p>
        <p>
          The action, taken pursuant to President Trump&apos;s December 18, 2025
          Executive Order directing expedited reclassification, marks the most
          significant shift in federal cannabis policy in decades. Acting
          Attorney General Todd Blanche signed the order Thursday, with an
          expedited administrative hearing set for June 29, 2026 to consider
          broader rescheduling of all marijuana. The move does not federally
          legalize cannabis but recognizes its medical utility, eases research
          barriers, and provides licensed operators with meaningful tax relief
          for the first time.
        </p>
        <p>
          For Puff Social — a platform purpose-built to connect America&apos;s
          estimated 31.6 million cannabis consumers through matchmaking,
          community, and dispensary discovery — the reclassification affirms the
          legitimacy of the lifestyle and culture at the heart of the
          company&apos;s mission.
        </p>

        <blockquote>
          <p>
            &ldquo;Federal reclassification represents a significant step
            forward for the community and the culture we represent. Our goal at
            Puff Social has always been to provide a dedicated space for people
            to connect safely and authentically. We look forward to seeing how
            these changes help our community grow and thrive in a more recognized
            and stable environment.&rdquo;
          </p>
          <footer>
            <strong>Mark Grady</strong>, President, Puff Social
          </footer>
        </blockquote>

        <p>
          Puff Social, which launched its beta on April 20, 2026 in Chicago, IL,
          is currently raising a pre-seed round and is actively expanding its
          user base and dispensary partnerships across additional states. The
          company&apos;s compliance-first infrastructure was designed with
          regulatory evolution in mind, positioning Puff Social as a stable
          platform for the industry&apos;s next chapter.
        </p>

        <blockquote>
          <p>
            &ldquo;The shift to Schedule III is a pivotal moment for our
            industry. It brings a necessary level of federal recognition and
            research opportunity that aligns with the compliance-first
            infrastructure we&apos;ve built at Puff Social. We are focused on
            supporting our community through these transitions and providing the
            stable platform needed for this next chapter of growth.&rdquo;
          </p>
          <footer>
            <strong>Silas Jefferson</strong>, Chief Executive Officer, Puff
            Social
          </footer>
        </blockquote>

        <p>
          The reclassification also opens the door to expanded cannabis research,
          improved banking access, and tax deductions for licensed operators —
          developments Puff Social believes will accelerate both consumer
          adoption and industry investment over the coming years. The company
          encourages interested investors, dispensary operators, and community
          members to connect via its growing waitlist at{" "}
          <a
            href="https://puffsocialapp.com"
            className="text-primary hover:underline font-medium"
          >
            puffsocialapp.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    slug: "pre-launch-announcement",
    title:
      "Blanche-Wesley Media Group Launches Puff Social on 4/20 \u2014 A Bold New Social Platform Redefining Cannabis Culture",
    subtitle:
      "Designed to redefine the future of cannabis culture, Puff Social offers a centralized ecosystem that seamlessly blends social networking, dating, community building, and market intelligence for the average consumer.",
    date: "April 20, 2026",
    location: "CHICAGO, IL",
    pdfHref: "/press/Puff Social Pre-Launch Press Release  (1) (1).pdf",
    aboutText:
      "Puff Social is a Chicago-based, next-generation social networking platform where the cannabis community comes alive. Whether searching for your next connection, your next dispensary, or your next deep dive into the industry reshaping modern wellness, Puff Social puts it all in your pocket. This is cannabis culture, connected. Operated by the Blanche-Wesley Media Group, the app connects users through dating, discovery tools, and curated content, providing a centralized hub for the modern cannabis enthusiast.",
    contacts: [
      {
        name: "Leslie Jones",
        role: "Puff Social, LLC",
        email: "info@puffsocialapp.com",
      },
    ],
    content: (
      <>
        <p>
          <strong>Puff Social, LLC</strong>, a subsidiary of the Blanche-Wesley
          Media Group, is proud to announce the official beta launch of its
          next-generation social networking platform on April 20th. Designed to
          redefine the future of cannabis culture, Puff Social offers a
          centralized ecosystem that seamlessly blends social networking, dating,
          community building, and market intelligence for the average consumer.
        </p>
        <p>
          The launch arrives at a pivotal moment. With the U.S. cannabis market
          projected to surpass $50 billion in the coming years and tens of
          millions of Americans identifying as regular consumers, the community
          has long lacked a dedicated, stigma-free social platform to call home.
          Puff Social fills that void with a thriving social network built for
          sparking authentic relationships, genuine active community, and at the
          heart of it all, zero judgment.
        </p>

        <blockquote>
          <p>
            &ldquo;Puff Social is more than an app, it is a home for the
            millions of people who live, breathe, and believe in the cannabis
            lifestyle. We&apos;re not just building a platform. We&apos;re
            bridging the culture.&rdquo;
          </p>
          <footer>
            <strong>Mark Grady</strong>, Founder and President, Puff Social, LLC
          </footer>
        </blockquote>

        <p>
          At its core, Puff Social is designed around three pillars: community,
          discovery, and intelligence. Users can swipe through a curated social
          feed, join and create community groups to forge genuine connections and
          relationships; explore an interactive dispensary maps feature where
          community-powered reviews hold businesses accountable and elevate
          quality across the market; and access a dynamic cannabis news hub that
          delivers real-time industry coverage from legislation and science to
          business and lifestyle.
        </p>

        <blockquote>
          <p>
            &ldquo;Our goal is to define the future of cannabis culture by
            creating a lifestyle experience that goes beyond a simple
            transaction. Puff Social is where the culture gets its own platform
            and its own voice.&rdquo;
          </p>
          <footer>
            <strong>Silas Jefferson</strong>, CEO, Puff Social
          </footer>
        </blockquote>

        <p>
          The beta launch opens for public access on April 20th, following an
          exclusive pre-launch beginning April 18th. Early access sign-ups are
          now live at{" "}
          <a
            href="https://puffsocialapp.com"
            className="text-primary hover:underline font-medium"
          >
            www.puffsocialapp.com
          </a>{" "}
          and follow Puff Social on all major platforms{" "}
          <strong>@Puffsocialapp</strong>.
        </p>
        <p>
          To celebrate the launch, Blanche-Wesley Media Group will host a launch
          party for the Puff Social App, on April 18th from 3-6pm. The event
          will bring together cannabis advocates, industry leaders, media, and
          the broader community for an evening of culture, conversation, and
          connection. For event details and RSVP information, contact{" "}
          <a
            href="mailto:info@puffsocialapp.com"
            className="text-primary hover:underline font-medium"
          >
            info@puffsocialapp.com
          </a>
          .
        </p>
      </>
    ),
  },
];

export function generateStaticParams() {
  return pressReleases.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const release = pressReleases.find((r) => r.slug === params.slug);
  if (!release) return {};
  return {
    title: `${release.title} | Puff Social`,
    description: release.subtitle,
  };
}

export default async function PressReleasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = pressReleases.find((r) => r.slug === slug);
  if (!release) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero / Header */}
        <section className="w-full bg-gradient-to-b from-puff-green-light to-background border-b">
          <div className="container mx-auto px-4 md:px-6 pt-8 pb-12 md:pt-12 md:pb-16 max-w-4xl">
            {/* Back + Download Row */}
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/media"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                All Press Releases
              </Link>
              <a
                href={release.pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/15 px-4 py-2 rounded-full"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="inline-flex items-center gap-1.5 uppercase tracking-widest text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Press Release
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {release.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                {release.location}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold leading-tight tracking-tight font-headline">
              {release.title}
            </h1>

            {/* Subtitle / Deck */}
            <p className="mt-5 text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl">
              {release.subtitle}
            </p>
          </div>
        </section>

        {/* Article Body */}
        <section className="w-full py-10 md:py-14">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <article className="prose prose-lg prose-green max-w-none [&>p]:text-foreground/85 [&>p]:leading-relaxed [&>p]:mb-6 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:bg-puff-green-light/50 [&>blockquote]:rounded-r-xl [&>blockquote]:py-6 [&>blockquote]:px-8 [&>blockquote]:my-8 [&>blockquote]:not-italic [&>blockquote>p]:text-foreground/90 [&>blockquote>p]:text-lg [&>blockquote>p]:leading-relaxed [&>blockquote>p]:mb-3 [&>blockquote>footer]:text-sm [&>blockquote>footer]:text-muted-foreground [&>blockquote>footer]:mt-2">
              {release.content}
            </article>

            {/* Divider */}
            <hr className="my-12 border-border" />

            {/* About Section */}
            <div className="mb-10">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                About Puff Social
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                {release.aboutText} For more information, visit{" "}
                <a
                  href="https://puffsocialapp.com"
                  className="text-primary hover:underline font-medium"
                >
                  puffsocialapp.com
                </a>
                .
              </p>
            </div>

            {/* Media Contact */}
            <div className="rounded-xl border border-border/60 bg-card p-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">
                Media Contact
              </h2>
              <div className={`grid grid-cols-1 ${release.contacts.length > 1 ? "sm:grid-cols-2" : ""} gap-8`}>
                {release.contacts.map((contact, i) => (
                  <div key={i}>
                    <p className="font-semibold text-foreground">
                      {contact.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {contact.role}
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-primary hover:underline mt-2 block"
                    >
                      {contact.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
