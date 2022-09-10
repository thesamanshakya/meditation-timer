<template>
    <div id="wrapper">
        <div id="nav-container" :class="{ active: navActive }">
            <div class="menu-button" @click="navActive = !navActive">
                <span class="i-bar"></span>
                <span class="i-bar"></span>
                <span class="i-bar"></span>
            </div>
            <div class="nav-content">
                <ul class="nav">
                    <li>
                        <a
                            href="http://m.me/100666278588914"
                            target="_blank"
                            rel="nofollow noopener"
                            >Contact Developer</a
                        >
                    </li>
                    <li>
                        <a
                            href="http://m.me/100666278588914"
                            target="_blank"
                            rel="nofollow noopener"
                            >Report a bug</a
                        >
                    </li>
                    <li>
                        <a
                            href="http://m.me/anapansati"
                            target="_blank"
                            rel="nofollow noopener"
                            >Join meditation!</a
                        >
                    </li>
                    <li>
                        <a
                            href="https://buymeacoffee.com/samanshakya"
                            target="_blank"
                            rel="nofollow noopener"
                            >Buy me a Coffee!</a
                        >
                    </li>
                </ul>
                <span class="by"
                    >App created by<i
                        ><a href="https://saman.com.np">Saman Shakya</a> with
                        &hearts;</i
                    ><i>May all beings be happy! &#128522;</i></span
                >
            </div>
        </div>
        <Nuxt />
        <span class="install"
            >Get this free app. It won't take up space on your device.
            <a href="javscript:void(0)" class="btn-install" id="install-add"
                >Install App</a
            ></span
        >
    </div>
</template>

<script>
export default {
    data() {
        return {
            navActive: false
        };
    }
};
</script>

<style lang="scss" scoped>
</style>