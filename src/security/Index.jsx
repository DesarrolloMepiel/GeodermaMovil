
export const VerifySession = () => {
    // localStorage.removeItem('user')
    if(!localStorage.getItem('user'))
    {
        return false;
    }else{
        return JSON.parse(localStorage.getItem('user'));
    }
}

export const DestroySession = () => {
    localStorage.removeItem('user');
    if(localStorage.getItem('user'))
    {
        return false;
    }

    return true;
}