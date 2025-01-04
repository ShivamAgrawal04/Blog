export const seoStats = async (req, res) => {
  try {
    // Mocking SEO statistics for the site
    const seoStats = {
      totalBlogs: 100,
      totalComments: 500,
      mostPopularTag: "Tech",
      mostCommentedBlog: "How to build a website",
      avgSeoScore: 85,
    };

    res.status(200).json(seoStats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
