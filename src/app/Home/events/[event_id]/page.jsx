import QrInfo from "../../../components/QrInfoTable";
import GenerateForm from "../../../components/forms/GenerateForm";

export default async function EventPage({ params, searchParams }) {
  let { event_id } = await params;
  let page_num = await searchParams; 
  let page =  parseInt(page_num.page) || 1; // Get page from URL

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="w-full lg:w-1/2 max-w-xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Generate QR Codes</h2>
            <GenerateForm />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">QR Code Information</h2>
            <QrInfo event_id={event_id} page={page} />
          </div>
        </div>
      </div>
    </div>
  );
}
