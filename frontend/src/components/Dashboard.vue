<template>
    <div class="vue-tempalte">
        <navigation
            :isSignedIn="true"
        >
        </navigation>
        <div class="container">

            <div class="row">
                <div class="col-12">
                    <button class="btn btn-primary" @click="showNewTaskControls" v-if="!isFormVisible">Ajouter une nouvelle Tache</button>
                    <div v-if="isFormVisible">
                        <form>
                            <h3>Ajouter une nouvelle Tache</h3>

                            <div class="form-group">
                                <label>Titre</label>
                                <input type="text" class="form-control form-control-lg" v-model="new_task_title"/>
                            </div>

                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="form-control form-control-lg" id="exampleFormControlTextarea1" rows="3" v-model="new_task_description"></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary btn-lg btn-block"
                                @click="createNewTask"
                                :disabled="!new_task_title.length || !new_task_description.length"
                            >
                                Creer Tache
                            </button>
                            <button type="button" class="btn btn-secondary btn-lg btn-block" @click="hideNewTaskControls">Annuler</button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="row" style="margin-top: 20px;">
                <div class="col-md-4 border">
                    <h4 class="text-center">Tache En Attente</h4>
                    <h6 class="text-center" v-if="!tasks.filter(task => task.status == 0).length">Aucune</h6>
                    <div class="card" style="margin-top: 5px;margin-bottom: 5px;" v-for="item in tasks.filter(task => task.status == 0)" :key="item.id">
                        <div class="card-header">
                            En Attente
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"> {{ item.title }} </h5>
                            <p class="card-text text-justify">{{ item.description }}</p>
                            <div class="row" style="width: 100%;">
                                <button type="button" class="btn btn-danger btn-sm" @click="deleteTask(item.id)">Supprimer</button>
                                <button type="button" class="btn btn-info btn-sm" @click="startProgresTask(item.id)">Commencer</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 border">
                    <h4 class="text-center">Tache En Cours</h4>
                    <h6 class="text-center" v-if="!tasks.filter(task => task.status == 1).length">None</h6>
                    <div class="card" style="margin-top: 5px;margin-bottom: 5px;" v-for="item in tasks.filter(task => task.status == 1)" :key="item.id">
                        <div class="card-header">
                            En Cours
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"> {{ item.title }} </h5>
                            <p class="card-text">{{ item.description }}</p>
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteTask(item.id)">Supprimer</button>
                            <button type="button" class="btn btn-success btn-sm" @click="finishTask(item.id)">Fini</button>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 border">
                    <h4 class="text-center">Finished</h4>
                    <h6 class="text-center" v-if="!tasks.filter(task => task.status == 2).length">None</h6>
                    <div class="card" style="margin-top: 5px;margin-bottom: 5px;" v-for="item in tasks.filter(task => task.status == 2)" :key="item.id">
                        <div class="card-header">
                            Fini
                        </div>
                        <div class="card-body">
                            <h5 class="card-title"> {{ item.title }} </h5>
                            <p class="card-text">{{ item.description }}</p>
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteTask(item.id)">Supprimer</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <br>

    </div>
</template>

<script>
    import Navigation from './Navigation.vue';
    export default {
        components: {
            'navigation': Navigation
        },
        data() {
            return {
                tasks: [],
                new_task_title: "",
                new_task_description: "",
                isFormVisible: false
            }
        },
        mounted() {
            this.loadTasks();
        },
        methods : {
            createNewTask(e){
                e.preventDefault();
                let token = this.getJwtToken();
                this.$http.post(
                    'http://localhost:5000/api/v1/tasks',
                    {
                        title: this.new_task_title,
                        description: this.new_task_description
                    },
                    {
                        headers : {
                            Authorization: "Bearer " + token
                        }
                    }
                )
                .then(response => {
                    if (response.status == 201) {
                        this.clearNewTask();
                        this.hideNewTaskControls();
                        this.loadTasks();
                    }
                })
                .catch(function (error) {
                    console.error(error.response);
                });
            },
            getJwtToken() {
                return localStorage.getItem('jwt');
            },
            loadTasks() {
                let token = this.getJwtToken();
                this.$http.get(
                    'http://localhost:5000/api/v1/tasks',
                    {
                        headers : {
                            Authorization: "Bearer " + token
                        }
                    }
                )
                .then(response => {
                    if (response.status == 200) {
                        this.tasks = response.data;
                    }
                    this.clearNewTask();
                })
                .catch(function (error) {
                    console.log(error.response);
                });
            },
            clearNewTask() {
                this.new_task_title = "";
                this.new_task_description = "";
            },
            deleteTask(id) {
                let confirmed = confirm("Are you sure you want to delete this task?");
                if (! confirmed) { return }
                let token = this.getJwtToken();
                this.$http.delete(
                    'http://localhost:5000/api/v1/tasks/id/' + id,
                    {
                        headers : {
                            Authorization: "Bearer " + token
                        }
                    }
                )
                 .then(response => {
                    if (response.status == 200) {
                        this.loadTasks();
                    }
                })
                .catch(function (error) {
                    console.error(error.response);
                });
            },
            startProgresTask(id) {
                const task = this.getTaskById(id);
                task.status = 1;
                this.updateTask(task);
            },
            finishTask(id) {
                const task = this.getTaskById(id);
                task.status = 2;
                this.updateTask(task);
            },
            getTaskById(id) {
                const task = this.tasks.find((t) => { return t.id == id;});
                return task;
            },
            updateTask(task) {
                let token = this.getJwtToken();
                this.$http.patch(
                    'http://localhost:5000/api/v1/tasks/id/' + task.id,
                    task,
                    {
                        headers : {
                            Authorization: "Bearer " + token
                        }
                    }
                )
                .then(response => {
                    if (response.status == 200) {
                        this.loadTasks();
                    }
                })
                .catch(function (error) {
                    console.error(error.response);
                });
            },
            showNewTaskControls() {
                this.isFormVisible = true;
            },
            hideNewTaskControls() {
                this.isFormVisible = false;
            }
        }
    }
</script>
