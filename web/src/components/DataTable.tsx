"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  const { pageIndex, pageSize } = table.getState().pagination
  const totalRows = table.getFilteredRowModel().rows.length
  const fromRow = pageIndex * pageSize + 1
  const toRow = Math.min((pageIndex + 1) * pageSize, totalRows)

  return (
    <div className="space-y-3">
      {/* Table card */}
      <div className="rounded-2xl border border-zinc-200 overflow-hidden shadow-sm bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-zinc-200 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-500 hover:to-orange-400"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-white font-semibold text-xs uppercase tracking-wider py-3.5 first:pl-5 last:pr-5"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`border-b border-zinc-100 transition-colors duration-150 hover:bg-orange-50/60 ${
                    i % 2 === 1 ? "bg-zinc-50/50" : "bg-white"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-3.5 text-sm text-zinc-700 first:pl-5 last:pr-5"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-28 text-center text-zinc-400 text-sm"
                >
                  <span className="flex flex-col items-center gap-2 justify-center">
                    <span className="text-3xl">🍕</span>
                    Nenhum resultado encontrado.
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination bar */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-zinc-400 font-medium">
          {totalRows > 0
            ? `Exibindo ${fromRow}–${toRow} de ${totalRows} resultados`
            : "Sem resultados"}
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 p-0 rounded-lg border-zinc-200 text-zinc-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 disabled:opacity-40 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`h-8 min-w-[2rem] px-2 text-xs font-semibold rounded-lg transition-all duration-150 ${
                  pageIndex === i
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                    : "text-zinc-500 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 p-0 rounded-lg border-zinc-200 text-zinc-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 disabled:opacity-40 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
