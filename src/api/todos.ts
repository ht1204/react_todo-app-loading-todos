import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export let USER_ID = 0;

export const setUserId = (id: number) => {
  USER_ID = id;
};

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
