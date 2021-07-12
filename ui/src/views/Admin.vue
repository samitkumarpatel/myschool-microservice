<template>
  <div class="admin">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="school-tab" data-bs-toggle="tab" data-bs-target="#school" type="button" role="tab" aria-controls="school" aria-selected="true">School</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="class-tab" data-bs-toggle="tab" data-bs-target="#class" type="button" role="tab" aria-controls="class" aria-selected="false">Class</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="subject-tab" data-bs-toggle="tab" data-bs-target="#subject" type="button" role="tab" aria-controls="subject" aria-selected="false">Subject</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="school" role="tabpanel" aria-labelledby="school-tab">
        <CrudOperation name="school" :entity=[1,2,3,4]></CrudOperation>
      </div>
      <div class="tab-pane fade" id="class" role="tabpanel" aria-labelledby="class-tab">
        <CrudOperation name="class" :entity=[a,b,c,d]></CrudOperation>
      </div>
      <div class="tab-pane fade" id="subject" role="tabpanel" aria-labelledby="subject-tab">
        <CrudOperation name="subject" :entity=[i,ii,iii,iv]></CrudOperation>
      </div>
    </div>
  </div>
</template>

<script>
import CrudOperation from '@/components/CrudOperation.vue'

export default {
  name: 'Admin',
  components: {
    CrudOperation
  }

}
</script>

<style scoped>
</style>
