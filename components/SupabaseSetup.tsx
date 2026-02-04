
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const SupabaseSetup: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
      <div className="max-w-2xl p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg border border-yellow-500/50">
        <div className="flex items-center space-x-4">
          <AlertTriangle className="w-10 h-10 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Supabase Configuration Required</h1>
        </div>
        <p className="text-gray-300">
          Welcome to your Villa Agent Dashboard! To get started, you need to connect the application to your Supabase database.
        </p>
        <div className="p-4 bg-gray-900 rounded-md">
          <h2 className="text-lg font-semibold text-white mb-2">Follow these steps:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-400">
            <li>Create a new project at <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">supabase.com</a>.</li>
            <li>In your Supabase project, go to <strong>Project Settings &gt; API</strong>.</li>
            <li>Copy your <strong>Project URL</strong> and <strong>anon public key</strong>.</li>
            <li>Open the file <code className="px-2 py-1 text-sm bg-gray-700 rounded">services/supabase.ts</code> in your project code.</li>
            <li>Replace the placeholder values for <code className="px-2 py-1 text-sm bg-gray-700 rounded">supabaseUrl</code> and <code className="px-2 py-1 text-sm bg-gray-700 rounded">supabaseAnonKey</code> with your credentials.</li>
            <li>Follow the rest of the instructions in that file to set up your database table.</li>
            <li>Once you've saved the file, this page should automatically reload.</li>
          </ol>
        </div>
        <p className="text-sm text-gray-500">
          This message is shown because the placeholder credentials are still present in the code.
        </p>
      </div>
    </div>
  );
};

export default SupabaseSetup;
