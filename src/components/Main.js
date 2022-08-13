import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Task from './Task';
import DescriptionTask from './DescriptionTask';

function Main() {

  // Устанавливаем стейт-переменные
  const [arrTasks, setArrTasks] = useState([]);
  const [task, setTask] = useState('');
  const [searchIsWork, setSearchIsWork] = useState(false);
  const [arrFound, setArrFound] = useState([]);

  // Загружаем данные, которые хранились в локальном хранилище
  useEffect( () => {
    const initTasks = JSON.parse(localStorage.getItem('arrTasks'));

    if (initTasks !== null) {
      setArrTasks(initTasks);
      setArrFound(initTasks);
    }
  },[]);

  // Функция добавления задачи в список дел
  function handleAddItem(e) {
    e.preventDefault();

    arrTasks.unshift({
      title: task,
      text: '',
      status: 'waiting'
    });
    setArrTasks([...arrTasks]);

    localStorage.setItem('arrTasks', JSON.stringify(arrTasks));

    setTask('');
  }

  // Функция сохранения названия задачи при вводе
  function handleChange(e) {
    setTask(e.target.value);
  }

  // Функция удаления задачи из списка
  function onItemDelete(item,index) {
    const itemsNotDelete = arrTasks.filter((val,i) => i !== index);
    setArrTasks(itemsNotDelete);

    localStorage.setItem('arrTasks', JSON.stringify(itemsNotDelete));

    if (setSearchIsWork) {
      const foundsNotDelete = arrFound.filter((val,i) => val !== item);
      setArrFound(foundsNotDelete);
    }
  };

  // Функция изменения задачи, описания и статуса в поле редактирования справа
  function editDesc(number, title, text, status) {
    
    const updateTasksDesc = arrTasks.map((task,index) =>   {
        if(index === number) {
          return {...task, title: title, text: text, status: status}
        } 
         return {...task};
    });              
    setArrTasks(updateTasksDesc);

    localStorage.setItem('arrTasks', JSON.stringify(updateTasksDesc));
  }

  // Функция поиска нужной задачи 
  function handleSearch(e) {

    if (e.target.value !== ''){
      setSearchIsWork(true);
      const foundItems = arrTasks.filter((val,i) => val.title.startsWith(e.target.value));
      setArrFound(foundItems);
    } else{
      setSearchIsWork(false);
    }
  }

  return(
    <main className="content">
      <section className="todo-list">
        <form className="todo-list__add-form" onSubmit={handleAddItem}>
          <input className="todo-list__input" type="text" placeholder="Добавить дело" onChange={handleChange} value={task} minLength="2" required />
          <button className="todo-list__add-button" type="submit">+</button>
        </form>
        <ul className="todo-list__checklist">
          { searchIsWork ? (arrFound.map((item) => {

            const index = arrTasks.indexOf(item);
            return(
            <Task key={index} item={item} index={index} onItemDelete={onItemDelete} />
            )
          })) : 
            (arrTasks.map((item, index) => (
              <Task key={index} item={item} index={index} onItemDelete={onItemDelete} />
            )))
        }
        </ul>
        <input className="todo-list__searcher" type="text" placeholder="Что ищем?" onChange={handleSearch}  />
        <div className="todo-list__separator"></div>
      </section>
      <section className="todo-edit">
          <Switch>
            <Route path={`/:number`}>
              <DescriptionTask arrTasks={arrTasks} editDesc={editDesc}  />
            </Route>
          </Switch>
      </section>
    </main>
  );
}

export default Main;