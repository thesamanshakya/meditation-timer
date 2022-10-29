<template>
    <UserAuthForm :isLoginForm="false" />
</template>

<script>
import UserAuthForm from '~/components/auth/UserAuthForm.vue';
import SocialLogin from '~/components/auth/SocialLogin.vue';
export default {
    components: { UserAuthForm, SocialLogin }
};
</script>

<style lang="scss" scoped></style>
