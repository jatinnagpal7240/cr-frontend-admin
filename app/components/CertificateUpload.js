"use client";

import { useState } from "react";

export default function CertificateUpload() {
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !course || !file) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("course", course);
    formData.append("certificate", file);

    const res = await fetch(
      "https://cr-backend-2gzz.onrender.com/api/certificates/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    alert(data.message || "Uploaded");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Student Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Course (e.g. python@100)"
        className="w-full p-2 border rounded"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*,application/pdf"
        className="w-full p-2"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload Certificate
      </button>
    </form>
  );
}
