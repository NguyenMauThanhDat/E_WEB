const jwt = require('jsonwebtoken');
require('dotenv').config();

const generalAccessToken = async (payload) => {
    const access_token = jwt.sign({payload}, 'access_token', { expiresIn: '30s' });
    return access_token;
}

const generalRefreshToken = async (payload) => {
    const access_token = jwt.sign({payload}, 'refresh_token', { expiresIn: '365d' });
    return access_token;
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
                try {  
                    console.log('token',token)
                    jwt.verify(token, process.env.REFRESH_TOKEN,async (err, user)=>{
                        if(err){
                            resolve({
                                status: 'ERROR',
                                message:'The authentication'
                            })
                        }
                        //console.log('user',user)
                        const {payload}=user
                        const access_token=await generalAccessToken({
                        id:payload?.id,
                        isAdmin:payload?.isAdmin
                    })
                    //console.log('access_token', access_token)
                    resolve({
                        status: 'OK',
                        message: 'Success',
                        access_token
                    });
                    })
                    
                } catch (e) {
                    reject(e);
                }
    })
}

// const refreshTokenJwtService = async (token) => {
//     return new Promise((resolve, reject) => {
//         try {
//             console.log('Token Received:', token);
//             console.log('Refresh Token Secret:', process.env.REFRESH_TOKEN);

//             jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
//                 if (err) {
//                     console.log('JWT Error:', err); // Log lỗi chi tiết
//                     return resolve({
//                         status: 'ERROR',
//                         message: 'The authentication failed',
//                         error: err.message // Trả về chi tiết lỗi cho phía client
//                     });
//                 }
                
//                 console.log('user', user);
//                 resolve({
//                     status: 'OK',
//                     message: 'Success',
//                     user: user
//                 });
//             });
//         } catch (e) {
//             reject({
//                 status: 'ERROR',
//                 message: 'Internal server error',
//                 error: e.message
//             });
//         }
//     });
// };

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService
}
