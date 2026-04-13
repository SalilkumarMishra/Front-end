import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import AddressCard from '../../components/address/AddressCard';
import Loader from '../../components/common/Loader';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Address = ({ onSelect, selectedId, isSelectionMode = false }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', house: '', street: '', city: '', state: '', pincode: ''
  });

  const fetchAddresses = async () => {
    try {
      const { data } = await axiosClient.get('/address');
      setAddresses(data.addresses || data);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/address', formData);
      toast.success('Address added');
      setShowForm(false);
      setFormData({ fullName: '', phone: '', house: '', street: '', city: '', state: '', pincode: '' });
      fetchAddresses();
    } catch {
      toast.error('Failed to add address');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={isSelectionMode ? "" : "max-w-4xl mx-auto px-4 py-8"}>
      {!isSelectionMode && <h1 className="text-3xl font-bold text-gray-900 mb-8">My Addresses</h1>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-600 transition min-h-[150px]"
        >
          <Plus className="w-8 h-8 mb-2" />
          <span className="font-medium">Add New Address</span>
        </button>

        {addresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            selected={selectedId === address._id}
            onSelect={onSelect ? () => onSelect(address) : undefined}
          />
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Add New Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
              <input type="text" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="house" placeholder="House/Flat No" required value={formData.house} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
                <input type="text" name="street" placeholder="Street" required value={formData.street} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
                <input type="text" name="state" placeholder="State" required value={formData.state} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />
              </div>
              <input type="text" name="pincode" placeholder="Pincode" required value={formData.pincode} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2" />

              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition font-medium">Save Address</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
