
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { FACILITIES } from '../constants';
import type { Villa, NewVilla } from '../types';
import toast from 'react-hot-toast';

interface AddVillaFormProps {
  villaToEdit?: Villa | null;
  onFormSubmit: () => void;
}

const AddVillaForm: React.FC<AddVillaFormProps> = ({ villaToEdit, onFormSubmit }) => {
  const initialState: NewVilla = {
    name: '',
    description: '',
    facilities: [],
    price: 0,
    commission: 0,
    google_maps_link: '',
    photo_link: '',
    owner_phone: '',
    is_available: true,
    marketing_caption: '',
  };

  const [formData, setFormData] = useState<NewVilla>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (villaToEdit) {
      setFormData({
        ...villaToEdit,
        facilities: villaToEdit.facilities || []
      });
    } else {
      setFormData(initialState);
    }
  }, [villaToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    }
  };

  const handleFacilityChange = (facility: string) => {
    setFormData(prev => {
      const newFacilities = prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility];
      return { ...prev, facilities: newFacilities };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let error;

    if (villaToEdit) {
      // Update existing villa
      const { error: updateError } = await supabase
        .from('villas')
        .update(formData)
        .eq('id', villaToEdit.id);
      error = updateError;
    } else {
      // Insert new villa
      const { error: insertError } = await supabase.from('villas').insert([formData]);
      error = insertError;
    }

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Villa ${villaToEdit ? 'updated' : 'added'} successfully!`);
      onFormSubmit();
    }

    setIsSubmitting(false);
  };

  const formTitle = villaToEdit ? 'Edit Villa Details' : 'Add a New Villa';
  const submitButtonText = villaToEdit ? 'Save Changes' : 'Publish Villa';

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">{formTitle}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-gray-700 rounded-lg">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Villa Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-800 text-white border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
          </div>

          <div className="p-6 bg-gray-700 rounded-lg">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} className="w-full bg-gray-800 text-white border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>

          <div className="p-6 bg-gray-700 rounded-lg">
            <label className="block text-sm font-medium text-gray-300 mb-2">Facilities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {FACILITIES.map(facility => (
                <div key={facility} className="flex items-center">
                  <input id={facility} name={facility} type="checkbox" checked={formData.facilities.includes(facility)} onChange={() => handleFacilityChange(facility)} className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500" />
                  <label htmlFor={facility} className="ml-2 text-sm text-gray-300">{facility}</label>
                </div>
              ))}
            </div>
          </div>
          
           <div className="p-6 bg-gray-700 rounded-lg">
            <label htmlFor="marketing_caption" className="block text-sm font-medium text-gray-300 mb-1">Marketing Caption</label>
            <textarea name="marketing_caption" id="marketing_caption" rows={4} value={formData.marketing_caption} onChange={handleChange} className="w-full bg-gray-800 text-white border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-white">Details</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Rental Price (per night)</label>
                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="w-full bg-gray-800 text-white border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="commission" className="block text-sm font-medium text-gray-300 mb-1">Commission</label>
                <input type="number" name="commission" id="commission" value={formData.commission} onChange={handleChange} className="w-full bg-gray-800 text-white border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="google_maps_link" className="block text-sm font-medium text-gray-300 mb-1">Google Maps Link</label>
                <input type="url" name="google_maps_link" id="google_maps_link" value={formData.google_maps_link} onChange={handleChange} className="w-full bg-gray-800 text-white border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="photo_link" className="block text-sm font-medium text-gray-300 mb-1">Google Drive Photo Link</label>
                <input type="url" name="photo_link" id="photo_link" value={formData.photo_link} onChange={handleChange} className="w-full bg-gray-800 text-white border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="owner_phone" className="block text-sm font-medium text-gray-300 mb-1">Owner's Phone</label>
                <input type="tel" name="owner_phone" id="owner_phone" value={formData.owner_phone} onChange={handleChange} className="w-full bg-gray-800 text-white border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="flex items-center justify-between pt-2">
                 <label htmlFor="is_available" className="text-sm font-medium text-gray-300">Is Available?</label>
                 <label htmlFor="is_available" className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" name="is_available" id="is_available" checked={formData.is_available} onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
              <button type="button" onClick={onFormSubmit} disabled={isSubmitting} className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition disabled:opacity-50">
                Discard
              </button>
              <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50">
                {isSubmitting ? 'Saving...' : submitButtonText}
              </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default AddVillaForm;
