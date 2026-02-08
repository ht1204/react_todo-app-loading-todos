/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos, setUserId } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Filter, FilterStatus } from './components/Filter';
import { NewTodoField } from './components/NewTodoField';

// Read userId from localStorage and set it
const userJson = localStorage.getItem('user');

if (userJson) {
  try {
    const user = JSON.parse(userJson);

    if (user && user.id) {
      setUserId(user.id);
    }
  } catch (error) {
    // Invalid JSON, ignore
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  // pendingIds will be used in Part 2 for add/delete/update operations
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pendingIds, setPendingIds] = useState<number[]>([]);

  useEffect(() => {
    // Hide notification before making request
    setIsErrorVisible(false);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setIsErrorVisible(true);
      });
  }, []);

  useEffect(() => {
    if (isErrorVisible) {
      const timer = setTimeout(() => {
        setIsErrorVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isErrorVisible]);

  const handleCloseError = () => {
    setIsErrorVisible(false);
  };

  const handleCreateTodo = async (title: string) => {
    // Hide notification before request
    setIsErrorVisible(false);

    // This is a placeholder for Part 2 (Add and Delete)
    // For now, just show an error that this feature is not implemented
    setErrorMessage(`Cannot add "${title}" - feature not implemented yet`);
    setIsErrorVisible(true);
    throw new Error('Not implemented');
  };

  const filteredTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return todos.filter(todo => !todo.completed);
      case FilterStatus.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterStatus]);

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const hasCompletedTodos = useMemo(
    () => todos.some(todo => todo.completed),
    [todos],
  );

  const itemsLeftText = `${activeTodosCount} ${
    activeTodosCount === 1 ? 'item' : 'items'
  } left`;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: activeTodosCount === 0,
              })}
              data-cy="ToggleAllButton"
            />
          )}

          {/* Add a todo on form submit */}
          <NewTodoField onCreate={handleCreateTodo} />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList todos={filteredTodos} pendingIds={pendingIds} />

            {/* Hide the footer if there are no todos */}
            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {itemsLeftText}
              </span>

              {/* Active link should have the 'selected' class */}
              <Filter
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
              />

              {/* this button should be disabled if there are no completed todos */}
              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!hasCompletedTodos}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          {
            hidden: !isErrorVisible,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleCloseError}
        />
        {errorMessage}
      </div>
    </div>
  );
};
