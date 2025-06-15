import { Loader } from "lucide-react";

export default function loading() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-17vh)] w-full">
      <Loader className="animate-spin w-6 h-6" />
    </div>
  );
}
