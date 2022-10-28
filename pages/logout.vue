<script>
export default {
    asyncData() {
        $nuxt.$fire.auth.signOut();
        $nuxt.$router.push('/login')
    }
};
</script>
