import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getBooks, getPopularBooks, getSubjects, getRecentResources } from "../services/api";

const SERVER_URL = "https://cub-project-i5q4.onrender.com";

function Home() {
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHome() {
      try {
        const [bookData, popularData, subjectData, resourceData] =
          await Promise.all([
            getBooks(),
            getPopularBooks(),
            getSubjects(),
            getRecentResources(),
          ]);

        setBooks(Array.isArray(bookData) ? bookData : bookData?.books || []);
        setPopularBooks(
          Array.isArray(popularData)
            ? popularData
            : popularData?.books || []
        );
        setSubjects(
          Array.isArray(subjectData)
            ? subjectData
            : subjectData?.subjects || []
        );
        setResources(
          Array.isArray(resourceData)
            ? resourceData
            : resourceData?.resources || []
        );
      } catch (error) {
        console.error("Home loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHome();
  }, []);

  const displayBooks = popularBooks.length
    ? popularBooks.slice(0, 4)
    : books.slice(0, 4);

  const filteredBooks = displayBooks.filter((book) =>
    `${book.title} ${book.author} ${book.subject?.name || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function getCover(book) {
    if (!book?.cover) return null;
    if (book.cover.startsWith("http")) return book.cover;
    return `${SERVER_URL}${book.cover}`;
  }

  const subjectIcons = ["💻", "🧠", "🌐", "🗄️", "🔐", "📱"];
  const subjectGradients = [
    "from-blue-500 to-cyan-400",
    "from-violet-500 to-purple-500",
    "from-indigo-500 to-blue-500",
    "from-emerald-500 to-teal-400",
    "from-rose-500 to-orange-400",
    "from-fuchsia-500 to-pink-500",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071A3D]">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60" />
                CSE Digital Learning Platform
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your Knowledge.
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Your Library.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Discover computer science books, academic resources and
                learning materials — all in one beautiful digital library.
              </p>

              {/* SEARCH */}
              <div className="mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/10 p-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
                    🔎
                  </div>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search books, authors or subjects..."
                    className="min-w-0 flex-1 bg-transparent px-1 text-sm text-white outline-none placeholder:text-slate-400 sm:text-base"
                  />

                  <Link
                    to="/books"
                    className="hidden rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02] sm:block"
                  >
                    Search
                  </Link>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-300">
                <span>Popular:</span>
                {["Programming", "AI & ML", "Database", "Web Development"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />

              <div className="relative mx-auto max-w-md">
                <div className="rotate-[-5deg] rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
                  <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-7">
                    <div className="mb-10 flex items-center justify-between">
                      <span className="text-3xl">📚</span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-blue-100">
                        DIGITAL LIBRARY
                      </span>
                    </div>

                    <p className="text-sm font-medium text-blue-100">
                      Explore. Learn. Grow.
                    </p>

                    <h3 className="mt-3 text-3xl font-black text-white">
                      Computer Science
                    </h3>

                    <div className="mt-10 grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-white/10 p-3 text-center">
                        <div className="text-xl font-bold text-white">120+</div>
                        <div className="mt-1 text-[10px] text-blue-100">
                          Books
                        </div>
                      </div>
                      <div className="rounded-xl bg-white/10 p-3 text-center">
                        <div className="text-xl font-bold text-white">50+</div>
                        <div className="mt-1 text-[10px] text-blue-100">
                          Resources
                        </div>
                      </div>
                      <div className="rounded-xl bg-white/10 p-3 text-center">
                        <div className="text-xl font-bold text-white">4.9</div>
                        <div className="mt-1 text-[10px] text-blue-100">
                          Rating
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-8 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-xl">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        Learn smarter
                      </p>
                      <p className="text-xs text-slate-400">
                        Everything in one place
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5">
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["📚", `${books.length || "100"}+`, "Books Available"],
            ["📖", `${resources.length || "50"}+`, "Learning Resources"],
            ["🎓", "7", "Semesters Covered"],
            ["⭐", "4.9", "Student Rating"],
          ].map(([icon, number, label]) => (
            <div
              key={label}
              className="border-b border-slate-100 p-6 text-center last:border-0 sm:border-r lg:border-b-0"
            >
              <div className="text-2xl">{icon}</div>
              <div className="mt-2 text-2xl font-black text-slate-900">
                {number}
              </div>
              <div className="mt-1 text-sm text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Explore Categories
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Popular Subjects
            </h2>
            <p className="mt-3 max-w-xl text-slate-500">
              Find the right materials for your semester and build your
              knowledge step by step.
            </p>
          </div>

          <Link
            to="/subjects"
            className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 sm:block"
          >
            View All →
          </Link>
        </div>

        {subjects.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.slice(0, 6).map((subject, index) => (
              <Link
                key={subject._id || subject.id || index}
                to={`/subjects/${subject._id || subject.id}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br ${
                    subjectGradients[index % subjectGradients.length]
                  } opacity-10 blur-2xl transition group-hover:opacity-20`}
                />

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${
                    subjectGradients[index % subjectGradients.length]
                  } text-2xl shadow-lg`}
                >
                  {subjectIcons[index % subjectIcons.length]}
                </div>

                <h3 className="mt-5 line-clamp-2 font-bold text-slate-900 group-hover:text-blue-600">
                  {subject.name}
                </h3>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-400">Explore resources</span>
                  <span className="font-bold text-blue-600 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-4xl">📚</div>
            <h3 className="mt-4 font-bold text-slate-800">
              Subjects are coming soon
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Start exploring our book collection meanwhile.
            </p>
          </div>
        )}
      </section>

      {/* FEATURED BOOKS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-purple-600">
                Curated For You
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Featured Books
              </h2>
              <p className="mt-3 text-slate-500">
                Hand-picked books to strengthen your CSE foundation.
              </p>
            </div>

            <Link
              to="/books"
              className="hidden rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-600 sm:block"
            >
              Browse Books →
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-96 animate-pulse rounded-3xl bg-slate-100"
                />
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredBooks.map((book) => (
                <Link
                  key={book._id}
                  to={`/books/${book._id}`}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100"
                >
                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50">
                    {getCover(book) ? (
                      <img
                        src={getCover(book)}
                        alt={book.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="px-8 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-4xl shadow-xl">
                          📚
                        </div>
                        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-600">
                          CSE Library
                        </p>
                      </div>
                    )}

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm backdrop-blur">
                      {book.difficulty || "Beginner"}
                    </div>

                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm shadow-sm backdrop-blur">
                      ♡
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1 text-sm text-amber-500">
                      {"★★★★★".split("").map((star, index) => (
                        <span key={index}>{star}</span>
                      ))}
                      <span className="ml-1 text-xs text-slate-400">
                        {book.rating || 0}
                      </span>
                    </div>

                    <h3 className="mt-3 line-clamp-2 min-h-12 font-bold leading-6 text-slate-900 transition group-hover:text-blue-600">
                      {book.title}
                    </h3>

                    <p className="mt-2 line-clamp-1 text-sm text-slate-500">
                      By {book.author || "Unknown Author"}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                      <span className="text-xs font-medium text-slate-400">
                        Semester {book.semester || "—"}
                      </span>

                      <span className="text-sm font-bold text-blue-600">
                        View Book →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-14 text-center">
              <div className="text-5xl">📚</div>
              <h3 className="mt-5 text-xl font-bold text-slate-800">
                No books found
              </h3>
              <p className="mt-2 text-slate-500">
                Try another search or browse all books.
              </p>
              <Link
                to="/books"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
              >
                Browse Books
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Why CSE Library?
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              Everything you need to
              <span className="text-blue-600"> learn better.</span>
            </h2>

            <p className="mt-5 leading-7 text-slate-500">
              A focused digital library designed for computer science students,
              making academic resources easier to discover and organize.
            </p>

            <Link
              to="/books"
              className="mt-7 inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5"
            >
              Start Exploring →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["🔎", "Easy Discovery", "Find books and resources quickly."],
              ["🔖", "Save Favorites", "Keep useful books in your library."],
              ["⭐", "Student Reviews", "See ratings and feedback."],
              ["🎓", "CSE Focused", "Resources built around CSE learning."],
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  {icon}
                </div>
                <h3 className="mt-5 font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      {resources.length > 0 && (
        <section className="bg-slate-900 py-20">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-10">
              <p className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                Fresh Materials
              </p>
              <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Recent Resources
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {resources.slice(0, 3).map((resource, index) => (
                <div
                  key={resource._id || index}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10"
                >
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                    RESOURCE
                  </span>

                  <h3 className="mt-5 line-clamp-2 text-lg font-bold text-white">
                    {resource.title || resource.name || "Learning Resource"}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                    {resource.description ||
                      "Explore this useful academic learning resource."}
                  </p>

                  <Link
                    to="/resources"
                    className="mt-6 inline-block text-sm font-bold text-cyan-400 hover:text-cyan-300"
                  >
                    Explore Resource →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-5 py-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 shadow-2xl shadow-blue-200 sm:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-100">
                Start Learning Today
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-black text-white sm:text-4xl">
                Your next great discovery is waiting.
              </h2>
              <p className="mt-3 max-w-xl text-blue-100">
                Browse our growing collection of CSE books and resources.
              </p>
            </div>

            <Link
              to="/books"
              className="shrink-0 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-blue-700 shadow-xl transition hover:-translate-y-1"
            >
              Explore Library →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-[#071A3D]">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl">
                  📚
                </div>
                <span className="text-lg font-black text-white">
                  CSE Digital Library
                </span>
              </div>

              <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
                A modern digital library and resource hub for computer science
                students.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">Explore</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <Link className="block hover:text-white" to="/books">
                  Books
                </Link>
                <Link className="block hover:text-white" to="/subjects">
                  Subjects
                </Link>
                <Link className="block hover:text-white" to="/resources">
                  Resources
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white">Account</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <Link className="block hover:text-white" to="/login">
                  Login
                </Link>
                <Link className="block hover:text-white" to="/register">
                  Register
                </Link>
                <Link className="block hover:text-white" to="/my-library">
                  My Library
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © 2026 CSE Digital Library & Resource Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;