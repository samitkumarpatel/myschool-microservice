<template>
    <div class="dashboard">
        <div class="container">
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand">||||</a>
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
        
            <section class="app__body">
                <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#school" @click="c='school'">school</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#subject" @click="c='subject'">subject</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#teacher" @click="c='teacher'">teacher</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#class" @click="c='class'">class</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#student" @click="c='student'">student</a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div id="school" class="tab-pane fade in show active">
                            <crud :entity="entitys[0]" v-if="enable('school')"/>
                        </div>
                        <div id="subject" class="tab-pane fade">
                            <crud :entity="entitys[1]" v-if="enable('subject')"/>
                        </div>
                        <div id="teacher" class="tab-pane fade">
                            <crud :entity="entitys[2]" v-if="enable('teacher')"/>
                        </div>
                        <div id="class" class="tab-pane fade">
                            <crud :entity="entitys[3]" v-if="enable('class')"/>
                        </div>
                        <div id="student" class="tab-pane fade">
                            <crud :entity="entitys[4]" v-if="enable('student')"/>
                        </div>
                    </div>
            </section>

            <footer>
                <small>footer@footer ...</small>
            </footer>
        </div>
    </div>    
</template>
<script>
import crud from './CRUD.vue';
export default {
    components : {
        crud
    },
    data() {
        return {
            defaultE : {
                name: '',
                endpoint: '',
                properties: [],
                datas:[]
            },
            currentlySelectedTab: ''
            ,
            entitys: [
                {
                    name: 'school',
                    endpoint: 'http://localhost:3000/school',
                    properties: [],
                    datas:[]
                },
                {
                    name: 'subject',
                    endpoint: 'http://localhost:3001/subject',
                    properties: [],
                    datas:[]
                },
                {
                    name: 'teacher',
                    endpoint: 'http://localhost:3002/teacher',
                    properties: [],
                    datas:[]
                },
                {
                    name: 'class',
                    endpoint: 'http://localhost:3003/class',
                    properties: [],
                    datas:[]
                },
                {
                    name: 'student',
                    endpoint: 'http://localhost:3004/student',
                    properties: [],
                    datas:[]
                }
            ],
            c: 'school'
        }
    },
    methods: {
        enable(v){
            return v == this.c
        }
    }
}
</script>
<style scoped>
    .app__body{
        margin-top: 20px;
    }
    footer {
        margin-top: 80px;
    }
</style>
