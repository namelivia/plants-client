<template>
<div>
<b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">Plants App</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="list">List</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
</b-navbar>
        <b-container class="mt-2">
            <router-view></router-view>
        </b-container>
    </div>
</template>

<style lang="scss">
    @import './assets/styles/custom.scss';
    @import '../node_modules/bootstrap/dist/css/bootstrap.css';
    @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
</style>
