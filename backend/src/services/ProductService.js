const Product=require('../model/ProductModel')

const createProduct =(newProduct)=>{
    return new Promise(async (resolve, reject)=>{
        const { name, image, type, price, countInStock, rating, description } = newProduct;

        try{
        const checkProduct= await Product.findOne({name: name})
        if(checkProduct!=null){
            resolve({
                status:'OK',
                message: 'Product already exists',
            })
        }
        const newProduct= await Product.create({
            name, image, type, price, countInStock, rating, description
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

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
           const allProduct=await Product.find();
            resolve({
                status: 'OK',
                message: 'Success',
                data:allProduct
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
    getAllProduct
}