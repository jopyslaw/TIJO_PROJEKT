const config = {
  port: process.env.PORT || 3000,
  databaseUrl:
    process.env.MONGODB_URI ||
    "mongodb+srv://jopyslaw:o1pb0LXbYVj5Nb9O@cluster0.rs5kkhd.mongodb.net/?retryWrites=true&w=majority",
  JwtSecret: process.env.JWT_SECRET || "Secret",
};

export default config;
