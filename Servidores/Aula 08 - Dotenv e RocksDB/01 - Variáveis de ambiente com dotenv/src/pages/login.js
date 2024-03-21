const loginContent = `
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login</title>
    </head>
    <body>
        <div>
            <h2>Login</h2>
            <form action="/login" method="post">
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username" required><br>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" required><br><br>
                <input type="submit" value="Login">
            </form>
        </div>
    </body>
    <script>
        const form = document.querySelector('form')
        form.addEventListener('submit', async(event)=> {
            event.preventDefault();
            const username = form.username.value;
            const password = form.password.value;
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            const data = await response.json();
            if(data.error) {
                alert(data.error);
                document.cookie = "";
            } else {
                window.location.href = '/app';
            }
        });
    </script>
    </html>
`

function loginPage(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.send(loginContent)
}

module.exports = loginPage;