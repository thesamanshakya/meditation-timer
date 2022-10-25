<template>
    <div></div>
</template>

<script>
export default {
    asyncData() {
        $nuxt.$fire.auth.signOut();
    }
};
</script>

<style lang="scss" scoped></style>
