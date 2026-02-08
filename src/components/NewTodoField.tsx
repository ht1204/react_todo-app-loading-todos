import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onCreate: (title: string) => Promise<void>;
  disabled?: boolean;
}

export const NewTodoField: React.FC<Props> = ({ onCreate, disabled }) => {
  const [title, setTitle] = useState('');
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Focus after pending state changes
  useEffect(() => {
    if (!isPending && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPending]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    // Prevent empty submissions
    if (!trimmedTitle) {
      return;
    }

    setIsPending(true);

    try {
      await onCreate(trimmedTitle);
      // Clear input on success
      setTitle('');
    } catch {
      // Preserve text and focus on error (focus happens in useEffect)
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={isPending || disabled}
      />
    </form>
  );
};
