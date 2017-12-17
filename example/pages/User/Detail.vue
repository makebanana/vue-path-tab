<template>
  <div>
    <p>user detail : this.$tab.params = {{$tab.params}}</p>
    <p>user detail : this.$tab.query = {{$tab.query}}</p>
    <h1>{{ user.name }}</h1>
    <h2>{{ user.mobile }}</h2>
    <el-input placeholder="设置该tab的title" class="input-wrap" v-model="title">
      <template slot="prepend">title</template>
    </el-input>
    <el-button type="primary" @click="handleSetTabTitle">修改title</el-button>
  </div>

</template>

<script>
export default {
  name: 'userdetail',
  data () {
    return {
      id: null,
      title: null,
      user: {}
    }
  },

  methods: {
    handleSetTabTitle () {
      this.$tab.setTitle(this.title)
    }
  },

  created () {
    let { id } = this.$tab.params
    this.id = id
    // this.$fetch({
    //   url: '/api/user/' + id
    // }).then(res => {
    //   this.user = res.data.user
    // })
  }
}
</script>

<style lang="scss">
.input-wrap{
  margin: 20px 0;
  width: 400px;
}
</style>
