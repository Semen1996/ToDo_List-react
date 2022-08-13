import { useParams, Redirect } from 'react-router-dom';
import { useState } from 'react';

function DescriptionTask({arrTasks, editDesc}) {

  let { number } = useParams();
  number = Number(number);

  let task = arrTasks[number];

  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState('waiting');

  function handleEdit() {
    setEdit(true);
  }

  // Изменение статуса задачи
  function changeStatus(e) {
    setStatus(e.target.value);
  }

  function handleSaveEdit(e) {
    e.preventDefault();

    const title = e.target[0].value;
    const text = e.target[1].value;
    
    editDesc(number, title, text, status);
    setEdit(false);
  }

  if(edit) {
    return(
      <form className="todo-edit__form" onSubmit={handleSaveEdit}>
        <input className="todo-edit__title" type="text" defaultValue={task.title} required />
        <textarea className="todo-edit__text" placeholder="Описание дела" defaultValue={task.text}></textarea>
        <button className="todo-edit__submit" type="submit">Сохранить</button>
        <select className="todo-edit__status-btn" onChange={changeStatus}>
			    <option value="waiting">Ожидает</option>
			    <option value="progress">В процессе</option>
			    <option value="done">Выполнено</option>
		    </select>
      </form>
    )}

  if(task === undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="todo-edit__form">
      <h2 className="todo-edit__title">{task.title}</h2>
      <p className="todo-edit__text">{task.text}</p>
      <button className="todo-edit__submit" type="button" onClick={handleEdit}>Редактировать</button>
    </div>
  )
}

export default DescriptionTask;