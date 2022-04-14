<template>
  <div class="home">
    <v-container>
      <v-layout>
        <v-flex xs12 mt-5>
          <div class="text-caption">
            Pizza ECサイト
          </div>          
          <v-btn color="info" @click="login">Googleアカウントでログイン</v-btn>
        </v-flex>
      </v-layout>
    </v-container> 
  </div>
</template>

<script>
// @ is an ailas to /src
import { mapActions } from "vuex"

  export default {
    name: 'Home',
    methods:{
      ...mapActions(["login"]),
    },
  }
</script>
