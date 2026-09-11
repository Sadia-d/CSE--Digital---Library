import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getBooks, SERVER_URL } from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const data = await getBooks();

      setBooks(
        data?.books ||
          data?.data ||
          (Array.isArray(data) ? data : [])
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredBooks = books.filter((book) => {
    const text = `${book.title} ${book.author} ${
      book.subject?.name || ""
    }`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <p className="text-xs font-bold tracking-widest text-blue-600">
            DIGITAL LIBRARY
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900">
            Explore Books
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Find useful books for your CSE journey.
          </p>

          <div className="mt-6 max-w-xl">
            <input
              type="text"
              placeholder="Search books, authors or subjects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-10">
        {loading ? (
          <div className="py-20 text-center text-sm text-slate-500">
            Loading books...
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center">
            <div className="text-5xl">📚</div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No books found
            </h2>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredBooks.map((book) => {
              const cover = book.cover
                ? book.cover.startsWith("http")
                  ? book.cover
                  : `${SERVER_URL}${book.cover}`
                : null;

              return (
                <Link
                  key={book._id}
                  to={`/books/${book._id}`}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-64 overflow-hidden bg-slate-100">
                    {cover ? (
                      <img
                        src={cover}
                        alt={book.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-6xl">
                        📚
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-[11px] font-bold uppercase text-blue-600">
                      {book.subject?.name || "CSE"}
                    </p>

                    <h2 className="mt-1.5 line-clamp-2 text-lg font-bold text-slate-900">
                      {book.title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {book.author}
                    </p>

                    <div className="mt-3 flex justify-between text-xs">
                      <span className="text-slate-500">
                        Semester {book.semester}
                      </span>

                      <span className="font-bold text-amber-500">
                        ⭐ {book.rating || 0}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default Books;