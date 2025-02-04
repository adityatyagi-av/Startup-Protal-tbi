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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect } from 'react';

// Sample data


export const columns = [
  {
    accessorKey: 'fileName',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 pb-2 text-left text-lg font-semibold text-gray-800 hover:bg-gray-100 transition-colors duration-200"
      >
        File Name
        <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-gray-600">{row.getValue('fileName') || "filename"}</div>
    ),
  },

  {
    accessorKey: 'fileLink',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 pb-2 text-left text-lg font-semibold text-gray-800 hover:bg-gray-100 transition-colors duration-200"
      >
        Upload Date
      </Button>
    ),
    cell: ({ row }) => (
      <a
        href={row.getValue('fileLink') || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        View File
      </a>
    ),
  },

  {
    accessorKey: 'overView',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 pb-2 text-left text-lg font-semibold text-gray-800 hover:bg-gray-100 transition-colors duration-200"
      >
        Uploaded By
      </Button>
    ),
    cell: ({ row }) => <div className="text-gray-600">{row.getValue('overView') || "Normal"}</div>,
  },

  {
    accessorKey: 'action',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 pb-2 text-lg font-semibold text-gray-800 hover:bg-gray-100 transition-colors duration-200"
      >
        Action
      </Button>
    ),
    cell: ({ row }) => (
      <div className="ml-6 flex h-8 gap-2 text-left">
        <button onClick={() => handleEdit(row.original.id)}>
          <Pencil className="h-4 w-4 text-blue-500 hover:text-blue-700 transition-colors" />
        </button>
        <button onClick={() => handleDelete(row.original.id)}>
          <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700 transition-colors" />
        </button>
      </div>
    ),
    // Sorting function for dates in dd/mm format (remains unchanged)
    sortingFn: (rowA, rowB, columnId) => {
      const [dayA, monthA] = rowA.getValue(columnId).split('/').map(Number);
      const [dayB, monthB] = rowB.getValue(columnId).split('/').map(Number);
      const dateA = new Date(2024, monthA - 1, dayA);
      const dateB = new Date(2024, monthB - 1, dayB);
      return dateA.getTime() - dateB.getTime();
    },
  },
];

export default function filetable({ files }) {
  useEffect(() => {
    console.log("files", files)
  }, [files])
  const [opendelete, setopendelete] = useState(false);
  const [selectButton, setSelectButton] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: files || [],
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

  return (
    <div className="my-auto">
      <div className="custom-scrollbar mx-auto mt-6  h-full w-[830px] overflow-y-scroll rounded-lg border max-sm:w-[250px] sm:max-md:w-[400px] md:max-xl:w-[500px]">
        <Table className="max-xl:w-[100px]">
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
  );
}
