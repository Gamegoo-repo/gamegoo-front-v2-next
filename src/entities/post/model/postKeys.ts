export const postKeys = {
  all: ["post"],
  list: (page: number) => [...postKeys.all, "list", { page }]
};
