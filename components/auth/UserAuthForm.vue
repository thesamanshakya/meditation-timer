<template>
    <section class="h-screen">
        <div class="px-6 h-full text-gray-800">
            <div
                class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
            >
                <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0 hidden lg:block">
                    <img
                        :src="
                            isLoginForm
                                ? 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
                                : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
                        "
                        class="w-full"
                        alt="Phone image"
                    />
                </div>
                <div
                    class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 lg:mb-12 md:mb-0 text-center lg:text-left"
                >
                    <h1 class="text-black text-xl font-normal block mb-6">
                        Please {{ text.toLowerCase() }} to use
                        <span class="text-3xl font-medium block pt-1">
                            Hamro Meditation Timer
                            <span class="text-red-500 text-4xl">&hearts;</span>
                        </span>
                    </h1>
                    <form>
                        <SocialLogin :isLoginForm="isLoginForm" />
                        <div
                            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                            <p class="text-center font-semibold mx-4 mb-0">
                                Or
                            </p>
                        </div>

                        <!-- Login Form -->
                        <div v-if="isLoginForm">
                            <div class="mb-6">
                                <input
                                    type="text"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="email-address"
                                    placeholder="Email address"
                                />
                            </div>

                            <div class="mb-6">
                                <input
                                    type="password"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="email-address"
                                    placeholder="Password"
                                />
                            </div>

                            <div class="flex justify-between items-center mb-6">
                                <div
                                    class="form-group form-check flex items-center"
                                >
                                    <input
                                        id="remember-me"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        class="w-4 h-4 mr-2 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 mt-1"
                                        required=""
                                    />
                                    <label
                                        class="form-check-label inline-block text-gray-800"
                                        for="remember-me"
                                        >Remember me</label
                                    >
                                </div>
                                <a
                                    href="#!"
                                    class="text-gray-800 hover:text-primary"
                                    >Forgot password?</a
                                >
                            </div>
                        </div>
                        <!-- Signup Form -->
                        <div v-else>
                            <div class="mb-6">
                                <input
                                    type="text"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="full-name"
                                    placeholder="Your full name"
                                />
                            </div>

                            <div class="mb-6">
                                <input
                                    type="text"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="email-address"
                                    placeholder="Your email address"
                                />
                            </div>

                            <div class="mb-6">
                                <input
                                    type="password"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div class="mb-6">
                                <input
                                    type="password"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="confirm-password"
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>

                        <div class="text-center lg:text-left">
                            <button
                                type="button"
                                class="inline-block px-10 py-3 bg-primary text-white font-medium text-lg leading-snug uppercase rounded shadow-md hover:bg-primaryDark hover:shadow-lg focus:bg-primaryDark focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full lg:w-auto"
                            >
                                {{ text }}
                            </button>
                            <p class="text-black font-medium mt-4 mb-0 text-xl">
                                Don't have an account?
                                <NuxtLink
                                    class="text-primary hover:primaryDark focus:primaryDark transition duration-200 ease-in-out"
                                    :to="isLoginForm ? '/signup' : '/login'"
                                >
                                    {{ text }}
                                </NuxtLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SocialLogin from './SocialLogin.vue';

export default {
    props: ['isLoginForm'],
    data() {
        return {
            text: this.isLoginForm ? 'Login' : 'Signup'
        }
    },
    components: { SocialLogin }
};
</script>

<style lang="scss" scoped></style>
