"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUrl(data.secure_url);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {url && (
        <div>
          <p>Uploaded URL:</p>
          <a href={url} target="_blank">{url}</a>
        </div>
      )}
    </div>
  );
}
