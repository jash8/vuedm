<template>
  <div>

  </div>
</template>

<script>
import axios from "axios";
import url from "@/url.config.js";
export default {
  data() {
    return {
      ID: "04027793756e474182d10e8fdd21d9f5"
    };
  },
  created() {
    this.getInfos();
  },
  methods: {
    getInfos() {
      axios
        .post(url.goodsDetail, { goodsId: "04027793756e474182d10e8fdd21d9f5" }
        )
        .then(res => {
          console.log(res.data);
        });
    }
  }
};
</script>

<style scoped>
</style>