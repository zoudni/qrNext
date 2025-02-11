import EventForm from '../../components/forms/EventForm.jsx';
import EventTable from '../../components/EventTable.jsx';

export default function Events() {
 
  return (
    <div className='flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-10 md:space-y-0 justify-around'>
        <EventForm/>
        <EventTable/>
    </div>
  );
}
