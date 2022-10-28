<template>
    <section class="h-screen">
        <div class="p-6 h-full text-gray-800">
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
                        <span
                            class="text-2xl lg:text-3xl font-medium pt-1 flex items-center justify-center lg:justify-start"
                        >
                            Hamro Meditation Timer
                            <span class="text-red-500 text-4xl ml-2"
                                >&hearts;</span
                            >
                        </span>
                    </h1>
                    <form
                        @submit.prevent="
                            isLoginForm ? submitLoginForm() : submitSignupForm()
                        "
                    >
                        <SocialLogin
                            @social-login="socialLogin"
                            :isLoginForm="isLoginForm"
                        />
                        <div
                            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                        >
                            <p class="text-center font-semibold mx-4 mb-0">
                                OR
                            </p>
                        </div>

                        <!-- Login Form -->
                        <div v-if="isLoginForm">
                            <div class="mb-6">
                                <input
                                    type="text"
                                    v-model="login.email"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="email-address"
                                    placeholder="Email address"
                                />
                                <div
                                    v-if="
                                        login.formSubmitted &&
                                        $v.login.email.$error
                                    "
                                >
                                    <span
                                        class="text-red-600 text-base pt-1 font-medium block"
                                        v-if="!$v.login.email.required"
                                        >Please enter your email or
                                        username.</span
                                    >
                                </div>
                            </div>

                            <div class="mb-6">
                                <input
                                    type="password"
                                    v-model="login.password"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="password"
                                    placeholder="Password"
                                />
                                <div
                                    v-if="
                                        login.formSubmitted &&
                                        $v.login.password.$error
                                    "
                                >
                                    <span
                                        class="text-red-600 text-base pt-1 font-medium block"
                                        v-if="!$v.login.password.required"
                                        >Please enter your password.</span
                                    >
                                    <span
                                        class="text-red-600 text-base pt-1 font-medium block"
                                        v-if="!$v.login.password.minLength"
                                        >Password must be at least 8
                                        characters.</span
                                    >
                                </div>
                            </div>

                            <div class="mb-6">
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
                                    v-model="signup.fullName"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="full-name"
                                    placeholder="Your full name"
                                />
                                <div
                                    v-if="
                                        signup.formSubmitted &&
                                        $v.signup.fullName.$error
                                    "
                                >
                                    <span
                                        class="text-red-600 text-base pt-1 font-medium block"
                                        v-if="!$v.signup.fullName.required"
                                        >Please enter your full name.</span
                                    >
                                </div>
                            </div>

                            <div class="mb-6">
                                <input
                                    type="text"
                                    v-model="signup.email"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="email-address"
                                    placeholder="Your email address"
                                />
                                <div
                                    v-if="
                                        signup.formSubmitted &&
                                        $v.signup.email.$error
                                    "
                                >
                                    <span
                                        class="text-red-600 text-base pt-1 font-medium block"
                                        v-if="!$v.signup.email.required"
                                        >Please enter your email.</span
                                    >
                                    <span
                                        class="text-red-600 text-base pt-1 font-medium block"
                                        v-if="!$v.signup.email.email"
                                        >Please enter a valid email
                                        address.</span
                                    >
                                </div>
                            </div>

                            <div class="mb-6">
                                <input
                                    type="password"
                                    v-model="signup.password"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="password"
                                    placeholder="Password"
                                />
                                <div
                                    v-if="
                                        signup.formSubmitted &&
                                        $v.signup.password.$error
                                    "
                                >
                                    <span
                                        class="text-red-600 text-base pt-1 font-medium block"
                                        v-if="!$v.signup.password.required"
                                        >Please enter new password.</span
                                    >
                                    <span
                                        class="text-red-600 text-base pt-1 font-medium block"
                                        v-if="!$v.signup.password.minLength"
                                        >Password must be at least 8
                                        characters.</span
                                    >
                                </div>
                            </div>
                            <div class="mb-6">
                                <input
                                    type="password"
                                    v-model="signup.confirmPassword"
                                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
                                    id="confirm-password"
                                    placeholder="Confirm Password"
                                />
                                <div
                                    v-if="
                                        signup.formSubmitted &&
                                        $v.signup.confirmPassword.$error
                                    "
                                >
                                    <span
                                        class="text-red-600 text-base pt-1 font-medium block"
                                        v-if="
                                            !$v.signup.confirmPassword.required
                                        "
                                        >Please confirm your password.</span
                                    >
                                    <span
                                        class="text-red-600 text-base pt-1 font-medium block"
                                        v-if="
                                            $v.signup.confirmPassword
                                                .required &&
                                            !$v.signup.password.sameAsPassword
                                        "
                                        >Please enter same password.</span
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="text-center lg:text-left">
                            <button
                                v-if="!loading"
                                type="submit"
                                class="inline-block px-10 py-3 bg-primary text-white font-medium text-lg leading-snug uppercase rounded shadow-md hover:bg-primaryDark hover:shadow-lg focus:bg-primaryDark focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full lg:w-auto"
                            >
                                {{ text }}
                            </button>
                            <button
                                v-else
                                disabled
                                type="button"
                                class="px-5 py-3 bg-primary text-white font-medium text-lg leading-snug uppercase rounded shadow-md hover:bg-primaryDark hover:shadow-lg focus:bg-primaryDark focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full lg:w-auto inline-flex justify-center items-center"
                            >
                                <svg
                                    role="status"
                                    class="inline mr-3 w-4 h-4 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Please wait...
                            </button>
                            <p class="text-black font-medium mt-4 mb-0 text-xl">
                                Don't have an account?
                                <NuxtLink
                                    class="text-primary hover:primaryDark focus:primaryDark transition duration-200 ease-in-out"
                                    :to="isLoginForm ? '/signup' : '/login'"
                                >
                                    {{ !isLoginForm ? 'Login' : 'Signup' }}
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
import { globalMixins } from '../../mixins/global';
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import SocialLogin from './SocialLogin.vue';

export default {
    mixins: [globalMixins],
    props: ['isLoginForm'],
    data() {
        return {
            text: this.isLoginForm ? 'Login' : 'Signup',
            loading: false,
            login: {
                email: '',
                password: '',
                error: '',
                formSubmitted: false
            },
            signup: {
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                error: '',
                formSubmitted: false
            },
            submitBtn: {
                text: 'submit',
                disabled: false
            }
        };
    },
    validations: {
        login: {
            email: {
                required
            },
            password: {
                required,
                minLength: minLength(8)
            }
        },
        signup: {
            fullName: {
                required
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8)
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    },
    methods: {
        async submitLoginForm() {
            this.loading = true;
            this.login.formSubmitted = true;

            // stop here if form is invalid
            this.$v.login.$touch();
            if (this.$v.login.$invalid) {
                this.loading = false;
                return;
            }
            this.fireBaseLogin();
        },
        async submitSignupForm() {
            this.loading = true;
            this.signup.formSubmitted = true;

            // stop here if form is invalid
            this.$v.signup.$touch();
            if (this.$v.signup.$invalid) {
                this.loading = false;
                return;
            }
            this.fireBaseSignup();
        },
        fireBaseLogin() {
            let that = this;
            this.$fire.auth
                .signInWithEmailAndPassword(
                    this.login.email,
                    this.login.password
                )
                .then((user) => {
                    //we are signed in
                    that.$router.push('/');
                    this.welcomeByFirstName();
                })
                .catch((error) => {
                    that.$toast.open({
                        position: 'top',
                        message: error.message,
                        type: 'error'
                    });
                    that.loading = false;
                });
        },
        fireBaseSignup() {
            let that = this;
            this.$fire.auth
                .createUserWithEmailAndPassword(
                    this.signup.email,
                    this.signup.password
                )
                .then((user) => {
                    //we are signed in
                    this.updateUserProfile();
                    that.$router.push('/login');
                    that.$toast.open({
                        position: 'top',
                        message: 'Account created! Please login.',
                        type: 'success'
                    });
                })
                .catch((error) => {
                    that.$toast.open({
                        position: 'top',
                        message: error.message,
                        type: 'error'
                    });
                    that.loading = false;
                });
        },
        updateUserProfile() {
            const userID = this.$fire.auth.currentUser.uid;
            if (!!userID) {
                this.$fire.database.ref('users/' + userID).set({
                    full_name: this.signup.fullName,
                    // display_name: null,
                    email: this.signup.email,
                    // profile_picture: null,
                    last_login: Date.now()
                });
            }
        },
        socialLogin(value) {
            let provider = null;
            let that = this;

            if (value == 'google') {
                provider =
                    new this.$fire.auth.app.firebase.auth.GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
            } else if (value == 'facebook') {
                provider =
                    new this.$fire.auth.app.firebase.auth.FacebookAuthProvider();
                provider.addScope('user_birthday');
            }

            this.$fire.auth
                .signInWithPopup(provider)
                .then(() => {
                    this.$router.push('/');
                    this.welcomeByFirstName();
                })
                .catch((e) => {
                    that.$toast.open({
                        position: 'top',
                        message: e.message,
                        type: 'error'
                    });
                });
        },
        async welcomeByFirstName() {
            const fullName = await this.getUserFullName();
            if (!!fullName) {
                this.$toast.open({
                    position: 'top',
                    message: 'Welcome ' + fullName.split(' ')[0] + '!',
                    type: 'success',
                    duration: '7000'
                });
            }
        }
    },
    components: { SocialLogin }
};
</script>
