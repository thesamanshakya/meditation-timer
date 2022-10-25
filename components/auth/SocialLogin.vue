<template>
    <div class="flex flex-row items-center justify-center lg:justify-start">
        <p class="text-xl mb-0 mr-4">
            {{ isLoginForm ? 'Login' : 'Signup' }} via
        </p>
        <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            class="inline-block p-3 bg-primary text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-primaryDark hover:shadow-lg focus:bg-primaryDark focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
            @click="$emit('social-login', 'facebook')"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                class="w-4 h-4"
            >
                <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                />
            </svg>
        </button>

        <!-- Google Login -->
        <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            class="inline-block p-3 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-600 active:shadow-lg transition duration-150 ease-in-out mx-1"
            @click="$emit('social-login', 'google')"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-google"
                viewBox="0 0 16 16"
            >
                <path
                    d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                />
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    props: ['isLoginForm']
};
</script>

<style lang="scss" scoped></style>
