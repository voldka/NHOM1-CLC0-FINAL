const Materials = require('../models/MaterialModel');

module.exports = {
    create: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Materials.create(data);
                return resolve(result);
            } catch (error) {

            }
        });
    },

    getByName: (name) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Materials.findOne({
                    name: { $regex: new RegExp('^' + name + '$', 'i') },
                });
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    },

    getAll: () => {
        return Materials.find()
            .select({ __v: 0, updatedAt: 0 })
            .sort([['createdAt', 'desc']]);
    },

    update: (id, changes) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [currentProductType, existedProductType] = await Promise.all([
                    Materials.findById(id),
                    Materials.findOne({ name: { $regex: new RegExp('^' + changes.name + '$', 'i') } }),
                ]);
                if (!currentProductType) {
                    return reject({
                        status: 'error',
                        statusCode: 404,
                        message: `Không tìm thấy loại thành phần, vật liệu có ID: ${id}`,
                    });
                }
                if (existedProductType && existedProductType._id.toString() !== id) {
                    return reject({
                        status: 'error',
                        statusCode: 404,
                        message: `Thành phần, vật liệu đã tồn tại`,
                    });
                }

                const updatedProductType = await Materials.findByIdAndUpdate(id, changes, {
                    new: true,
                }).select({ __v: 0, updatedAt: 0 });
                return resolve(updatedProductType);
            } catch (error) {
                return reject(error);
            }
        });
    },

    delete: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const prodType = await Materials.findById(id);
                if (!prodType) {
                    return reject({
                        status: 'error',
                        statusCode: 404,
                        message: `Không tìm thấy thành phần, vật liệu có ID: ${id}`,
                    });
                }
                await Materials.deleteOne({ _id: id });
                resolve(null);
            } catch (error) {
                return reject(error);
            }
        });
    },
};
