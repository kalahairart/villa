
import React from 'react';
import type { Villa } from '../types';
import { Edit, Trash2 } from 'lucide-react';

interface VillaTableProps {
  villas: Villa[];
  onEdit: (villa: Villa) => void;
  onDelete: (villa: Villa) => void;
}

const VillaTable: React.FC<VillaTableProps> = ({ villas, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price/Night</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Commission</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Availability</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {villas.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-400">No villas found. Add one to get started!</td>
            </tr>
          ) : (
            villas.map((villa) => (
              <tr key={villa.id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{villa.name}</div>
                  <div className="text-sm text-gray-400">{villa.description.substring(0, 40)}...</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Rp {villa.price.toLocaleString('id-ID')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Rp {villa.commission.toLocaleString('id-ID')}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {villa.is_available ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                      Available
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900 text-red-300">
                      Rented
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-4">
                    <button onClick={() => onEdit(villa)} className="text-blue-400 hover:text-blue-300">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => onDelete(villa)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VillaTable;
