import QrInfo from "../../../components/QrInfo"
import GenerateForm from "../../../components/forms/GenerateForm"
export default async function EventPage({params}) {
  
  let {event_id} = await params
  return (
    <div>
      <div className="">
        <GenerateForm/>
        <QrInfo event_id={event_id}/>
      </div>
    </div>
  );
}
