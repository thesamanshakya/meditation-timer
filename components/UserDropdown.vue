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
                    v-if="profilePic"
                    class="h-8 w-8 rounded-full"
                    :src="profilePic"
                    alt="User Profile"
                />
                <span
                    v-else
                    class="w-8 h-8 rounded-full bg-white text-black text-center font-medium flex items-center justify-center text-base"
                    >{{ userFirstNameLetter }}</span
                >
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
import { globalMixins } from '../mixins/global';
export default {
    mixins: [globalMixins],
    data() {
        return {
            userData: null,
            dropActive: false,
            profilePic: null,
            userFirstNameLetter: null,
            menuList: [
                // {
                //     linkText: 'My Profile',
                //     url: '/profile'
                // },
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
        },
        async getFirstLetterFromName() {
            let firstLetter = await this.getUserFullName();
            firstLetter = !!firstLetter ? firstLetter.charAt(0) : null;
            this.userFirstNameLetter = firstLetter;
        },
        getUserData() {
            this.$fire.auth.onAuthStateChanged((user) => {
                if (user) {
                    this.setProfilePic(user);
                }
            });
        },
        setProfilePic(user) {
            this.profilePic = !!user.photoURL ? user.photoURL : null;
            !!user && this.getFirstLetterFromName();
        }
    },
    created() {
        !$nuxt.isOffline && this.getUserData();
    },
    mounted() {
        document.addEventListener('click', this.clickOutsideClose);
    },
    destroyed() {
        document.removeEventListener('click', this.clickOutsideClose);
    }
};
</script>
