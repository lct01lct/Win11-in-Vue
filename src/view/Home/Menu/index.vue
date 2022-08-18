<script setup></script>

<template>
  <div class="main-menu-wrapper">
    <ul class="icon-options-list">
      <li class="icon-option-item">
        <img src="src/assets/img/setting/cut.png" alt="" draggable="false" />
      </li>
      <li class="icon-option-item">
        <img src="src/assets/img/setting/copy.png" alt="" draggable="false" />
      </li>
      <li class="icon-option-item">
        <img src="src/assets/img/setting/paste.png" alt="" draggable="false" />
      </li>
      <li class="icon-option-item">
        <img src="src/assets/img/setting/rename.png" alt="" draggable="false" />
      </li>

      <li class="icon-option-item">
        <img src="src/assets/img/setting/cut.png" alt="" draggable="false" />
      </li>
      <li class="icon-option-item">
        <img src="src/assets/img/setting/cut.png" alt="" draggable="false" />
      </li>
    </ul>
    <hr />
  </div>
</template>

<style scoped lang="scss">
  .main-menu-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 258px;
    height: 336px;
    background-color: rgb(247, 247, 247);
    padding: 10px;
    .icon-options-list {
      display: flex;
      height: 40px;
      .icon-option-item {
        padding: 10px;
        img {
          width: 100%;
          height: 100%;
        }
        &:hover {
          background-color: #eeeeee;
        }
      }
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
