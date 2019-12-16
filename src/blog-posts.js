export const getPosts = () => {
  return [
    {
      title: "ToDo",
      slug: "diary",
      details: require("./posts/update-diary.md").default,
      date: "10 Aralık 2019"
    },
    {
      title: "2",
      slug: "diary",
      details: require("./posts/update-diary.md").default,
      date: "10 Aralık 2019"
    },
    {
      title: "3",
      slug: "diary",
      details: require("./posts/update-diary.md").default,
      date: "10 Aralık 2019"
    },
    {
      title: "4",
      slug: "diary",
      details: require("./posts/update-diary.md").default,
      date: "10 Aralık 2019"
    }
  ];
};
