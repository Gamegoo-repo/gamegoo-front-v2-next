export const createdAtFormat = (createdAt: string) => {
  const d = new Date(createdAt);
  return (
    [
      String(d.getFullYear()).slice(2),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0")
    ].join(".") +
    ` ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
  );
};
