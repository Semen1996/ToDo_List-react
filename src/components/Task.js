import { NavLink } from 'react-router-dom';

function Task({item, index, onItemDelete}) {

  function handleDeleteItem(){
    onItemDelete(item, index);
  }

  return(
    <li>
      <NavLink to={`/${index}`} className={`todo-list__item todo-list__item_status_${item.status}`} activeClassName="todo-list__item_active">
        <p className="todo-list__item-link">{item.title}</p>
        <button className="todo-list__delete-button" type="button" onClick={handleDeleteItem}></button>
      </NavLink>
    </li>
  )
}

export default Task;