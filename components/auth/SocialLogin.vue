<template>
    <div class="lg:flex flex-row items-center justify-center lg:justify-start">
        <p class="text-xl mr-4 mb-4 lg:mb-0 whitespace-nowrap">
            {{ isLoginForm ? 'Login' : 'Signup' }} via
        </p>
        <div class="flex flex-row items-center justify-between -mx-2">
            <button
                v-for="(social, index) in socialList"
                :key="index"
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="flex justify-center flex-1 items-center pl-4 pr-5 py-2 text-white font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:shadow-lg transition duration-150 ease-in-out mx-2"
                :class="social.colorClass"
                @click="$emit('social-login', social.name.toLowerCase())"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path :d="social.svgPath" />
                </svg>
                <span class="ml-2 text-base">{{ social.name }}</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['isLoginForm'],
    data() {
        return {
            socialList: [
                // {
                //     name: 'Facebook',
                //     colorClass: 'bg-primary hover:bg-primaryDark',
                //     svgPath:
                //         'M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z'
                // },
                {
                    name: 'Google',
                    colorClass: 'bg-red-500 hover:bg-red-600',
                    svgPath:
                        'M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
