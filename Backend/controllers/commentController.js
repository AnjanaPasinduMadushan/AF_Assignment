const Comment = require("../model/comment");

//add products
const addComment = async (req, res, next) => {
  const {
    commentorId,
    complaintId,
    commentText
  } = req.body;

  let comment;
  try {
    comment = new Comment({
      commentorId,
      complaintId,
      commentDateTime: Date.now(),
      commentText
    });
    await comment.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add", error: err });
  }
  if (!comment) {
    return res.status(500).json({ message: "Unable to create new Comment" });
  }
  return res.status(201).json(comment);
};
exports.addComment = addComment;


// get single comment
const readSingleComment = async (req, res) => {
  const commentId = req.params.id;
  let comment;
  try {
    comment = await Comment.findById(commentId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error", error: err });
  }
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  return res.status(200).json({ comment: comment });
}
exports.readSingleComment = readSingleComment;


// get all comments of a complaint
const getByComplaint = async (req, res) => {
  const complaintId = req.params.complaintId;

  const query = { complaintId: complaintId };

  let comments;
  try {
    comments = await Comment.find(query);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", error: err });
  }
  if (!comments || comments.length < 1) {
    return res.status(404).json({ message: "Comments not found" });
  }
  return res.status(200).json({ comments: comments });
}
exports.getByComplaint = getByComplaint;


// get all comments of a user
const getByUser = async (req, res) => {
  const userId = req.params.userId;

  const query = { commentorId: userId };

  let comments;
  try {
    comments = await Comment.find(query);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", error: err });
  }
  if (!comments || comments.length < 1) {
    return res.status(404).json({ message: "Comments not found" });
  }
  return res.status(200).json({ comments: comments });
}
exports.getByUser = getByUser;


/*


//search products using name, or supplier, brand
const getSearch = async (req, res, next) => {

  const { search } = req.query;
  let products;

  if (search) {
    products = await Comment.aggregate(
      [
        {
          '$search': {
            'index': 'product',
            'autocomplete': {
              'query': search,
              'path': 'name'
            }
          }
        }, {
          '$project': {
            'name': 1,
            'brand': 1,
            'price': 1,
            'image': 1,
            'brand': 1,
            'weight': 1
          }
        }
      ]
    )
  } else {
    return res.status(400).json({ message: "Check the input" })
  }

  if (products.length === 0) {
    return res.status(200).json({ message: 'nothing to show', data: { products } })
  }
  else {
    return res.status(200).json({ message: 'Fetched products', data: { products } });
  }



}


//update products
const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const { name, brand, price, weight, upload_date, description, image } = req.body;
  let product;
  try {
    product = await Comment.findByIdAndUpdate(id, {
      name,
      brand,
      price,
      weight,
      upload_date,
      description,
      image
    });
    product = await product.save();
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res.status(404).json({ message: "Unable to Update by id" });
  }
  return res.status(200).json({ product });
};

//delete products
const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Comment.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res.status(404).json({ message: "Unable to Delete by id" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};


exports.getAllProducts = getAllProducts;
exports.getById = getById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getSearch = getSearch;
exports.getBySellerId = getBySellerId


*/