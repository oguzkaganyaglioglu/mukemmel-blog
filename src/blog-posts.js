export const getPosts = () => {
  return [
    {
      title: "ToDo",
      slug: "diary",
      details: require("./posts/update-diary.md").default,
      date: "10 Aralık 2019"
    }
  ];
};
