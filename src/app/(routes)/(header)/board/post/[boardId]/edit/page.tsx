import { Post } from "@/widgets/board";

export default async function page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;

  return <Post boardId={boardId} />;
}
