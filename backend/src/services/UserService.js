const User=require('../model/UserModel')
const bcrypt=require('bcrypt')
const { generalAccessToken } = require('./JwtService')
const {generalRefreshToken} =require('./JwtService')

const createUser =(newUser)=>{
    return new Promise(async (resolve, reject)=>{
        const {name, email, password, confirmPassword, phone} = newUser

        try{
        const checkUser= await User.findOne({email: email})
        if(checkUser!=null){
            resolve({
                status:'OK',
                message: 'User already exists',
            })
        }
        const hash=bcrypt.hashSync(password,10)
        console.log(hash)
           const createUser= await User.create({
            name,
            email,
            password: hash, 
            phone,
        })
        if(createUser){
            resolve({
                status:'OK',
                message:'Success',
                data: createUser
            })
        }
        } catch(e){
            reject(e);
        }
    })
}

const loginUser =(userLogin)=>{
    return new Promise(async (resolve, reject)=>{
        const {name, email, password, confirmPassword, phone} = userLogin

        try{
        const checkUser= await User.findOne({email: email})
        if(checkUser===null){
            resolve({
                status:'OK',
                message: 'User is not defined',
            })
        }
        const comparePassword=bcrypt.compareSync(password, checkUser.password)
        
        if(!comparePassword){
            resolve({
                status:'OK',
                message:'The password or user is incorrect'
            })
        }

        const access_token = await generalAccessToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin
        });

        const refresh_token = await generalRefreshToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin
        });

        resolve({
            status:'OK',
            message:'Success',
            access_token: access_token,
            refresh_token: refresh_token
        })
        } catch(e){
            reject(e);
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (checkUser === null) {
                return resolve({
                    status: 'OK',
                    message: 'User is not defined',
                });
            }

            if (!data || Object.keys(data).length === 0) {
                return resolve({
                    status: 'Error',
                    message: 'No data provided for update',
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            console.log(updatedUser);

            resolve({
                status: 'OK',
                message: 'Success',
                data: updatedUser
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (checkUser === null) {
                return resolve({
                    status: 'OK',
                    message: 'User is not defined',
                });
            }

           await User.findByIdAndDelete(id);
           
            resolve({
                status: 'OK',
                message: 'Success'
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
           const allUser=await User.find();
            resolve({
                status: 'OK',
                message: 'Success',
                data:allUser
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ _id: id });
            if (user === null) {
                return resolve({
                    status: 'OK',
                    message: 'User is not defined',
                });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data:user
            });
        } catch (e) {
            reject(e);
        }
    });
};



module.exports ={
    createUser,
    loginUser, 
    updateUser, 
    deleteUser,
    getAllUser,
    getDetailUser
}