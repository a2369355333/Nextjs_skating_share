import { COLLECTION_NAME, DB_NAME } from "@/config/constants";
import clientPromise from "@/lib/mongodb";
import { success, error } from "@/utils/apiResponse";
import { BUSINESS_STATUS_CODE } from "@/config/constants";
import { withApiHandler } from "@/utils/withApiHandler";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Binary } from "mongodb";

export const POST = withApiHandler(async (req: NextRequest) => {
  const formData = await req.formData();
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const imageFile = formData.get('image') as File | null;
  const width = parseInt(formData.get('width') as string);
  const height = parseInt(formData.get('height') as string);
  let imageData = null;

  if (!title || !content) {
    return Response.json(
      error("Title and content are required", BUSINESS_STATUS_CODE.WARNING),
      { status: 400 }
    );
  }

  if(imageFile) {
    try{
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      imageData = {
        buffer: new Binary(buffer),
        mimeType: imageFile.type,
        width: width,
        height: height  
      };
    } catch(e) {
       return Response.json(
        error("Failed to process image", BUSINESS_STATUS_CODE.WARNING),
        { status: 400 }
      );
    }

  }

  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);
  const res = await collection.insertOne({
    title,
    content,
    image: imageData,
    createdAt: new Date().getTime(),
    id: uuidv4(),
  });

  return Response.json(success(res.insertedId), { status: 200 });
});
