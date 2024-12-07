import EventForm from '../../components/forms/EventForm.jsx';
import EventTable from '../../components/EventTable.jsx';

export default function Events() {
 
  return (
    <div className='flex flex-col md:flex-row justify-around'>
        <EventForm/>
        <EventTable/>
    </div>
  );
}
