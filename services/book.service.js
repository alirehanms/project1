import { Book as BookModel } from "../models/index.js";
const Bookservice = {
  create: async (body) => {
    return BookModel.create(body);
  },

  get: async (query) => {
    const pipeline = [
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },

      
    ];
const limit = parseInt(query.limit) || 10;
const skip = parseInt(query.skip) || 0;

if (skip > 0) {
  pipeline.push({ $skip: skip });
}

if (limit > 0) {
  pipeline.push({ $limit: limit });
}
    
      
    if (query.grpBy) {
      pipeline.push({
        $group: {
          _id: `$${query.grpBy}`,
          total: { $sum: "$price" },
          average: { $avg: "$price" },
        },
      });
    }
    if (query.sort) {
      let sortPrice = "price";

      let sorting = 1;
      if (query.sort === "price") {
        sortPrice = "price";
        sorting = 1;
      } else if (query.sort === "-price") {
        sortPrice = "price";
        sorting = -1;
      } else if (query.sort === "stock") {
        sortPrice = "stock";
        sorting = 1;
      } else if (query.sort === "-stock") {
        sortPrice = "stock";
        sorting = -1;
      }
      pipeline.push({
        $sort: {
          [sortPrice]: sorting,
        },
      });
    }
    if (query.title) {
      pipeline.push({
        $match: {
          title: { $regex: query.title },
        },
      });
    }
    if (query.price) {
      if (typeof query.price === "object") {
        const priceFilters = [];
        if (query.price.gt) {
          priceFilters.push({
            price: { $gt: parseFloat(query.price.gt) },
          });
        }
        if (query.price.lt) {
          priceFilters.push({
            price: { $lt: parseFloat(query.price.lt) },
          });
        }
        if (priceFilters.length > 0) {
          pipeline.push({
            $match: {
              $or: priceFilters,
            },
          });
        }
      } else {
        pipeline.push({
          $match: {
            price: parseFloat(query.price),
          },
        });
      }
    }
     return await BookModel.aggregate(pipeline);
   
  },

  /*get: async ( pipeline) => {
    return BookModel.aggregate(pipeline);
  },*/
  updateBook: async (bookid, body) => {
    return BookModel.findByIdAndUpdate(bookid, body, {
      new: true,
    });
  },

  delete: async (id) => {
    return BookModel.findByIdAndDelete(id);
  },

  //authorsBook: async () => {
  //return BookModel.aggregate()
  //},
};
export { Bookservice };
