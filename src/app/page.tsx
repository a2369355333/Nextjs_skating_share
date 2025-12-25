import Layout from "@/component/layout";
import Content from "@/modules/home/content";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-rose-400 animate-spin" />
        </div>
      }>
        <Content />
      </Suspense>
    </Layout>
  );
}
