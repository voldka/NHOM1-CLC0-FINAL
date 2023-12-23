const ProductService = require("../services/ProductService");
const validationSchema = require("../utils/validationSchema");

const ratingProduct = async (req, res) => {
  try {
    const userId = req.params?.userId;
    const productId = req.params?.productId;
    const starts = req.body?.starts;
    const { error } = validationSchema.ratingSchemaValidation({
      userId,
      productId,
      starts,
    });
    if (error) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: error.details[0].message,
      });
    }

    const response = await ProductService.ratingProduct({
      productId,
      userId,
      starts,
    });
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(e.statusCode || 500).json(e);
  }
};

const createProduct = async (req, res) => {
  try {
    const newImages = req.files.map(
      (file) =>
        process.env.BASE_URL +
        "/uploads/products/" +
        file.filename.replace(/\s/g, "")
    );

    const data = {
      ...req.body,
      image: newImages,
    };
    const { error } = validationSchema.createProductSchemaBodyValidation(data);
    if (error) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: error.details[0].message,
      });
    }

    const response = await ProductService.createProduct(data);
    return res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Thêm sản phẩm thành công",
      data: response,
    });
  } catch (e) {
    console.log(e);
    return res.status(e.statusCode || 500).json(e);
  }
};

const updateProduct = async (req, res) => {
  try {
    let images = req.body.images;
    const productId = req.params.productId;
    if (!productId) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Vui lòng cung cấp productId",
      });
    }

    const newImages = req.files.map(
      (file) =>
        process.env.BASE_URL +
        "/uploads/products/" +
        file.filename.replace(/\s/g, "")
    );
    let replacedReqBodyImages, arrayOfUrls, item, splitUrls;
    let formattedData = [];

    if (typeof images != "string") {
      arrayOfUrls = images.filter((img) => img !== "undefined");
      item = arrayOfUrls[0];
      splitUrls = item.split(",");
      formattedData = formattedData.concat(splitUrls);
    } else {
      splitUrls = images.split(",");
      formattedData = formattedData.concat(splitUrls);
    }

    if (typeof images === "string") {
      arrayOfUrls = images.split(",");
    }
    if (newImages.length != 0) {
      replacedReqBodyImages = [
        ...new Set([
          ...newImages.filter((img) => img !== "undefined"),
          ...formattedData,
        ]),
      ];
      replacedReqBodyImages = replacedReqBodyImages.map((img) =>
        img.replace("undefined/", process.env.BASE_URL)
      );
    } else {
      replacedReqBodyImages = arrayOfUrls.filter((img) => img !== "undefined");
      replacedReqBodyImages = replacedReqBodyImages.map((img) =>
        img.replace("undefined/", process.env.BASE_URL)
      );
    }
    let {
      name,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      selled,
    } = req.body;
    const data = {
      name,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      selled,
      image: replacedReqBodyImages,
    };
 
    const { error } = validationSchema.updateProductSchemaBodyValidation(data);
    if (error) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: error.details[0].message,
      });
    }

    const response = await ProductService.updateProduct(productId, data);

    return res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Cập nhật sản phẩm thành công",
      data: response,
    });
  } catch (e) {
    console.log(e);
    return res.status(e.statusCode || 500).json(e);
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Vui lòng cung cấp productId",
      });
    }
    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: response,
    });
  } catch (e) {
    console.log(e);
    return res.status(e.statusCode || 500).json(e);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(e.statusCode || 500).json(e);
  }
};

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Vui lòng cung cấp danh sách productId",
      });
    }
    const response = await ProductService.deleteManyProduct(ids);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(e.statusCode || 500).json(e);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const filters = {};
    const { name, productTypes, page = 1, pageSize } = req.query;

    if (name) {
      filters.name = { $regex: new RegExp(name, "i") }; // Case-insensitive name search
    }
    if (productTypes) {
      const typeArray = productTypes.split(","); // Convert comma-separated types to an array
      filters.type = { $in: typeArray };
    }

    const response = await ProductService.getAllProduct(
      filters,
      page,
      pageSize
    );
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(e.statusCode || 500).json(e);
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await ProductService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(e.statusCode || 500).json(e);
  }
};

const getRelevantProducts = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Vui lòng cung cấp productId",
      });
    }
    const response = await ProductService.getRelevantProducts(productId);
    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: response,
    });
  } catch (e) {
    console.log(e);
    return res.status(e.statusCode || 500).json(e);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  deleteMany,
  getAllType,
  ratingProduct,
  getRelevantProducts,
};
