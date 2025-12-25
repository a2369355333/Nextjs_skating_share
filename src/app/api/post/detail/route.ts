import { withApiHandler } from "@/utils/withApiHandler";
import { success } from "@/utils/apiResponse";
import { NextRequest } from "next/server";
import { DB_NAME, COLLECTION_NAME } from "@/config/constants";
import clientPromise from "@/lib/mongodb";

export const GET = withApiHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json("ID is required", { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  const post = await collection.findOne({ id });

  if(post && post.image && post.image.buffer) {
    post.image = {
      ...post.image,
      buffer: post.image.buffer.buffer.toString('base64'),
    }
  }

  return Response.json(success(post), { status: 200 });
});
