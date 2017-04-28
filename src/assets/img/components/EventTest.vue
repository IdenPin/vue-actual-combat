<template>
<div>
    <button @click='demo'>到五的时候取消监听</button>
    <p>{{ziksang1}}</p>
    <button @click='demo2'>只监听一次,传一个参过来</button>
    <p>{{ziksang2}}</p>
</div>
</template>
<script>
export default {
    created() {
        this.$on('demo', () => {
            this.ziksang1++
                if (this.ziksang1 == 5) {
                    this.$off('demo')
                }
        })
        this.$once('demo2', (value) => {
            this.ziksang2 += value
        })
    },
    data() {
        return {
            ziksang1: 0,
            ziksang2: 0
        }
    },
    methods: {
        demo() {
            this.$emit('demo')
        },
        demo2() {
            this.$emit('demo2', 10)
        }
    }
}
</script>
