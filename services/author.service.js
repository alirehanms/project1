import { Author } from "../models/index.js";
const Authorservice = {
  create: async (body) => {
    return Author.create(body);
  },

  get: async (query) => {
    const pipeline = [
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "author",
          as: "author",
        },
      },
    ];
    if (query.name) {
      pipeline.push({
        $match: {
          name: { $regex: query.name, $options: "i" },
        },
      });
    }

    return await Author.aggregate(pipeline);
  },

  updateAuthor: async (id, body) => {
    return Author.findByIdAndUpdate(id, body);
  },
  delete: async (id) => {
    return Author.findByIdAndDelete(id);
  },
};

export { Authorservice };
