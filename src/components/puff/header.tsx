import Link from "next/link";
import { Cannabis } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <Cannabis className="h-8 w-8 text-primary" />
        <span className="ml-2 text-xl font-bold font-headline">Puff Social</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6" />
    </header>
  );
}
