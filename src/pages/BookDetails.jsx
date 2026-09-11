import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import {
  getBook,
  addBookmark,
  SERVER_URL,
} from "../services/api";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBook();
  }, [id]);

  async function loadBook() {
    try {
      const data = await getBook(id);

      setBook(data?.book || data?.data || data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function saveBook() {
    try {
      await addBookmark(book._id);
      setMessage("Book added to your wishlist ❤️");
    } catch (error) {
      setMessage(error.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="py-24 text-center text-sm text-slate-500">
          Loading book...
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="py-24 text-center">
          <div className="text-5xl">📚</div>
          <h2 className="mt-4 text-xl font-bold">
            Book not found
          </h2>

          <Link
            to="/books"
            className="mt-5 inline-block text-sm font-bold text-blue-600"
          >
            ← Back to Books
          </Link>
        </div>
      </div>
    );
  }

  const cover = book.cover
    ? book.cover.startsWith("http")
      ? book.cover
      : `${SERVER_URL}${book.cover}`
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link
          to="/books"
          className="text-sm font-semibold text-blue-600"
        >
          ← Back to Books
        </Link>

        <section className="mt-8 grid gap-10 md:grid-cols-[300px_1fr]">
          <div className="h-[400px] overflow-hidden rounded-2xl bg-white shadow">
            {cover ? (
              <img
                src={cover}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-7xl">
                📚
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {book.subject?.name || "CSE"}
            </p>

            <h1 className="mt-2 text-3xl font-black text-slate-900">
              {book.title}
            </h1>

            <p className="mt-3 text-base text-slate-500">
              by{" "}
              <span className="font-semibold text-slate-700">
                {book.author}
              </span>
            </p>

            <div className="mt-5 flex gap-3">
              <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold">
                Semester {book.semester}
              </span>

              <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold">
                {book.difficulty}
              </span>

              <span className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-600">
                ⭐ {book.rating || 0}
              </span>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">
                About this book
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {book.description || "No description available."}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={saveBook}
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                ♡ Add to Wishlist
              </button>

              {book.resourceLink && (
                <a
                  href={book.resourceLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700"
                >
                  Read Resource ↗
                </a>
              )}
            </div>

            {message && (
              <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm font-semibold text-blue-600">
                {message}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default BookDetails;