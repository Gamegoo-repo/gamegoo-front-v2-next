type ProfileNameAndTagProps = {
  gameName: string;
  tag: string;
};

export function ProfileNameAndTag({ gameName, tag }: ProfileNameAndTagProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-3xl">{gameName}</span>
      <span className="text-xl">#{tag}</span>
    </div>
  );
}
