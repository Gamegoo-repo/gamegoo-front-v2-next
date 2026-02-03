import { BoardDetailModal } from "@/widgets/board";

const fetchBoardDetail = async (boardId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/posts/list/${boardId}`);

  if (!res.ok) throw new Error("상세 게시물이 존재하지 않습니다.");

  return await res.json();
};

// FIX: generateMetadata 사용
// export async function generateMetadata({ params }: { params: Promise<{ boardId: string }> }) {
//   const { boardId } = await params;
// }

export default async function page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;

  const { data } = await fetchBoardDetail(boardId);

  return (
    <BoardDetailModal
      boardId={boardId}
      boardData={data}
    />
  );
}
