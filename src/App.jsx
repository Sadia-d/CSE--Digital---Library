import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Subjects from "./pages/Subjects";
import Resources from "./pages/Resources";
import MyLibrary from "./pages/MyLibrary";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/books" element={<Books />} />

        <Route
          path="/books/:id"
          element={<BookDetails />}
        />

        <Route
          path="/subjects"
          element={<Subjects />}
        />

        <Route
          path="/subjects/:id"
          element={<Subjects />}
        />

        <Route
          path="/resources"
          element={<Resources />}
        />

        <Route
          path="/my-library"
          element={<MyLibrary />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;