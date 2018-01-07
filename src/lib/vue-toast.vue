<template>
  <section class="toast-container">
    <div class="toast" :class="[visible ? 'fade-in' : 'fade-out']">
      <span :class="type">{{ message }}</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'vue-toast',
  data() {
    return {
      message: '',
      type: 'info',
      visible: false
    };
  }
}
</script>

<style lang="scss" scoped>
@keyframes fade-in{
  0% {
    opacity: 0;
    transform: scale(.7)
  }
  100% {
    opacity: 1;
    transform: scale(1)
  }
}
@keyframes fade-out{
  0% {
    opacity: 1;
    transform: scale(1)
  }
  100% {
    opacity: 0;
    transform: scale(.7)
  }
}
.toast-container{
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  justify-content: center;
  align-items: center;
  .toast{
    width: 180px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: rgba(0, 0, 0, .6);;
    border-radius: 10px;
    color: #fff
  }
  .info{
    color: aqua
  }
  .success{
    color: aquamarine
  }
  .warn{
    color: darkorange
  }
  .error{
    color: crimson
  }
  .fade-in{
    animation: fade-in .3s both;
    // animation-name: fade-in;
    // animation-duration: .3s;
    // animation-fill-mode: both;
  }
  .fade-out{
    animation: fade-out .3s both;
    // animation-name: fade-out;
    // animation-duration: .3s;
    // animation-fill-mode: both;
  }
}
</style>