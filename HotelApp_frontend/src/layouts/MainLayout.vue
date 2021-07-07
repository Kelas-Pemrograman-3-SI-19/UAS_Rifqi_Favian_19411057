<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-brown-9 text-white">
      <q-toolbar>
        <q-btn dense flat round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu"/>
        <q-space></q-space>
        <q-btn flat round>
          <q-avatar>
            <img src="~assets/admin1.jpg">
          </q-avatar>
          <q-menu>
          <q-list style="min-width: 100px">
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Profile</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logout">
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
          </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-brown-10 text-accent"
    >
    <q-scroll-area class="fit">
          <q-list>
          <q-item class="justify-center text-center q-mb-md q-mt-md">
            <div>
              <q-avatar size="100px">
                <img src="~assets/admin1.jpg">
              </q-avatar>
              <div class="text-weight-bold q-mt-md">{{ $q.localStorage.getItem('dataUser').namaLengkap }}</div>
              <div>Aplikasi Pemesanan Kamar Hotel</div>
            </div>
          </q-item>

          <q-item clickable active-class="active" v-ripple exact :to=" { name: 'dashboardAdmin' }">
            <q-item-section avatar>
              <q-icon name="dashboard"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable active-class="active" v-ripple exact :to="{ name: 'dataKamar' }">
            <q-item-section avatar>
            <q-icon name="meeting_room"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Data Kamar</q-item-label>
            </q-item-section>
            </q-item>
          <q-item clickable active-class="active" :to="{ name: 'inputKamar' }" v-ripple exact>
            <q-item-section avatar>
              <q-icon name="input"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Input Kamar</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable active-class="active" :to="{ name: 'dataUser' }" v-ripple exact>
            <q-item-section avatar>
              <q-icon name="supervisor_account"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Data User</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
    </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.remove()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>
<style scoped>
.active {
  color: #000;
  background-color: rgb(255,191,0);
  padding-right: 20px;
}
</style>
