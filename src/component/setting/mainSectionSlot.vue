<template>
    <ul>
        <li v-for="item in data" :key="item">
            <template v-if="item.type == 'title'">
                <img :src="`src/assets/img/setting/${item.icon}.png`">
                <div class="descMessage">
                    <span class="descMessage-name">{{ item.name }}</span>
                    <span class="descMessage-desc">{{ item.desc }}</span>
                </div>
            </template>
        </li>
    </ul>
</template>

<script>
export default {
  props: ['data'],
  setup(props) {

    return {
    }
  },
};
</script>

<style lang="scss" scoped>
ul{
    // position: absolute;
    list-style: none;
    overflow-y: scroll;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 80%;
    // bottom: 1em;
    li{
        position: relative;
        display: flex;
        align-items: center;
        width: 80%;
        height: 4em;
        background-color: #fafbfd;
        border-radius: .2em;
        padding-left: 1em;
        margin:.5em;
        img{
            width: 1.5em;
        }
        .descMessage{
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 1.2em;

            &-name{
                font-size: .9em;
            }

            &-desc{
                font-size: .6em;
            }
        }

        &::after{
            position: absolute;
            right: 1em;
            content: "🔜";
        }
    }
}
ul::-webkit-scrollbar {
    width: 3px;
}


ul::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #777a7c; 
}
</style>