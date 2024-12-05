const Product=require('../model/ProductModel')

const createProduct =(newProduct)=>{
    return new Promise(async (resolve, reject)=>{
        const { name, image, type, price, countInStock, rating, description, discount } = newProduct;

        try{
        const checkProduct= await Product.findOne({name: name})
        if(checkProduct!=null){
            resolve({
                status:'OK',
                message: 'Product already exists',
            })
        }
        const newProduct= await Product.create({
            name, image, type, price, countInStock, rating, description, discount
        })
        if(newProduct){
            resolve({
                status:'OK',
                message:'Success',
                data: newProduct
            })
        }
        } catch(e){
            reject(e);
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (checkProduct === null) {
                return resolve({
                    status: 'OK',
                    message: 'Product is not defined',
                });
            }

            if (!data || Object.keys(data).length === 0) {
                return resolve({
                    status: 'Error',
                    message: 'No data provided for update',
                });
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
            console.log(updatedProduct);

            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedProduct
            });
        } catch (e) {
            reject(e.message);
        }
    });
};

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({ _id: id });
            if (product === null) {
                return resolve({
                    status: 'OK',
                    message: 'Product is not defined',
                });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data:product
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (checkProduct === null) {
                return resolve({
                    status: 'OK',
                    message: 'Product is not defined',
                });
            }

           await Product.findByIdAndDelete(id);
           
            resolve({
                status: 'OK',
                message: 'Success'
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
           await Product.deleteMany({_id:ids});
           
            resolve({
                status: 'OK',
                message: 'Success'
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
           const totalProduct = await Product.countDocuments();
           
           if(filter){
            const label =filter[0];
            const allObjectFilter=await Product.find({[label]: {'$regex':filter[1]}}).limit(limit).skip(page*limit);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                });

           }

           if(sort){
            const objectSort={}
            objectSort[sort[1]] = sort[0];
            const allProductSort=await Product.find().limit(limit).skip(page*limit).sort(objectSort);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data:allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                });
           }
           let allProduct;

            // Kiểm tra nếu `sort` là một mảng hợp lệ và có 2 phần tử
            if (Array.isArray(sort) && sort.length === 2) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                allProduct = await Product.find().limit(limit).skip(page * limit).sort(objectSort);
            } else {
                // Nếu `sort` không hợp lệ, chỉ thực hiện truy vấn mà không áp dụng sắp xếp
                allProduct = await Product.find().limit(limit).skip(page * limit);
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data:allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            });
        } catch (e) {
            reject(e);
        }
    });
};
const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data:allType,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports ={
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType
}