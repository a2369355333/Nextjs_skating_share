"use client";

import Post from "@/component/post";
import useQueryPostList from "@/hooks/use-query-post-list";
import Link from "next/link";
import Pagination from "./pagination";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PostList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useQueryPostList();
  const { posts = [], totalPages, total } = data || {};

  // Ensure URL has page and limit parameters on initial load
  useEffect(() => {
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    
    if (!page || !limit) {
      router.replace("/?page=1&limit=5", { scroll: false });
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col gap-2">
      <Pagination totalPages={totalPages} total={total} />
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-12 h-12 text-rose-400 animate-spin" />
          <p className="text-rose-600 text-sm font-medium">Loading posts...</p>
        </div>
      )}
      
      {error && (
        <div className="flex items-center justify-center py-10">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl px-6 py-4 text-red-600">
            Error: {error.message}
          </div>
        </div>
      )}
      
      {!isLoading && !error && data && posts.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-rose-400 text-lg font-medium">No posts yet</p>
            <p className="text-rose-400 text-sm mt-2">Be the first to share your story!</p>
          </div>
        </div>
      )}
      
      {!isLoading && posts.length > 0 &&
        posts.map((post: Post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <Post post={post} />
          </Link>
        ))}
    </div>
  );
};

export default PostList;