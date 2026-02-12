import { PostContainer } from "@/widgets/board";

export default async function page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;

  return <PostContainer boardId={boardId} />;
}
