export default function ({ app, route, redirect }) {
    const expiryTimeStamp = localStorage.getItem('x-auth-expire');
    const currentTimeStamp = Math.floor(new Date().getTime() / 1000);
    if (route.path !== '/login') {
        if (!!expiryTimeStamp) {
            if (currentTimeStamp >= expiryTimeStamp) {
                localStorage.removeItem('x-auth-expire');
                return redirect('/');
            }
        } else {
            return redirect('/login');
        }
    }
}
