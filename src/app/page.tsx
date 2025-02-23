import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">
        Welcome to Book Store
      </h1>
      <div className="mt-4">
        <Link href="/books" className="text-blue-500">
          Explore Books
        </Link>
      </div>

    </main>
  );
}