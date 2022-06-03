export const validateEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(emailRegex.test(email)){
        return true;
    }else{
        return false;
    }
}
export default validateEmail