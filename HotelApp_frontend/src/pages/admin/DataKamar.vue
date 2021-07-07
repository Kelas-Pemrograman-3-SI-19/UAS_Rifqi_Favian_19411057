<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6">Data Kamar Hotel</div>
              <div>Data Kamar Hotel yang Telah Tersedia</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-table
        :rows="data"
        flat
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="namaKamar" :props="props">
              {{ props.row.namaKamar }}
            </q-td>
            <q-td key="harga" :props="props">
              Rp.{{ props.row.harga }},-
            </q-td>
            <q-td key="jenis" :props="props">
              {{ props.row.jenis }}
            </q-td>
            <q-td key="deskripsi" :props="props">
              <div class="ellipsis" style="max-width:200px;">
                {{ props.row.deskripsi }}
              </div>
            </q-td>
            <q-td key="gambar" :props="props">
              <q-img
                :src="`${$baseImageURL}/${props.row.image}`"
                spinner-color="white"
              />
            </q-td>
            <q-td key="aksi" :props="props">
              <div class="row q-gutter-md">
                <q-btn :to="{ name:'editKamar', params: { id: props.row._id }}" label="Edit" icon="edit" color="warning" unelevated/>
                <q-btn @click="deleteKamar(props.row._id)" label="Hapus" icon="delete" color="negative" unelevated/>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'namaKamar', align: 'left', label: 'Nama Kamar', field: 'namaKamar', sortable: true },
        { name: 'harga', align: 'left', label: 'Harga', field: 'harga', sortable: true },
        { name: 'jenis', align: 'left', label: 'Jenis Kamar', field: 'jenis', sortable: true },
        { name: 'deskripsi', align: 'left', label: 'Deskripsi Kamar', field: 'deskripsi', sortable: true },
        { name: 'gambar', align: 'left', label: 'Foto', field: 'gambar', sortable: true },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/kamar/getall')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          } else {
            this.showNotif(res.data.pesan, 'negative')
          }
        })
    },
    deleteKamar (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`kamar/delete/${id}`)
          .then(res => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
      })
    }
  }
}
</script>
<style scoped>
.left{
  width: 5px;
  height: 100%;
  background-color:rgb(255,191,0);
}
</style>
