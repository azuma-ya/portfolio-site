import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Loader className="size-8 animate-spin font-bold" />
    </div>
  );
};

export default Loading;
