import { getAllSlugsDebug } from '@/lib/sanity/queries';

export default async function DebugSlugsPage() {
  const slugs = await getAllSlugsDebug();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Debug: Available Slugs</h1>

      <div className="space-y-4">
        {slugs.map((item: any) => (
          <div key={item._id} className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Post ID: {item._id}</h3>
            <p><strong>Language:</strong> {item.language}</p>
            <p><strong>English Title:</strong> {item.title?.en}</p>
            <p><strong>Polish Title:</strong> {item.title?.pl}</p>
            <p><strong>English Slug:</strong> {item.slug_en_current}</p>
            <p><strong>Polish Slug:</strong> {item.slug_pl_current}</p>

            <div className="mt-2 text-sm text-gray-600">
              <p><strong>URLs:</strong></p>
              <p>Polish: <code>/baza-wiedzy/{item.slug_pl_current}</code></p>
              <p>English: <code>/en/knowledge-base/{item.slug_en_current}</code></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
