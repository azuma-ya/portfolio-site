import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin font-bold" strokeWidth={4} />
    </div>
  );
};

export default Loading;
