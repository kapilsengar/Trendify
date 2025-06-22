import jwt from 'jsonwebtoken'

export const gentoken =async (userId)=>{
try {
    let token = await jwt.sign({userId},process.env.JWT_SECREAT ,{expiresIn:"3d"} )
    return token
} catch (error) {
    console.log('token Error')
}
}


export const genToken1 = (email) => {
   try {
       const token = jwt.sign({ email }, process.env.JWT_SECREAT, { expiresIn: "3d" });
       return token;
   } catch (error) {
       console.log("token error", error);
       return null;
   }
};
