<template>
    <!-- 首页 -->
    <div class="home">
        <swiper :options="swiperOption">
            <swiper-slide>
                <img class="w-100" src="../assets/images/lbt1.jpeg" />
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/images/lbt2.jpeg" />
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/images/lbt3.jpeg" />
            </swiper-slide>
            <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
        </swiper>

        <!-- 图标导航 -->
        <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark">
            <div class="d-flex flex-wrap">
                <div class="nav-item mb-3" v-for="item in 10" :key="item">
                    <i class="sprite sprite-news"></i>
                    <div class="py-1">爆料站</div>
                </div>
            </div>
            <div class="bg-light py-2 fs-sm">
                <i class="sprite sprite-arrow mr-1"></i>
                <span>收起</span>
            </div>
        </div>

        <!-- 新闻资讯 -->
        <m-list-card icon="menu" title="新闻资讯" :categories="newCats">
            <template #items="{category}">
                <router-link
                    tag="div"
                    :to="`/articles/${news._id}`"
                    class="py-2 fs-lg d-flex"
                    v-for="(news,index) in category.newsList"
                    :key="index"
                >
                    <span class="text-info">[{{ news.categoryName }}]</span>
                    <span class="px-2">|</span>
                    <span class="flex-1 text-dark-1 fs-md text-ellipsis pr-3">{{ news.title }}</span>
                    <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
                </router-link>
            </template>
        </m-list-card>

        <!-- 英雄列表 -->
        <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
            <template #items="{category}">
                <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
                    <router-link
                        tag="div"
                        :to="`/heroes/${hero._id}`"
                        class="p-2 text-center"
                        style="width:20%"
                        v-for="(hero,index) in category.heroesList"
                        :key="index"
                    >
                        <img :src="hero.avatar" class="w-100" />
                        <div>{{ hero.name }}</div>
                    </router-link>
                </div>
            </template>
        </m-list-card>

        <!-- 精彩视频 -->
        <m-card icon="menu" title="精彩视频"></m-card>

        <!-- 图文攻略 -->
        <m-card icon="menu" title="图文攻略"></m-card>
    </div>
</template>

<script>
import dayjs from "dayjs";

export default {
    name: "home",
    data() {
        return {
            swiperOption: {
                pagination: {
                    // 指定class
                    el: ".pagination-home"
                }
            },
            newCats: [],
            heroCats: []
        };
    },
    methods: {
        async fetchNewsCats() {
            const res = await this.$http.get("news/list");
            console.log(res);
            this.newCats = res.data;
        },
        async fetchHeroCats() {
            const res = await this.$http.get("heroes/list");
            console.log(res);
            this.heroCats = res.data;
        }
    },
    filters: {
        date(val) {
            return dayjs(val).format("MM/DD");
        }
    },
    created() {
        this.fetchNewsCats();
        this.fetchHeroCats();
    }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
    .swiper-pagination-bullet {
        opacity: 1;
        border-radius: 0.1538rem;
        background: map-get($colors, "white");

        &.swiper-pagination-bullet-active {
            background: map-get($colors, "info");
        }
    }
}

.nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item {
        width: 25%;
        border-left: 1px solid $border-color;
        &:nth-child(4n + 1) {
            border-left: none;
        }
    }
}
</style>
