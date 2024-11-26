
import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import clsxm from "@/utils/clsxm";

const PropertyTable = ({ deleteRow, updateRow, data = [] }) => {
  // Define table columns
  const columns = useMemo(
    () => [

      {
        accessorKey: "rowNum",
        header: "#",
      },
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
          <div>
            {row.original.image !== 'null' ? <img
              src={`https://ipfs.io/ipfs/${row.original.image}`}
              alt="Property"
              className="w-20 h-20 rounded-lg p-1"
            /> : <img
              src={`/assets/images/no.jpg`}
              alt="Property"
              className="w-20 h-20 rounded-lg p-1"
            />}
          </div>
        ),
      },
      { accessorKey: "heading", header: "Heading" },

      { accessorKey: "value", header: "Created At" },
      {
        accessorKey: "edit",
        header: "Edit",
      },
      {
        accessorKey: "delete",
        header: "Delete",
      },
    ],
    []
  );

  // Search filter state
  const [globalFilter, setGlobalFilter] = useState("");
  // Sorting state
  const [sorting, setSorting] = useState([]);
  // Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-black-600 p-4 rounded-lg shadow-lg">
      <div className=" min-w-[1200px]">

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 glass rounded"
        />

        {/* Table */}
        <table className="min-w-full bg-black-600 border mt-4 border-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}
                className="px-4 py-2 cursor-pointer border-b border-gray-300 text-left"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      cursor: header.column.getCanSort() ? "pointer" : "auto",
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                    {header.column.getIsSorted() === "asc"
                      ? "🔼"
                      : header.column.getIsSorted() === "desc"
                        ? "🔽"
                        : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border px-2 hover:bg-black-100">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    onClick={() => cell.column.id === 'delete' ? deleteRow(row.original.id) : updateRow(cell.column.id, row.original.id)}
                    className="border text-center"
                  >
                    {cell.column.id === "image" ? (
                      cell.column.columnDef.cell({ row: cell.row })
                    ) : cell.column.id === 'delete' || cell.column.id === 'edit' ? (
                      <p className="cursor-pointer">{cell.getValue()}</p>
                    ) : cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          className="flex gap-2 justify-end mt-4"
        >
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={clsxm("bg-yellow p-2 py-[11px] rounded-[10px] disabled:opacity-50", table.getCanNextPage() && 'bg-gray-dark')}
          >
            <img src="/assets/svg/arrow1.svg" alt="" className='rotate-90' />
          </button>
          {Array.from({ length: table.getPageCount() }).map((_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={clsxm("font-bold text-black-100",
                i === table.getState().pagination.pageIndex ? "bg-yellow " : "bg-white",

              )}
              style={{
                margin: "0 5px",
                padding: "5px 10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={clsxm("bg-yellow p-2 py-[11px] rounded-[10px] disabled:opacity-50", !table.getCanNextPage() && 'bg-gray-dark')}

          >
            <img src="/assets/svg/arrow1.svg" alt="" className='-rotate-90' />
          </button>
        </div>
      </div>
    </div>

  );
};

export default PropertyTable;
