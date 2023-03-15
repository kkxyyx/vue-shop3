<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import Recommend from "@/pages/Home/Recommend";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home" ,
  components: { ListContainer, Rank, Like, Floor, Brand, Recommend },
  mounted() {
    
    this.$store.dispatch("getUserInfo");
    
  },
};
</script>

<style></style>
