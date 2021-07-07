<template>
 <q-page >
    <div class="q-mb-xl shadow-9">
       <q-carousel
         animated
         v-model="slide"
         navigation
         infinite
         :autoplay="autoplay"
         arrows
         swipeable
         transition-prev="slide-right"
         transition-next="slide-left"
         @mouseenter="autoplay = false"
         @mouseleave="autoplay = true"
      >
         <q-carousel-slide :name="1" img-src="~assets/bannerhotel1.jpg" />
         <q-carousel-slide :name="2" img-src="~assets/bannerhotel2.jpg" />
         <q-carousel-slide :name="3" img-src="~assets/bannerhotel3.jpg" />
         <q-carousel-slide :name="4" img-src="~assets/bannerhotel4.jpg" />
      </q-carousel>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-md-3 col-xs-12" v-for="(kamar, i) in data" :key="i">
         <q-card class="bg-brown-10 text-white shadow-9" style="margin-left:20px" >
              <q-img
              :src="`${$baseImageURL}/${kamar.image}`"
              :ratio="16/9"
             />

            <q-card-section>
            <q-btn
               fab
               color="yellow-10"
               icon="add_shopping_cart"
               class="absolute"
               unevelevated
               style="top: 0; right: 12px; transform: translateY(-50%);"
            />

            <div class="row no-wrap items-center">
               <div class="col text-h6 ellipsis">
                  {{ kamar.namaKamar }}
               </div>
            </div>

            <q-rating v-model="kamar.rating" readonly color="orange-5" :max="5" size="32px" />
            </q-card-section>

            <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
                  Rp.{{ kamar.harga }},-
                </div>
                <div class="text-subtitle1">
                  {{ kamar.jenis }}
                </div>
            <div @click="kamar.expanded = !kamar.expanded" class="text-overline text-yellow-10 cursor-pointer">
                  Tampilkan Detail Kamar
                </div>
                <q-slide-transition>
                  <div v-show="kamar.expanded">
                    <div class="text-white text-caption" style="text-align:justify;">
                      {{ kamar.deskripsi }}
                    </div>
                  </div>
                </q-slide-transition>
            </q-card-section>

            <q-card-actions>
            <q-btn unelevated @click="openDetail(kamar)" class="full-width" color="yellow-10 text-white">
                  Pesan Sekarang!
            </q-btn>
            </q-card-actions>
         </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog" v-if="dialog" position="bottom">
      <q-card style="width: 500px">
         <q-card-section>
            <div class="text-h6">Detail Pemesanan</div>
         </q-card-section>
         <q-card-section style="max-height: 50vh;" class="scroll">
            {{ activeData.namaKamar }} - Rp.{{ activeData.harga }},-
            <q-form class="q-mt-md">
               <q-input filled type="number" class="q-mb-md" v-model="jumlah" label="Masukkan Jumlah Pesanan Kamar"/>
               Rp.{{ total }},-
                <q-file color="teal" class="q-mt-md" v-model="image" filled label="Upload Bukti Pembayaran">
                  <template v-slot:prepend>
                  <q-icon name="upload" />
               </template>
               </q-file>
            </q-form>
         </q-card-section>
         <q-card-actions align="right">
            <q-btn flat label="Batal" v-close-popup/>
            <q-btn color="indigo-10" @click="prosesTransaksi" label="Proses"/>
         </q-card-actions>
      </q-card>
    </q-dialog>
 </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      autoplay: true,
      stars: 4,
      dialog: false,
      data: [],
      image: null,
      activeData: null,
      jumlah: 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('kamar/getall')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(movie => {
              return Object.assign(movie, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('dataUser')._id,
        idKamar: this.activeData._id,
        harga: this.activeData.harga,
        jumlah: this.jumlah,
        total: this.total
      }))
      this.$axios.post('order/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  },
  computed: {
    total () {
      return this.activeData.harga * this.jumlah
    }
  }
}
</script>
