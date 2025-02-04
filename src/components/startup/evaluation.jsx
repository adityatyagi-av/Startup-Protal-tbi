'use client';
import * as React from 'react';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Trash2, Pencil } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const data = [
  {
    id: 'a1b2c3d4',
    evaluatorName: 'John Doe',
    evaluationDate: '01/01',
    status: 'Initial funding for Tech Innovators Inc.',
    action: 'View',
  },
  {
    id: 'b2c3d4e5',
    evaluatorName: 'Jane Smith',
    evaluationDate: '15/02',
    status: 'Seed investment for Green Energy Solutions',
    action: 'View',
  },
  {
    id: 'c3d4e5f6',
    evaluatorName: 'Emily Johnson',
    evaluationDate: '22/03',
    status: 'Grant received for HealthTech Labs',
    action: 'View',
  },
  {
    id: 'd4e5f6g7',
    evaluatorName: 'Michael Brown',
    evaluationDate: '10/04',
    status: 'Series A funding for FinTech Innovations',
    action: 'View',
  },
  {
    id: 'e5f6g7h8',
    evaluatorName: 'Sarah White',
    evaluationDate: '18/05',
    status: 'Investment in AI for Agriculture',
    action: 'View',
  },
  {
    id: 'f6g7h8i9',
    evaluatorName: 'David Green',
    evaluationDate: '03/06',
    status: 'Technology grant for EdTech Solutions',
    action: 'View',
  },
  {
    id: 'g7h8i9j0',
    evaluatorName: 'Sophia Clark',
    evaluationDate: '20/07',
    status: 'Accelerator program acceptance for BioTech Ventures',
    action: 'View',
  },
  {
    id: 'h8i9j0k1',
    evaluatorName: 'Chris Lewis',
    evaluationDate: '12/08',
    status: 'Investment in renewable energy startup',
    action: 'View',
  },
  {
    id: 'i9j0k1l2',
    evaluatorName: 'Olivia Martinez',
    evaluationDate: '25/09',
    status: 'Funding for new software platform development',
    action: 'View',
  },
  {
    id: 'j0k1l2m3',
    evaluatorName: 'Liam Davis',
    evaluationDate: '30/10',
    status: 'Funding for biotech research project',
    action: 'View',
  },
  {
    id: 'k1l2m3n4',
    evaluatorName: 'Isabella Wilson',
    evaluationDate: '05/11',
    status: 'Grant for startup ecosystem development',
    action: 'View',
  },
  {
    id: 'l2m3n4o5',
    evaluatorName: 'James Taylor',
    evaluationDate: '17/12',
    status: 'Series B funding for Tech Solutions',
    action: 'View',
  },
  {
    id: 'm3n4o5p6',
    evaluatorName: 'Ava Anderson',
    evaluationDate: '22/01',
    status: 'Funding for AI research and development',
    action: 'View',
  },
  {
    id: 'n4o5p6q7',
    evaluatorName: 'Mia Thomas',
    evaluationDate: '15/02',
    status: 'Investment in next-gen robotics startup',
    action: 'View',
  },
];

const handleEdit = id => {};

const handleDelete = id => {};

// Define the columns
export const columns = [
  {
    accessorKey: 'evaluatorName',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 pb-2 text-left text-lg font-bold text-[#1b1b1b] hover:bg-white"
      >
        Evaluator Name
        <ArrowUpDown className="ml-3 h-4 w-4 text-[#696969]" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('evaluatorName')}</div>
    ),
  },

  {
    accessorKey: 'evaluationDate',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 pb-2 text-left text-lg font-bold text-[#1b1b1b] hover:bg-white"
      >
        Evaluation Date
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('evaluationDate')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 pb-2 text-left text-lg font-bold text-[#1b1b1b] hover:bg-white"
      >
        Status
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('status')}</div>,
  },

  {
    accessorKey: 'action',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 pb-2 text-lg font-bold text-[#1b1b1b] hover:bg-white"
      >
        Action
      </Button>
    ),
    cell: ({ row }) => (
      <div className="ml-6 flex h-8 gap-2 text-left">
        <button>
          <span className="rounded-lg bg-blue-800 p-2 text-white hover:text-white">
            View
          </span>
        </button>
        <button onClick={() => handleEdit(row.original.id)}>
          <Pencil className="h-4 w-4 text-blue-500 hover:text-blue-700" />
        </button>
        <button onClick={() => handleDelete(row.original.id)}>
          <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
        </button>
      </div>
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const [dayA, monthA] = rowA.getValue(columnId).split('/').map(Number);
      const [dayB, monthB] = rowB.getValue(columnId).split('/').map(Number);
      const dateA = new Date(2024, monthA - 1, dayA);
      const dateB = new Date(2024, monthB - 1, dayB);
      return dateA.getTime() - dateB.getTime();
    },
  },
];

export default function evaluation() {
  const [selectButton, setSelectButton] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Function to handle button clicks
  const handleButtonClick = buttonId => {
    setSelectButton(buttonId);
  };

  return (
    <>
      <div className="my-auto">
        <div className="custom-scrollbar mx-auto mt-6 h-[300px] w-[830px] overflow-y-scroll rounded-lg border max-sm:w-[250px] sm:max-md:w-[400px] md:max-xl:w-[500px]">
          <Table className="rounded-xl max-xl:w-[100px]">
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className={
                          cell.column.id === 'action' ? 'text-right' : ''
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
