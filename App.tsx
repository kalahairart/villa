import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AddVillaForm from './components/AddVillaForm';
import { Toaster } from 'react-hot-toast';
import type { Villa } from './types';
import { isSupabaseConfigured } from './services/supabase';
import SupabaseSetup from './components/SupabaseSetup';
import Login from './components/Login';
import { useAuth } from './hooks/useAuth';
import { LoaderCircle } from 'lucide-react';

type View = 'dashboard' | 'add' | 'edit';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [villaToEdit, setVillaToEdit] = useState<Villa | null>(null);
  const { session, loading } = useAuth();

  if (!isSupabaseConfigured) {
    return <SupabaseSetup />;
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <LoaderCircle className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
    if (view !== 'edit') {
      setVillaToEdit(null);
    }
  }, []);

  const handleEditVilla = useCallback((villa: Villa) => {
    setVillaToEdit(villa);
    setCurrentView('edit');
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'add':
        return <AddVillaForm onFormSubmit={() => handleNavigate('dashboard')} />;
      case 'edit':
        return <AddVillaForm villaToEdit={villaToEdit} onFormSubmit={() => handleNavigate('dashboard')} />;
      case 'dashboard':
      default:
        return <Dashboard onEditVilla={handleEditVilla} onAddVilla={() => handleNavigate('add')} />;
    }
  };

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            background: '#334155',
            color: '#fff',
          },
        }}
      />
      <Layout onNavigate={handleNavigate}>
        {renderContent()}
      </Layout>
    </>
  );
};

export default App;
