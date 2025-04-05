'use client';
import * as React from 'react';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

// Define the columns
export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 pb-2 text-left text-lg font-bold text-[#1b1b1b] hover:bg-white"
      >
        Activity
        <ArrowUpDown className="ml-3 h-4 w-4 text-[#696969]" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'requirements',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 pb-2 text-left text-lg font-bold text-[#1b1b1b] hover:bg-white"
      >
        Assign To
      </Button>
    ),
    cell: ({ row }) => {
      const requirements = row.getValue('requirements'); // Get the 'requirements' object
      return <div className="capitalize">{requirements || 'N/A'}</div>; // Render 'name' or fallback to 'N/A'
    },
  },

  {
    accessorKey: 'description',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0 pb-2 text-left text-lg font-bold text-[#1b1b1b] hover:bg-white"
      >
        Description
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 pb-2 text-lg font-bold text-[#1b1b1b] hover:bg-white"
      >
        Added On
        <ArrowUpDown className="ml-3 h-4 w-4 text-[#696969]" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="h-8 pt-3 ml-6 text-left">{row.getValue('date')}</div>
    ),
    // Sorting function for dates in dd/mm format
    sortingFn: (rowA, rowB, columnId) => {
      const [dayA, monthA] = rowA.getValue(columnId).split('/').map(Number);
      const [dayB, monthB] = rowB.getValue(columnId).split('/').map(Number);
      const dateA = new Date(2024, monthA - 1, dayA);
      const dateB = new Date(2024, monthB - 1, dayB);
      return dateA.getTime() - dateB.getTime();
    },
  },
];

// DataTable component
export function AnouncementTable({
  announcement,
  setAnnouncementRefresh,
  setPageIndex,
  pageIndex,
  overAllCount,
  totalDatafetched,
  setFilterStatus,
  filterStatus,
  setSearchParam,
  searchParam,
  serachField,
  setSearchField,
}) {
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});


  useEffect(() => {
    setColumnVisibility({
      select: true, // Default visibility for columns
      title: true,
      requirements: true,
      description: true,
      date: true,
    });
  }, [filterStatus]);
  useEffect(() => {
    
    const indexArray = Object.keys(rowSelection);

    if (indexArray.length > 0) {
      indexArray.map(index => {
        // setToDeleteAnnouncements(prev => prev.concat(announcement[index].id));
      });
    }
  }, [rowSelection]);

 

  const table = useReactTable({
    data: announcement,
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
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="m-0  h-full w-full rounded-md border border-[#e5e5e5] p-2">
      <div className="flex flex-col justify-start py-4">
        <div className="mb-2 mr-[6%] flex w-fit flex-row text-2xl font-semibold">

          <Select
            defaultValue="0"
            onValueChange={value => {
              setFilterStatus(value);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Assign by you</SelectItem>

                <SelectItem value="0">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-center justify-between w-full mt-2 sm:flex-row sm:justify-start">
          <div className="flex flex-row">
            <div>
              <Select
                defaultValue="title"
                onValueChange={value => {
                  setSearchField(value);
                }}
              >
                <SelectTrigger className="mt-[6px] h-[30px] w-[200px] px-3 font-bold sm:h-[38px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="title">title</SelectItem>
                    <SelectItem value="description">description</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder={`filter activites on the basis of ${serachField} ...`}
              type="text"
              value={searchParam}
              onChange={event => setSearchParam(event.target.value.toString())}
              className="ml-4 mt-1 h-[40px] w-[300px] cursor-pointer sm:h-[42px]"
            />
          </div>
          <div className="mt-[10px] w-full sm:mt-0 sm:flex sm:flex-row sm:justify-end">
            {/* trash button  */}
            
            {/* Addmore  */}
           
          </div>
        </div>
      </div>
      {/* Scrollable Table Container */}
      <div className="custom-scrollbar h-[450px] overflow-y-scroll rounded-lg border">
        <Table className="rounded-xl">
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
                        cell.column.id === 'addedOn' ? 'text-right' : ''
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
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          No of rows
          <span className="ml-2 mr-4">{totalDatafetched}</span>
          <span className="ml-6">
            Current Page - <span>{pageIndex + 1}</span>
          </span>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(prevPage => prevPage - 1)}
            disabled={pageIndex == 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={Math.ceil(overAllCount / 8) == pageIndex + 1}
            onClick={() => setPageIndex(prevIndex => prevIndex + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
