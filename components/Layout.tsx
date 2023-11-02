import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div className="flex gap-10 border border-red-100 items-center justify-center px-8 py-4">
        <Link href="/">Home</Link>
        <Link href="/electronics">Electronics</Link>
        <Link href="/clothes">Clothes</Link>
      </div>

      <main>{children}</main>
    </div>
  );
}

export default Layout;
