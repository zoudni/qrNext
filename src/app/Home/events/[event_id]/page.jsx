import QrInfo from "../../../components/QrInfoTable"
import GenerateForm from "../../../components/forms/GenerateForm"
export default async function EventPage({params}) {
  
  let { event_id } = await params; 

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-center items-center md:justify-around space-y-4 md:space-y-0">
        <div>
          <GenerateForm/>
          
        </div>
        <QrInfo event_id={event_id}/>
      </div>
    </div>
  );
}
