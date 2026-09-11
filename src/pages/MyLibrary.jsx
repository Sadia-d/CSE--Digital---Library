import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import {
  getBookmarks,
  deleteBookmark,
  SERVER_URL,
} from "../services/api";

function MyLibrary() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBookmarks();
  }, []);

  async function loadBookmarks() {
    try {
      setLoading(true);
      setError("");

      const data = await getBookmarks();

      const list =
        data?.bookmarks ||
        data?.data ||
        (Array.isArray(data) ? data : []);

      setBookmarks(list);
    } catch (err) {
      setError(err.message || "Unable to load wishlist.");
    } finally {
      setLoading(false);
    }
  }

  async function removeBook(id) {
    try {
      await deleteBookmark(id);

      setBookmarks((items) =>
        items.filter((item) => item._id !== id)
      );
    } catch (err) {
      alert(err.message);
    }
  }

  function getBook(item) {
    return item.book || item.bookId || item;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <p className="text-xs font-bold tracking-widest text-blue-600">
            MY LIBRARY
          </p>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-900">
                My Wishlist
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Your saved books.
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 px-4 py-2 text-center">
              <p className="text-xl font-bold text-blue-600">
                {bookmarks.length}
              </p>

              <p className="text-[10px] font-bold text-slate-500">
                SAVED
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-10">
        {loading && (
          <p className="py-20 text-center text-sm text-slate-500">
            Loading your library...
          </p>
        )}

        {!loading && error && (
          <div className="mx-auto max-w-md rounded-xl bg-red-50 p-6 text-center">
            <p className="text-sm font-semibold text-red-600">
              {error}
            </p>

            <button
              onClick={loadBookmarks}
              className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && bookmarks.length === 0 && (
          <div className="mx-auto max-w-md rounded-2xl bg-white p-10 text-center">
            <div className="text-5xl">❤️</div>

            <h2 className="mt-4 text-xl font-bold">
              Wishlist is empty
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Save books to see them here.
            </p>

            <Link
              to="/books"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white"
            >
              Explore Books
            </Link>
          </div>
        )}

        {!loading && !error && bookmarks.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bookmarks.map((bookmark) => {
              const book = getBook(bookmark);

              const cover = book?.cover
                ? book.cover.startsWith("http")
                  ? book.cover
                  : `${SERVER_URL}${book.cover}`
                : null;

              return (
                <article
                  key={bookmark._id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-lg"
                >
                  <Link to={`/books/${book?._id}`}>
                    <div className="h-60 bg-slate-100">
                      {cover ? (
                        <img
                          src={cover}
                          alt={book?.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl">
                          📚
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <p className="text-[11px] font-bold uppercase text-blue-600">
                      {book?.subject?.name || "CSE"}
                    </p>

                    <Link to={`/books/${book?._id}`}>
                      <h2 className="mt-1 text-base font-bold text-slate-900">
                        {book?.title || "Untitled"}
                      </h2>
                    </Link>

                    <p className="mt-1 text-sm text-slate-500">
                      {book?.author || "Unknown"}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                      <span className="text-sm font-bold text-amber-500">
                        ⭐ {book?.rating || 0}
                      </span>

                      <button
                        onClick={() => removeBook(bookmark._id)}
                        className="text-xs font-bold text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyLibrary;