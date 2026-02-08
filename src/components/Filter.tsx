import React from 'react';
import classNames from 'classnames';

export enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface Props {
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
}

export const Filter: React.FC<Props> = ({ filterStatus, onFilterChange }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filterStatus === FilterStatus.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => onFilterChange(FilterStatus.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterStatus === FilterStatus.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => onFilterChange(FilterStatus.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterStatus === FilterStatus.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => onFilterChange(FilterStatus.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
