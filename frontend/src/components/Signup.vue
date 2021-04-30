<template>
    <div class="vue-tempalte">
        <navigation
            :isSignedIn="false"
        >
        </navigation>
        <form style="width:400px; margin: 0 auto;" class="center">
            <h3>S'inscrire</h3>

            <div class="form-group">
                <label>Nom</label>
                <input type="text" class="form-control form-control-lg" v-model="username"/>
            </div>

            <div class="form-group">
                <label>Mot de Passe</label>
                <input type="password" class="form-control form-control-lg" v-model="password"/>
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block" @click="handleSubmit" :disabled="!username.length || !password.length">S'inscrire</button>

            <p class="forgot-password text-right">
                Vous Avez deja un compte ?
                <router-link :to="{name: 'login'}">Se Connecter</router-link>
            </p>
        </form>
    </div>
</template>

<script>
    import Navigation from './Navigation.vue';

    export default {
        components: {
            'navigation': Navigation
        },
        data(){
            return {
                username : "",
                password : "",
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                if (this.password.length > 0) {
                    this.$http.post('http://localhost:5000/api/v1/users', {
                        username: this.username,
                        password: this.password
                    })
                    .then(response => {
                        if (response.status == 201) {
                            this.$router.push('/login')
                        }
                        else {
                            alert(response.data.message);
                        }
                    })
                    .catch(function (error) {
                        alert(error.response.data.message);
                    });
                }
            }
        }
    };
</script>
