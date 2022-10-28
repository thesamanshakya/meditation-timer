<template>
    <div class="relative">
        <div>
            <button
                type="button"
                class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                @click="dropActive = !dropActive"
            >
                <span class="sr-only">Open user menu</span>
                <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
            </button>
        </div>
        <Transition name="fade">
            <div
                v-if="dropActive"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
            >
                <NuxtLink
                    :to="list.url"
                    v-for="(list, index) in menuList"
                    :key="index"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabindex="-1"
                    >{{ list.linkText }}</NuxtLink
                >
            </div>
        </Transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dropActive: false,
            menuList: [
                {
                    linkText: 'My Profile',
                    url: '/profile'
                },
                {
                    linkText: 'Logout',
                    url: '/logout'
                }
            ]
        };
    },
    methods: {
        clickOutsideClose(e) {
            if (!this.$el.contains(e.target)) {
                this.dropActive = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.clickOutsideClose);
    },
    destroyed() {
        document.removeEventListener('click', this.clickOutsideClose);
    }
};
</script>

<style lang="scss" scoped></style>
