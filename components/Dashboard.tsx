import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import type { Villa } from '../types';
import VillaTable from './VillaTable';
import ConfirmationModal from './ConfirmationModal';
import toast from 'react-hot-toast';
import { Building, CheckCircle, XCircle, DollarSign, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  onEditVilla: (villa: Villa) => void;
  onAddVilla: () => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number, color: string }> = ({ icon, title, value, color }) => (
    <div className={`bg-gray-800 p-6 rounded-lg border-l-4 ${color}`}>
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-gray-700 text-white">
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ onEditVilla, onAddVilla }) => {
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [villaToDelete, setVillaToDelete] = useState<Villa | null>(null);

  const fetchVillas = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from('villas').select('*').order('created_at', { ascending: false });
    if (error) {
      setError(error.message);
      toast.error('Failed to fetch villas.');
    } else {
      setVillas(data as Villa[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVillas();
  }, [fetchVillas]);

  const handleDeleteVilla = async () => {
    if (!villaToDelete) return;
    const { error } = await supabase.from('villas').delete().eq('id', villaToDelete.id);
    if (error) {
      toast.error(`Failed to delete ${villaToDelete.name}.`);
    } else {
      toast.success(`${villaToDelete.name} deleted successfully.`);
      setVillas(villas.filter((v) => v.id !== villaToDelete.id));
    }
    setVillaToDelete(null);
  };

  if (loading) return <div className="flex justify-center items-center h-full"><p>Loading villas...</p></div>;
  
  if (error) return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-red-900/20 border border-red-500/50 text-red-300 p-6 rounded-lg max-w-lg text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-red-400" />
        </div>
        <h2 className="text-xl font-bold mb-2">Failed to Load Data</h2>
        <p className="mb-4">Could not fetch villa data from the database. This often happens if the Row Level Security (RLS) policies are not configured correctly in your Supabase project.</p>
        <p className="text-xs bg-gray-900/50 p-2 rounded mb-4 font-mono">{error}</p>
        <button onClick={fetchVillas} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
          Try Again
        </button>
      </div>
    </div>
  );

  const totalVillas = villas.length;
  const availableVillas = villas.filter(v => v.is_available).length;
  const totalCommission = villas.reduce((sum, v) => sum + v.commission, 0);

  return (
    <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={<Building size={24} />} title="Total Villas" value={totalVillas} color="border-blue-500" />
            <StatCard icon={<CheckCircle size={24} />} title="Available" value={availableVillas} color="border-green-500" />
            <StatCard icon={<XCircle size={24} />} title="Rented Out" value={totalVillas - availableVillas} color="border-red-500" />
            <StatCard icon={<DollarSign size={24} />} title="Total Commission" value={`Rp ${totalCommission.toLocaleString('id-ID')}`} color="border-yellow-500" />
        </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Villa Listings</h2>
          <button onClick={onAddVilla} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Add New Villa
          </button>
        </div>
        <VillaTable villas={villas} onEdit={onEditVilla} onDelete={(villa) => setVillaToDelete(villa)} />
      </div>

      {villaToDelete && (
        <ConfirmationModal
          title="Delete Villa"
          message={`Are you sure you want to delete "${villaToDelete.name}"? This action cannot be undone.`}
          onConfirm={handleDeleteVilla}
          onCancel={() => setVillaToDelete(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;