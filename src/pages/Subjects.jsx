import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getSubjects } from "../services/api";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubjects();
  }, []);

  async function loadSubjects() {
    try {
      const data = await getSubjects();

      setSubjects(
        data?.subjects ||
          data?.data ||
          (Array.isArray(data) ? data : [])
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <p className="text-xs font-bold tracking-widest text-blue-600">
            CSE SUBJECTS
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900">
            Explore Subjects
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Find books and resources by subject.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-10">
        {loading ? (
          <p className="py-20 text-center text-sm text-slate-500">
            Loading subjects...
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                key={subject._id}
                to={`/subjects/${subject._id}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  💻
                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  {subject.name}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Explore books and learning materials
                </p>

                <p className="mt-4 text-sm font-bold text-blue-600">
                  View subject →
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Subjects;