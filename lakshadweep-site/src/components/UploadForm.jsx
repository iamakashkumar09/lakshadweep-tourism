"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setUrl("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Upload failed");
        return;
      }

      // 🔑 THIS LINE ENABLES STEP-1B
      setUrl(data.secure_url);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* 1️⃣ Select file */}
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* 2️⃣ STEP-1A: Preview BEFORE upload */}
      {file && (
        <div>
          {file.type.startsWith("image") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="max-h-64 rounded border"
            />
          ) : (
            <video
              src={URL.createObjectURL(file)}
              controls
              className="max-h-64 rounded border"
            />
          )}
        </div>
      )}

      {/* 3️⃣ Upload button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* 4️⃣ STEP-1B: Preview AFTER upload */}
      {url && (
        <div className="mt-6">
          <p className="font-bold">Uploaded Successfully</p>

          {url.includes(".mp4") ? (
            <video
              src={url}
              controls
              className="max-h-64 rounded border"
            />
          ) : (
            <img
              src={url}
              alt="uploaded"
              className="max-h-64 rounded border"
            />
          )}

          <a
            href={url}
            target="_blank"
            className="block text-blue-600 underline break-all mt-2"
          >
            {url}
          </a>
        </div>
      )}
    </div>
  );
}
