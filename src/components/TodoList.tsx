import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  pendingIds?: number[];
}

export const TodoList: React.FC<Props> = ({ todos, pendingIds = [] }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isPending={pendingIds.includes(todo.id)}
        />
      ))}
    </section>
  );
};
