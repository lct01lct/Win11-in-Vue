<template>
  <div class="fileToolBar">
    <ul>
        <li v-for="item in toolList" :key="item">
            <span v-if="item.type === 'spacer'" class="spacer"></span>
            <template v-if="item.type === 'icon'">
                <img :src="`src/assets/img/setting/${item.icon}`" >
                <span class="desc">{{ item.desc }}</span>        
            </template>
        </li>
    </ul>
  </div>
</template>

<script setup>
// 文件夹的文件操作的工具栏
// 具有的功能： 
//  1. 新建文件
//  2. 剪切
//  3. 复制
//  4. 粘贴
//  5. 排序
//  6. 视图
let toolList = [
    {   
        type: 'icon',
        icon:'new.png',
        desc:'New'
    },
    {
        type:'spacer'
    },
    {   
        type: 'icon',
        icon:'cut.png',
    },
    {   
        type: 'icon',
        icon:'copy.png',
    },
    {   
        type: 'icon',
        icon:'paste.png',
    },
    {   
        type: 'icon',
        icon:'rename.png',
    },
    {
        type:'spacer'
    },
    {   
        type: 'icon',
        icon:'sort.png',
        desc:'Sort'
    },
    {   
        type: 'icon',
        icon:'view.png',
        desc:'View'
    },
    {
        type:'spacer'
    }
]



</script>

<style lang="scss" scoped>
.fileToolBar{
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #f1f4f9;
    color: #4e4f50;
    border-bottom: 1px solid #dddddd;
    ul{
        list-style: none;
        display: flex;
        height: 80%;
        margin: 0;
        padding: .2em 1.5em;

        li{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: .5em;
            img{
                width: 1.2em;
                // margin-right: .2em;
            }
            .desc{
                // margin-left: .5em;
                font-size: .9em;
            }

            .spacer{
                width: 1px;
                height: 100%;
                background-color: #aaaaaa;
            }

            &:hover{
                border-radius: .3em;
                background-color: #ffffff;
            }
        }
    }
}
</style>