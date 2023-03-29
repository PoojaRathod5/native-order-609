const { ProductModel } = require("../model/product.model");

/<-------------------Create Product ----------------------->/;

const addProduct = async (req, res) => {
	const payload = req.body;
	const {
		Image1,
		Image2,
		Title,
		Category,
		Brand,
		Discount_price,
		Original_price,
		Product_details,
	} = payload;
	try {
		if (
			Image1 &&
			Image2 &&
			Title &&
			Category &&
			Brand &&
			Discount_price &&
			Original_price &&
			Product_details
		) {
			const newProduct = new ProductModel(payload);

			await newProduct.save();

			res.status(200).send({
				message: `Product has been added successfully`,
			});
		} else {
			res.status(400).send({
				message: `Please provide all the details :title, price, description, image, rating, additional  `,
			});
		}
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
};

/<-------------------Read Category Wise Product ----------------------->/;

const getProduct = async (req, res) => {
	const filter = req?.query;

	try {
		const allProduct = await ProductModel.find(filter);
		res.status(200).send(allProduct);
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
};
/<-------------------Read Single Product ----------------------->/;

const getSingleProduct = async (req, res) => {
	const id = req.params.id;
	const isProductPresent = await ProductModel.find({ _id: id });
	console.log(isProductPresent);

	try {
		if (isProductPresent.length == 1) {
			res.status(200).send(isProductPresent[0]);
		} else {
			res.status(400).send({
				message: `Product With ID: ${id} does not exist`,
			});
		}
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
};

/<-------------------Update Product ----------------------->/;

const updateProduct = async (req, res) => {
	const id = req.params.id;
	const isProductPresent = await ProductModel.findById({ _id: id });
	const payload = req.body;
	try {
		if (isProductPresent.length) {
			ProductModel.findByIdAndUpdate({ _id: id }, payload);
			res.status(200).send({
				message: `${isProductPresent[0].title}  with ID: ${id} has been updated`,
			});
		} else {
			res.status(400).send({
				message: `Product With ID: ${id} does not exist`,
			});
		}
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
};
/<-------------------Delete Product ----------------------->/;
const deleteProduct = async (req, res) => {
	const id = req.params.id;
	const isProductPresent = await ProductModel.findById({ _id: id });
	try {
		if (isProductPresent.length) {
			ProductModel.findByIdAndDelete({ _id: id });
			res.status(200).send({
				message: `${isProductPresent[0].title}  with ID: ${id} has been deleted`,
			});
		} else {
			res.status(400).send({
				message: `Product With ID: ${id} does not exist`,
			});
		}
	} catch (error) {
		res.status(400).send({
			message: error.message,
		});
	}
};

module.exports = {
	addProduct,
	getProduct,
	getSingleProduct,
	updateProduct,
	deleteProduct,
};