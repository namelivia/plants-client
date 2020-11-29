<template lang="pug">
.plants-background.min-vh-100
    b-navbar(toggleable="lg" type="dark" variant="info")
        b-navbar-brand(to="/") Plants App
        b-navbar-toggle(target="nav-collapse")
        b-collapse(id="nav-collapse" is-nav)
            b-navbar-nav
                b-nav-item(to="list") List
                b-nav-item(to="new") New
    b-container.bg-light.text-dark.pb-4.pt-4
        router-view
</template>

<style lang="scss">
@import "./assets/styles/custom.scss";
@import "../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
</style>
