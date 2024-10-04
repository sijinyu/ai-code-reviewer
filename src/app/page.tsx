import CodeReviewer from '@/components/CodeReviewer';
import Editor from '@/components/Editor';
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">AI Code Reviewer</h1>
      <section className='w-full space-y-5 max-w-screen-lg'>
      <CodeReviewer />
      <Editor />
      </section>
    </main>
  );
};

