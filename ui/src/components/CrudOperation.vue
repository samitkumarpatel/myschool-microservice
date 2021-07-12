<template>
    <div class="crud_operaton">
        <div class="row" id="__always" >
            <div class="col">
                <strong> {{ name }} </strong>
            </div>
            <div class="col" v-if="items.size >= 0">
                <label for="searchBox" class="form-label">search {{name}}</label>
                <input type="input" id="searchBoxInput" class="form-control" aria-describedby="searchBoxInputBlock">
                <div id="searchBoxInputBlock" class="form-text"></div>
            </div>
        </div>
        <div id="__operation">
            <a href="#">+ to create new {{name}}</a>
        </div>

        <div id="__result" v-if="items.size >= 0">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Key</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="e,i in items" :key="i">
                        <td>{{i}}</td>
                        <td>{{e}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>
    .row {
        margin: 20px 0px 20px 0px;
    }
</style>
<script>
export default {
  props: {
    entity: Object,
    name: String
  },
  data () {
    return {
      items: []
    }
  },
  methods: {}
}
</script>
