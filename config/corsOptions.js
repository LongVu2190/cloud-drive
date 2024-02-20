const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  methods: 'GET,POST,PUT,PATCH,DELETE',
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsOptions;
