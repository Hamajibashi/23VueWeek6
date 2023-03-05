<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">LOGO</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">首頁</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/products" class="nav-link">產品列表</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/cart" class="nav-link">
                            購物車
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">後台登入</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
