"use client";

import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import Upload from "./Upload";

interface PostFormProps {
  categories: { id: string; name: string }[];
  defaultTitle?: string;
  defaultSummary?: string;
  defaultBody?: string;
  defaultCategory?: string;
  imageUrl?: string;
  publicId?: string;
  postId?: string;
}

export default function PostForm({
  categories,
  defaultTitle,
  defaultSummary,
  defaultBody,
  defaultCategory,
  imageUrl,
  publicId,
}: PostFormProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <div className="input-div">
        <label htmlFor="title">Title</label>
        <Input name="title" id="title" defaultValue={defaultTitle} />
      </div>
      <div className="input-div">
        <label htmlFor="summary">Summary</label>
        <Textarea
          name="summary"
          className="whitespace-pre-wrap"
          id="summary"
          defaultValue={defaultSummary}
        />
      </div>
      <div className="input-div">
        <label htmlFor="body">Body</label>
        <Textarea
          className="whitespace-pre-wrap"
          name="body"
          id="body"
          defaultValue={defaultBody}
        />
      </div>
      <div className="input-div">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          defaultValue={defaultCategory}
          className="py-2 px-4 border rounded-md"
        >
          <option value="">Select a category</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-div">
        <label htmlFor="image">Image</label>
        <Upload publicId={publicId as string} imageUrl={imageUrl as string} />
      </div>

      <Button disabled={pending} type="submit">
        {pending ? <Loader className="animate-spin" /> : "Save"}
      </Button>
    </>
  );
}
