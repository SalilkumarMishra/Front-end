import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="w-10 h-10 animate-spin text-green-600" />
    </div>
  );
};

export default Loader;
