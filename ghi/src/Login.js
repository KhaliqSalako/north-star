function Login() {
    async function LoginModal(username, password) {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;

    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    const response = await fetch(url, {
        method: "post",
        credentials: "include",
        body: form,
    });
    if (response.ok) {
        const tokenUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;

        try {
        const response = await fetch(tokenUrl, {
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            const token = data.access_token;
            // DO SOMETHING WITH THE TOKEN SO YOU CAN USE IT
            // IN REQUESTS TO YOUR NON-ACCOUNTS SERVICES
        }
        } catch (e) {}
        return false;
    }
    let error = await response.json();
    // DO SOMETHING WITH THE ERROR, IF YOU WANT
    }
}


export default Login;
