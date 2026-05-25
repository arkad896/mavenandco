import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function SupabaseTestPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch the data from todos table
  const { data: todos, error } = await supabase.from('todos').select();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">⚡</span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Supabase Connection Sandbox
            </h1>
            <p className="text-sm text-slate-400">Next.js Server Side Rendering (SSR) Test Page</p>
          </div>
        </div>

        <div className="border-t border-slate-800 my-4" />

        {error ? (
          <div className="bg-red-950/50 border border-red-900/60 rounded-xl p-4 text-sm text-red-300 space-y-2">
            <p className="font-semibold">⚠️ Database Query Failed</p>
            <p className="text-xs text-red-400/90 leading-relaxed font-mono">
              Error Message: {error.message}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              Note: This is expected if the `todos` table has not yet been created in your Supabase project. Go to the Supabase Table Editor and create a table named `todos` with a `name` column to see items display!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-500 uppercase tracking-wider">
              <span>Todo Item list ({todos?.length || 0})</span>
              <span className="text-emerald-400 font-semibold uppercase">Connected</span>
            </div>
            
            {todos && todos.length > 0 ? (
              <ul className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                {todos.map((todo: any) => (
                  <li key={todo.id} className="px-5 py-4 flex items-center space-x-3 hover:bg-slate-900/40 transition-colors">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" />
                    <span className="text-sm font-medium text-slate-200">{todo.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border border-dashed border-slate-800 rounded-xl p-6 text-center text-sm text-slate-400 space-y-2">
                <p>📭 The `todos` table is currently empty.</p>
                <p className="text-xs text-slate-500">Add some rows in your Supabase Database editor to view them live!</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center text-xs text-slate-500 pt-4">
          Supabase URL: <code className="text-slate-400">{process.env.NEXT_PUBLIC_SUPABASE_URL}</code>
        </div>
      </div>
    </main>
  );
}
