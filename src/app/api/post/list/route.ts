import { COLLECTION_NAME, DB_NAME } from "@/config/constants";
import clientPromise from "@/lib/mongodb";
import { success } from "@/utils/apiResponse";
import { withApiHandler } from "@/utils/withApiHandler";
import { NextRequest } from "next/server";

export const GET = withApiHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  const total = await collection.countDocuments();
  const totalPages = Math.ceil(total / limit);

  const posts = await collection
    .find({})
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .toArray();

  const postsWithImages = posts.map(post => {
    if(post.image && post.image.buffer) {
      return {
        ...post,
        image: {
          ...post.image,
          buffer: post.image.buffer.buffer.toString('base64'),
        }
      };
    }
    return {...post};
  })
    

  return Response.json(
    success({
      posts: postsWithImages,
      page,
      limit,
      total,
      totalPages,
    }),
    { status: 200 }
  );
});
