export function Comments({ comments }: { comments: string }) {
  return (
    <div className="regular-18 rounded-[10px] border-[1px] border-gray-400 px-[10px] py-[8px]">
      {comments}
    </div>
  );
}
