import { BoardTable, Pagination } from "@/features/board";

export function Board() {
  return (
    <div className="flex flex-col items-center gap-[64px]">
      <BoardTable />
      <Pagination />
    </div>
  );
}
