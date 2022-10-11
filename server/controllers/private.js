var moment = require('moment');
const Product = require("../models/Product");
const User = require("../models/User");
const OrderedMenu = require("../models/OrderedMenu");


exports.getPrivateRoute = async (req, res, next) => {

  var productPerMonth = await Product.aggregate([
    { $match: { createdAt: { $gte: new Date("2022-01-01"), $lte: new Date() } } },
    {
       $group: {
          _id: { $dateTrunc: { date: "$createdAt", unit: "month" } },
          Count: { $count: {} }
       }
    },
    {
       $group: {
          _id: null,
          data: { $push: "$$ROOT" }
       }
    },
    {
       $set: {
          month: {
             $dateDiff: {
                startDate: new Date("2022-01-01"),
                endDate: new Date(),
                unit: "month"
             }
          }
       }
    },
    {
       $set: {
          data: {
             $map: {
                input: { $range: [0, { $add: ["$month", 1] }] },
                as: "m",
                in: {
                   $let: {
                      vars: {
                         month: {
                            $dateAdd: {
                               startDate: new Date("2022-01-01"),
                               unit: "month",
                               amount: "$$m"
                            }
                         }
                      },
                      in: {
                         _id: "$$month",
                         Count: { $filter: { input: "$data", cond: { $eq: ["$$this._id", "$$month"] } } }
                      }
                   }
                }
             }
          }
       }
    },
    {
       $set: {
          data: {
             $map: {
                input: "$data",
                in: { _id: "$$this._id", Count: { $ifNull: [{ $first: "$$this.Count.Count" }, 0] } }
             }
          }
       }
    },
    { $unwind: "$data" },
    { $replaceWith: "$data" },
    { $sort: { _id: 1 } }
  ]);
  productPerMonth.forEach(function (doc) { doc.lable = moment(doc._id).format('MMMM') })

  var userPerMonth = await User.aggregate([
  { $match: { createdAt: { $gte: new Date("2022-01-01"), $lte: new Date() } } },
  {
     $group: {
        _id: { $dateTrunc: { date: "$createdAt", unit: "month" } },
        Count: { $count: {} }
     }
  },
  {
     $group: {
        _id: null,
        data: { $push: "$$ROOT" }
     }
  },
  {
     $set: {
        month: {
           $dateDiff: {
              startDate: new Date("2022-01-01"),
              endDate: new Date(),
              unit: "month"
           }
        }
     }
  },
  {
     $set: {
        data: {
           $map: {
              input: { $range: [0, { $add: ["$month", 1] }] },
              as: "m",
              in: {
                 $let: {
                    vars: {
                       month: {
                          $dateAdd: {
                             startDate: new Date("2022-01-01"),
                             unit: "month",
                             amount: "$$m"
                          }
                       }
                    },
                    in: {
                       _id: "$$month",
                       Count: { $filter: { input: "$data", cond: { $eq: ["$$this._id", "$$month"] } } }
                    }
                 }
              }
           }
        }
     }
  },
  {
     $set: {
        data: {
           $map: {
              input: "$data",
              in: { _id: "$$this._id", Count: { $ifNull: [{ $first: "$$this.Count.Count" }, 0] } }
           }
        }
     }
  },
  { $unwind: "$data" },
  { $replaceWith: "$data" },
  { $sort: { _id: 1 } }
  ]);
  userPerMonth.forEach(function (doc) { doc.lable = moment(doc._id).format('MMMM') })

  var orderPerMonth = await OrderedMenu.aggregate([
    { $match: { createdAt: { $gte: new Date("2022-01-01"), $lte: new Date() } } },
    {
       $group: {
          _id: { $dateTrunc: { date: "$createdAt", unit: "month" } },
          Count: {$count: {}}
       }
    },
    {
       $group: {
          _id: null,
          data: { $push: "$$ROOT" }
       }
    },
    {
       $set: {
          month: {
             $dateDiff: {
                startDate: new Date("2022-01-01"),
                endDate: new Date(),
                unit: "month"
             }
          }
       }
    },
    {
       $set: {
          data: {
             $map: {
                input: { $range: [0, { $add: ["$month", 1] }] },
                as: "m",
                in: {
                   $let: {
                      vars: {
                         month: {
                            $dateAdd: {
                               startDate: new Date("2022-01-01"),
                               unit: "month",
                               amount: "$$m"
                            }
                         }
                      },
                      in: {
                         _id: "$$month",
                         Count: { $filter: { input: "$data", cond: { $eq: ["$$this._id", "$$month"] } } }
                      }
                   }
                }
             }
          }
       }
    },
    {
       $set: {
          data: {
             $map: {
                input: "$data",
                in: { _id: "$$this._id", Count: { $ifNull: [{ $first: "$$this.Count.Count" }, 0] } }
             }
          }
       }
    },
    { $unwind: "$data" },
    { $replaceWith: "$data" },
    { $sort: { _id: 1 } }
  ]);
  orderPerMonth.forEach(function (doc) { doc.lable = moment(doc._id).format('MMMM') })

  res.status(200).json({
    success: true,
    userPerMonth,
    productPerMonth,
    orderPerMonth,
  });
};
  