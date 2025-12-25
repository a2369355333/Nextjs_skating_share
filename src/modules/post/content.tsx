"use client";

import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Post from "@/component/post";
import useQueryPost from "@/hooks/use-query-post";

const Content = () => {
  const router = useRouter();
  const { data } = useQueryPost();

  return (
    <div className="w-full">
      <Button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-4 py-2 mt-10 mb-15 rounded-2xl shadow-md cursor-pointer
            bg-rose-200/70 border border-rose-300/60 text-rose-800 hover:bg-rose-200"
      >
        <ArrowLeft size={18} />
        Back
      </Button>
      <Post post={data} />
    </div>
  );
};

export default Content;
