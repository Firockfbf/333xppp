import { Header } from "@/components/public/Header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="y2k-page min-h-screen">
      <Header />
      <main>{children}</main>
      <footer className="container-shell border-t border-white/10 py-8 text-sm text-white/45">
        333XPPP CLOTHES. Upcycled, handmade, no gender. Online portal issue 01.
      </footer>
    </div>
  );
}
