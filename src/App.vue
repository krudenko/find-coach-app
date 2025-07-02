<template>
    <the-navigation></the-navigation>
    <router-view></router-view>
</template>

<script>
import TheNavigation from './components/layout/TheNavigation.vue';

export default {
    components: {
        TheNavigation
    }
}

</script>

<style>
* {
    box-sizing: border-box;
}

html {
    font-family: sans-serif;
}

body {
    margin: 0;
}
</style>