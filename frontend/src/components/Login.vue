<template>
    <div class="vue-tempalte">
        <navigation
            :isSignedIn="false"
        >
        </navigation>
        <form style="width:400px; margin: 0 auto;">
            <h3>Se Connecter</h3>

            <div class="form-group">
                <label>Nom</label>
                <input type="text" class="form-control form-control-lg" v-model="username"/>
            </div>

            <div class="form-group">
                <label>Mot de Passe</label>
                <input type="password" class="form-control form-control-lg" v-model="password"/>
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block" @click="handleSubmit" :disabled="!username.length || !password.length">Se Connecter</button>

            <p class="forgot-password text-right">
                Nouvelle utilisateur?
                <router-link :to="{name: 'signup'}">Creer un compte</router-link>
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
                password : ""
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                if (this.password.length > 0) {
                    this.$http.post('http://localhost:5000/api/v1/users/login', {
                        username: this.username,
                        password: this.password
                    })
                    .then(response => {
                        if (response.status == 200) {
                            console.log("user login successfull");
                            localStorage.setItem('user',JSON.stringify(response.data.username));
                            localStorage.setItem('jwt',response.data.token);
                            this.$router.push('/dashboard')
                        }
                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                }
            }
        }
    }
</script>
