const SignUpCheck = async ({username, password, firstname, lastname, email}) => {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/signup/`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({username,password,firstname,lastname,email})
        })
        let result = await response.json();
        console.log(result)
        return true
    } catch {
        console.log("failed to signup")
        return false
    }
}

const LoginCheck = async ({username, password}) => {
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/login/`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({username,password})
        })
        let { token } = await response.json()
        sessionStorage.setItem('Authorization', token);
        return true
    } catch {
        console.log("failed to login")
        return false
    }
}



const tokenCheck = async () => {
    const token = sessionStorage.getItem('Authorization');
    try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/login/token`, 
        {
            method: 'get',
            mode: 'cors',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token ? `Bearer ${token}`: ''
            }
        },
       )
        let {username, id, iat} = await response.json();
        return { username, pending:false }
    } catch {
        return { username:null, pending:false }
    }
    
}

const SetLoginToken = (idToken) => {
    localStorage.setItem('Authorization', idToken);
    window.location.assign('/');
}

const getToken = () => {
    const token = sessionStorage.getItem('Authorization');

    if (token) {
        return token
    } else {
        return null
    }
}

const SignOut = () => {
    sessionStorage.removeItem('Authorization');
    window.location.reload();
} 

export { SignUpCheck, LoginCheck, tokenCheck, getToken };