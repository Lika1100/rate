import { useDispatch } from 'react-redux';
import { uploadEvents } from "../../redux/events";

export function EventsUploader() {
  const dispatch = useDispatch();

  function handleChange(e) {
    dispatch(uploadEvents(e.target.files[0]));
  }

  function handleClick() {
    fetch("/Дети.ics")
      .then(resp => resp.blob())
      .then(blob => dispatch(uploadEvents(blob)));
  }

  return (
    <div>
      <label>
        <input type="file" onChange={handleChange} />
      </label>
      <button onClick={handleClick}>demo data</button>
    </div>
  )
}
