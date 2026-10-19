import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import {
  labels,
  priorities,
  priorityColumnLabel,
  statusColumnLabel,
  statuses,
  taskColumnLabel,
  titleColumnLabel,
  type Task,
} from '../data';
import type { TasksTableFeatures } from './features';
import SelectCell from './SelectCell.vue';
import TaskIdCell from './TaskIdCell.vue';
import TaskPriorityCell from './TaskPriorityCell.vue';
import TasksColumnHeader from './TasksColumnHeader.vue';
import TaskStatusCell from './TaskStatusCell.vue';
import TasksRowActions from './TasksRowActions.vue';
import TaskTitleCell from './TaskTitleCell.vue';

export const columns: ColumnDef<TasksTableFeatures, Task>[] = [
  {
    id: 'select',
    header: ({ table }) => h(SelectCell, {
      'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'ariaLabel': 'Select all',
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
    }),
    cell: ({ row }) => h(SelectCell, {
      'modelValue': row.getIsSelected(),
      'ariaLabel': 'Select row',
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => h(TasksColumnHeader, { column, title: taskColumnLabel }),
    cell: ({ row }) => h(TaskIdCell, { value: row.original.id }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => h(TasksColumnHeader, { column, title: titleColumnLabel }),
    cell: ({ row }) => {
      const label = labels.find(item => item.value === row.original.label);

      return h(TaskTitleCell, {
        label: label?.label,
        title: row.original.title,
      });
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(TasksColumnHeader, { column, title: statusColumnLabel }),
    cell: ({ row }) => {
      const status = statuses.find(item => item.value === row.getValue('status'));

      if (!status) {
        return null;
      }

      return h(TaskStatusCell, { icon: status.icon, label: status.label });
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => h(TasksColumnHeader, { column, title: priorityColumnLabel }),
    cell: ({ row }) => {
      const priority = priorities.find(item => item.value === row.getValue('priority'));

      if (!priority) {
        return null;
      }

      return h(TaskPriorityCell, { icon: priority.icon, label: priority.label });
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'actions',
    cell: ({ row }) => h(TasksRowActions, { row }),
  },
];
