<template>
    <div>
        <nav
            class="navbar navbar-dark bg-dark justify-content-between flex-nowrap flex-row"
        >
            <div class="container">
                <a class="navbar-brand float-left">Firebase Vue CRUD Example</a>
                <ul class="nav navbar-nav flex-row float-right">
                    <li class="nav-item px-2">
                        <router-link class="nav-link pr-3" to="/">
                            Add User
                        </router-link>
                    </li>
                    <li class="nav-item px-2">
                        <router-link class="nav-link" to="/list">
                            View Users
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container mt-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
