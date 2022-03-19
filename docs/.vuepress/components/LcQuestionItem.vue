<template>
  <div class="lc-question-item">
    <span>LeetCode.</span>
    <span>{{ id }}</span>
    <span>{{ questionTitle }}</span>
    <Badge text:='level' type:='type'> {{ level }}</Badge>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LcQuestionItem",
  props: ["id"],
  data() {
    return { questionTitle: "Two sum", level: "easy" };
  },
  mounted: {
    
    
  },
  computed: {
    type() {
      map = {
        'easy': 'tip',
        'medium': 'warning',
        'hard': 'error',
      }
      return map[this.level];
    }
  },
  methods: {},
};
</script>

<style scoped>
.lc-question-item {
  display: inline-block;
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
}
span {
  margin-right: 10px;
}
span.easy {
  display: inline-block;
  vertical-align: top;
  width: 2rem;
  font-size: 1rem;
  color: #fff;
  background-color: green;
  border-radius: 2px;
}
span.medium {
  color: #fff;
  background-color: green;
}
span.hard {
  color: #fff;
  background-color: red;
}
</style>