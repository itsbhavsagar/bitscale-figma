import { ArrowUp } from "lucide-react";

export function GridsTableHeader() {
  return (
    <thead className="grids-table-header">
      <tr>
        <th className="w-[63%] text-left">
          <span className="table-header-cell inline-flex items-center gap-1">
            Name
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
          </span>
        </th>
        <th className="w-[13%] text-left">
          <span className="table-header-cell">Edited by</span>
        </th>
        <th className="w-[10%] text-left">
          <span className="table-header-cell">Last edited</span>
        </th>
        <th className="w-[6%] text-left">
          <span className="table-header-cell">Actions</span>
        </th>
      </tr>
    </thead>
  );
}
