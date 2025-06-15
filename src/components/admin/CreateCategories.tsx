"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import { addCategory } from "@/actions/admin.actions";

export default function CreateCategories() {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-center mt-12 font-bold text-lg">Create Category</h1>
        <form className="flex flex-col gap-4 w-[350px]" action={addCategory}>
          <span className="">Category Name</span>
          <Input type="text" name="catName" id="catName" />
          <Button disabled={pending} type="submit">
            {pending ? <Loader /> : "Create Category"}
          </Button>
        </form>
      </div>
    </div>
  );
}
