import Link from "next/link";
import { Mail, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">
        <Link href="/admin" className="hover:text-primary transition-colors">&copy;</Link> {new Date().getFullYear()} Puff Social. All rights reserved.
      </p>
      <div className="sm:ml-auto flex items-center gap-4">
        <Link
          href="https://www.instagram.com/puffsocialapp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <Instagram className="h-3.5 w-3.5" />
          @puffsocialapp
        </Link>
        <Link
          href="mailto:contact@puffsocialapp.com"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
          contact@puffsocialapp.com
        </Link>
      </div>
    </footer>
  );
}
