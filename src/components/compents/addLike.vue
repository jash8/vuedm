<template>
  <div>
    <button v-on:click="addLikes">like:{{likesNum}}</button>
  </div>
</template>

<script>
export default {
  props: ["likes"],
  data() {
    return {
      vBln: true,
      likesNum:Number(this.likes)
    };
  },
  methods: {
    addLikes: function() {
      console.log('sdf')
      this.vBln ? this.likesNum++ : this.likesNum--;
      this.vBln = !this.vBln;      
    }
  }
};
</script>

<style scoped>
  button {
    background: none;
    border: none;
    outline: none;
    background-color: #fff;
    color: #333
  }
</style>