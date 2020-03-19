<template>
    <div class="crud">
        <div class="alert alert-danger" role="alert" v-if="error.status">
            <p>
                <u>an error occured! please try after sometime . </u> <br/>
                <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    click for more details
                </a>
            </p>
            <div class="collapse" id="collapseExample">
                <div v-if="error.e.response != undefined">
                    <div> Status : {{error.e.response.status}}</div>
                    Message : <div v-html="error.e.response.data"></div>
                </div>
                <div v-else>{{error.e}}</div>
            </div>
        </div>
        <div v-else>
            <div class="on__page__menu">
                <button type="button" class="btn btn-success" data-toggle="modal" :data-target="'.create-new-modal-lg-'+entity.name">Add One</button>
                <div class="modal fade" :class="'create-new-modal-lg-'+entity.name" tabindex="-1" role="dialog" aria-labelledby="createNewModal" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{{entity.name}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-row align-items-center">
                                    <div class="col-auto" v-for="(col,colIdx) in entity.properties" :key="colIdx">
                                        <label :for="'labelFor'+col">{{col.name}}</label>
                                        <input :type="col.inputType" class="form-control" :id="col+'_'+colIdx" :aria-describedby="col+'Help'" placeholder="" v-model="eModalData[col.modalName]">
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="add()">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="entity.datas.length > 0 ">
                <table class="table">
                    <tbody>
                        <tr v-for="(tabData,tabIndex) in entity.datas" :key="tabIndex" :id="tabData._id">
                            <td v-for="(colData,colIndex) in Object.keys(tabData)" :key="colIndex" v-show="colData!='_id'">
                                <div v-if="editMode(tabIndex)">
                                    <u>{{colData}}</u><br>
                                    {{tabData[colData]}}
                                </div>
                                <div v-else>
                                    <u>{{colData}}</u><br>
                                    <input type="text" class="form-control" v-model="tabData[colData]">
                                </div>
                            </td>
                            <td>
                                <div class="dropdown" v-if="editMode(tabIndex)">
                                    <a href="#" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >....</a>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#" @click="edit(tabIndex,tabData)">Edit</a>
                                        <a class="dropdown-item" href="#" @click="deletee(tabIndex,tabData)">Delete</a>
                                        <a class="dropdown-item" href="#" @click="history(tabIndex,tabData)">History</a>
                                    </div>
                                </div>
                                <div v-else>
                                    <a  class="btn btn-info" href="#" @click="update(tabIndex,tabData)">Update</a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <span>No Record found, 
                    <button type="button" class="btn btn-success" data-toggle="modal" :data-target="'.create-new-modal-lg-'+entity.name">+</button> 
                    Create one</span>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props : {
        entity: Object
    },
    data() {
        return{
            eModalData: {},
            error: {
                status: false,
                e:null
            },
            success: false,
            triggerEditModeIndex: null,
            t:'show'
        }
    },
    methods: {
        add(){
            axios.post(this.entity.endpoint,this.eModalData,{'Content-Type': 'application/json'})
            .then(response=> {
                this.success = true
                this.refresh();
            })
            .catch(error=>{
                this.error.status=true
                this.error.e=error 
            });
            this.eModalData={};
            
        },
        edit(idx,d){
            this.triggerEditModeIndex=idx;
        },
        deletee(idx,d){
            axios.delete(this.entity.endpoint+'/'+d._id)
            .then(response=>{
                this.success = true
                this.refresh();
            })
            .catch(error=>{
                this.error.status=true
                this.error.e=error 
            })
        },
        history(idx,d){
            
        },
        refresh() {
            //Read available data
            axios.get(this.entity.endpoint)
            .then(response=> {
                this.entity.datas = response.data
            })
            .catch(error=>{
                this.error.status=true
                this.error.e=error 
            })
        },
        readProperties() {
            //Read available properties
            axios.get(this.entity.endpoint+'/prop')
            .then(response=>{
                this.entity.properties = response.data
            })
            .catch(error=>{
                this.error.status=true
                this.error.e=error 
            })
        },
        editMode(modeIndex) {
            if (this.triggerEditModeIndex == modeIndex) return false;
            return true;
        },
        update(idx,d) {
            let updateId= d._id;
            delete d._id
            axios.put(this.entity.endpoint+'/'+updateId,d)
            .then(response=> {
                this.triggerEditModeIndex=null;
                this.refresh();
            })
            .catch(error=>{
                this.error.status=true
                this.error.e=error 
            });
        }
    },
    created:function() {
        this.readProperties()
        this.refresh()            
    }
}
</script>
<style scoped>
    .crud {
        margin-top: 30px;
    }
    .on__page__menu {
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>
