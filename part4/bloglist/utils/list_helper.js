const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
  const maxLikes = blogs.find(
    (blog) =>
      blog.likes ===
      Math.max.apply(
        Math,
        blogs.map((blog) => blog.likes)
      )
  );
  if (maxLikes) {
    delete maxLikes._id;
    delete maxLikes.url;
    delete maxLikes.__v;
    return maxLikes;
  } else {
    return null;
  }
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  return {
    author: _.maxBy(blogs, "author").author,
    blogs: _.max(_.values(_.countBy(blogs, "author")))
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const grouped = _.groupBy(blogs, "author");
  const likes = _.map(_.valuesIn(grouped), (x) => _.sumBy(x, "likes"));
  const most = _.maxBy(_.zipWith(_.keys(grouped), likes), (x) => x[1]);
  return { author: most[0], likes: most[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
