import { SiteContentForm } from "@/components/admin/SiteContentForm";
import { getSiteContent } from "@/lib/site-content";

export default async function AdminContentPage() {
  const siteContent = await getSiteContent();

  return (
    <div className="space-y-6">
      <div className="admin-card rounded-[2rem] p-6 sm:p-8">
        <p className="text-sm font-semibold text-pink-600">Site content</p>
        <h1 className="mt-1 text-3xl font-semibold text-black">
          Texts and model images
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600">
          Edit the public text blocks and replace the model images used across the
          homepage, about and contact sections.
        </p>
      </div>

      <SiteContentForm initialContent={siteContent} />
    </div>
  );
}
