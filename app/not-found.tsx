import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div><span>404</span><h1>This page is not part of the portfolio.</h1><p>The link may be outdated or the project page may have moved.</p><Link className="button button--primary" href="/"><ArrowLeft size={17} /> Return home</Link></div>
    </main>
  );
}
