import { NextRequest } from "next/server";
import { error } from "./apiResponse";
import { BUSINESS_STATUS_CODE } from "@/config/constants";

export function withApiHandler(
  handler: (req: NextRequest) => Promise<Response>,
  businessStatus = BUSINESS_STATUS_CODE.ERROR
) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (e: any) {
      console.error("API Error:", e);
      return Response.json(
        error(e.message || "Internal Server Error", businessStatus),
        { status: 500 }
      );
    }
  };
}
