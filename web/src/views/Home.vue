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
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    data() {
        return {
            swiperOption: {
                pagination: {
                    // 指定class
                    el: ".pagination-home"
                }
            }
        };
    },
    components: {
        HelloWorld
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
</style>
