export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    console.log(user.accessToken)
  
    if (user && user.accessToken) {
            console.log(user.accessToken)
      return { Authorization:  user.accessToken };

    } else {
      console.log("boş")
      return {};
    }
  }