export default async function page({ params }: { params: Promise<{ boardId: string }> }) {
  return (
    <div className="absolute top-0 left-0 flex h-dvh w-dvw items-center justify-center">
      <div className="flex h-1/2 w-1/2 items-center justify-center bg-violet-200 text-3xl">
        Modal
      </div>
    </div>
  );
}
