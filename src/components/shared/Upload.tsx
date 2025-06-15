"use client";

import { Camera } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface UploadProps {
  imageUrl: string;
  publicId: string;
}

export default function Upload({ imageUrl, publicId }: UploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <div
        className={`w-full relative flex items-center justify-center h-[250px] rounded-lg bg-gray-100`}
      >
        <div
          className="bg-black/20 cursor-pointer p-4 rounded-full"
          onClick={() => inputRef.current?.click()}
        >
          <Camera size={16} />
        </div>
        <input
          type="file"
          hidden
          name="image"
          accept="image/*"
          ref={inputRef}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {file && (
          <div className="absolute rounded-lg top-0 left-0 w-full h-full flex items-center justify-center bg-black/60 z-50 bg-opacity-50">
            <Image
              src={URL.createObjectURL(file)}
              fill
              alt="preview"
              className="object-cover rounded-lg"
            />
            <div
              onClick={() => setFile(null)}
              className="absolute cursor-pointer w-8 h-8 flex items-center justify-center top-4 right-4 bg-white rounded-full p-4 border"
            >
              x
            </div>
          </div>
        )}

        {imageUrl && publicId && (
          <div className="flex flex-col">
            <Image
              src={imageUrl}
              fill
              alt="preview"
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
