export const globalMixins = {
    methods: {
        async getUserFullName() {
            const user = $nuxt.isOffline ? null : this.$fire.auth.currentUser;
            if (!!user) {
                if (!!user.displayName) {
                    return user.displayName;
                } else {
                    const userID = user.uid;
                    const dbRef = this.$fire.database.ref();
                    return await dbRef
                        .child('users')
                        .child(userID)
                        .child('full_name')
                        .get()
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                return snapshot.val();
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        }
    }
};
