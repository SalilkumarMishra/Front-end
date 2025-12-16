import { MapPin, Phone, Trash2 } from 'lucide-react';

const AddressCard = ({ address, selected, onSelect, onDelete }) => {
  return (
    <div 
      className={`border rounded-lg p-4 cursor-pointer transition-all ${selected ? 'border-green-600 bg-green-50 ring-1 ring-green-600' : 'border-gray-200 hover:border-green-300'}`}
      onClick={() => onSelect && onSelect(address)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-semibold text-gray-900 mb-1">{address.fullName}</p>
          <div className="text-sm text-gray-600 space-y-1">
             <div className="flex items-start">
               <MapPin className="w-4 h-4 mt-0.5 mr-2 shrink-0 text-gray-400" />
               <span>
                  {address.house}, {address.street}<br/>
                  {address.city}, {address.state} - {address.pincode}
               </span>
             </div>
             <div className="flex items-center">
               <Phone className="w-4 h-4 mr-2 text-gray-400" />
               <span>{address.phone}</span>
             </div>
          </div>
        </div>
        {onDelete && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(address._id);
            }}
            className="text-gray-400 hover:text-red-500 p-1"
            title="Remove address"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
