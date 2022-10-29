export default function ({ app, route, redirect }) {
    if (!$nuxt.isOffline) {
        app.$fire.auth.onAuthStateChanged((user) => {
            if (user) {
                $nuxt.$store.dispatch('onAuthStateChangedAction', user);
            } else {
                return redirect('/login');
            }
        });
    }
}
