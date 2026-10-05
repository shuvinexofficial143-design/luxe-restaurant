"use client";

import type { ReactNode } from "react";

export type AdminColumn<T> = {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
};

export default function AdminTable<T extends { id?: string }>({
  rows,
  columns,
  emptyText,
}: {
  rows: T[];
  columns: AdminColumn<T>[];
  emptyText: string;
}) {
  if (!rows.length) {
    return (
      <div className="rounded-[26px] border border-dashed border-[#4a3025]/15 bg-[#fffaf4] p-10 text-center">
        <p className="lx-serif text-3xl">{emptyText}</p>
        <p className="mt-2 text-xs text-[#75645d]">
          New records will appear here as restaurant activity is created.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#4a3025]/10 bg-[#fffaf4]">
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse text-left">
          <thead className="bg-[#201713] text-white">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-4 text-[10px] font-medium uppercase tracking-[.12em] text-white/55"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4a3025]/8">
            {rows.map((row, rowIndex) => (
              <tr key={row.id || `row-${rowIndex}`} className="align-top">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-4 text-sm">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
