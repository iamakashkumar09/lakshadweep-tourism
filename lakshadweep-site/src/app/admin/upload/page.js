import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Upload Images / Videos
      </h1>
      <UploadForm />
    </main>
  );
}
