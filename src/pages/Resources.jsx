import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getResources } from "../services/api";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    try {
      const data = await getResources();

      setResources(
        data?.resources ||
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
            STUDY MATERIALS
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900">
            Learning Resources
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Notes, tutorials and useful materials for CSE students.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-10">
        {loading ? (
          <p className="py-20 text-center text-sm text-slate-500">
            Loading resources...
          </p>
        ) : resources.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center">
            <div className="text-5xl">📖</div>

            <h2 className="mt-4 text-xl font-bold">
              No resources available
            </h2>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <article
                key={resource._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  📄
                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  {resource.title || resource.name}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                  {resource.description ||
                    "Useful learning resource for CSE students."}
                </p>

                {resource.link && (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block text-sm font-bold text-blue-600"
                  >
                    Open Resource →
                  </a>
                )}

                {resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-block text-sm font-bold text-blue-600"
                  >
                    Open Resource →
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Resources;