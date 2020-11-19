<script>
  import InfoItem from "../InfoItem.svelte";
  import Tooltip from "../Tooltip.svelte";

  export let benefits_group = [
    {
      title: {
        name: "Perlindungan untuk Penyakit Menular",
        tooltip:
          "Penyakit menular/infeksi yang dimaksud dalam Super Care antara lain Demam Berdarah, Tifus, Kolera, Difteri; Rabies, Tetanus, Cacar Air, Flu Burung yang disebabkan oleh virus influenza H5N1, H9N2, H7N7, H7N9, atau H1N1, Gondongan, Rubella, Tuberkulosis, Campak, Malaria, Infeksi Antraks, Demam Kuning, Penyakit Pes, Melioidosis, Penyakit Legionnaires, Chikungunya, Ensefalitis virus Nipah, Ensefalitis virus Jepang, Variant Creutzfeldt-Jakob disease (vCJD) atau “penyakit sapi gila”, SARS MERS-CoV, Virus Zika, Ebola, Hand Foot and Mouth Disease (HFMD), COVID-19 (Pilihan) dan infeksi lainnya.",
      },
      benefits: [
        {
          title: {
            name: "Biaya Perawatan Rumah Sakit",
            tooltip: "",
          },
          description:
            "Penggantian biaya medis rawat inap dan/atau rawat jalan hingga Rp50 Juta per Kecelakaan.  Jika mengalami Kecelakaan di luar Indonesia, maka akan mendapat penggantian biaya medis 2x dari batas manfaat.",
          icon: "/icons/products/care/benefits/biaya-rs.svg",
        },
        {
          title: {
            name: "Perlindungan COVID-19 ",
            tooltip: "",
          },
          description:
            "Penggantian biaya medis Rawat Inap dan/atau Rawat Jalan hingga Rp50 Juta bila didiagnosis COVID-19 atau santunan tunai harian rawat inap sebesar Rp1 Juta per hari dengan maksimal perawatan 30 Hari per Tahun Polis.",
          icon: "/icons/products/care/benefits/covid-cover.svg",
        },
        {
          title: {
            name: "Santunan Kematian",
            tooltip: "",
          },
          description:
            "Mendapat Uang Pertanggungan hingga Rp200 Juta apabila meninggal dunia akibat kecelakaan selama Masa Pertanggungan.",
          icon: "/icons/products/care/benefits/santunan-kematian.svg",
        },
      ],
    },
    {
      title: {
        name: "Perlindungan untuk Kecelakaan",
        tooltip:
          "Kecelakaan adalah suatu peristiwa atau kejadian mendadak dan tak terduga yang terjadi selama masa berlakunya asuransi yang menyebabkan cedera. Kecelakaan yang dimaksud dalam Super Care yaitu akibat terorisme, pembajakan, pembunuhan, penyerangan, bencana alam, menghirup asap, asap beracun, gas, tenggelam secara tidak sengaja,keracunan makanan, partisipasi dalam kegiatan rekreasi dan/atau olahraga apapun. Baca info selengkapnya pada Ringkasan Informasi Produk.",
      },
      benefits: [
        {
          title: {
            name: "Biaya Perawatan Rumah Sakit",
            tooltip: "",
          },
          description:
            "Penggantian biaya medis rawat inap dan/atau rawat jalan hingga Rp50 Juta per Kecelakaan.  Jika mengalami Kecelakaan di luar Indonesia, maka akan mendapat penggantian biaya medis 2x dari batas manfaat.",
          icon: "/icons/products/care/benefits/biaya-rs.svg",
        },
        {
          title: {
            name: "Biaya Pembedahan Gigi & Bedah Rekonstruktif",
            tooltip:
              "Bedah rekonstruktif adalah tindakan bedah yang dilakukan untuk mengembalikan penampilan atau fungsi semula dari bagian tubuh tertentu dan dilakukan untuk memperbaiki cacat pada tubuh yang disebabkan oleh penyakit atau trauma.",
          },
          description:
            "Penggantian biaya pembedahan gigi dan/atau bedah rekonstruktif pada wajah, leher, kepala, atau dada hingga Rp10 Juta per Kecelakaan.",
          icon: "/icons/products/care/benefits/bedah-gigi.svg",
        },
        {
          title: {
            name: "Biaya Fisioterapi/ Pengobatan Tradisional Tiongkok",
            tooltip:
              "Pengobatan Tradisional Tiongkok yang mencakup akupuntur, pengobatan herbal, bekam, dan/atau pijat tuina yang dilakukan secara Rawat Jalan oleh Ahli praktisi pengobatan tradisional tiongkok di Rumah Sakit atau Klinik yang mempunyai fasilitas lengkap dan kualifikasi sah untuk pengobatan tradisional tiongkok",
          },
          description:
            "Penggantian biaya Fisioterapi dan/atau Pengobatan Tradisional Tiongkok yang diperlukan secara medis hingga Rp5 Juta per Kecelakaan.",
          icon: "/icons/products/care/benefits/fisioterapi.svg",
        },
        {
          title: {
            name: "Biaya Alat Bantu Mobilitas/Prostesis",
            tooltip: "",
          },
          description:
            "Penggantian biaya alat bantu seperti kursi roda, lengan atau kaki palsu, dan kruk hingga Rp5 Juta per Tahun Polis bila mengalami kecelakaan.",
          icon: "/icons/products/care/benefits/alatbantu.svg",
        },
        {
          title: {
            name: "Manfaat Modifikasi Tempat Tinggal",
            tooltip: "",
          },
          description:
            "Mendapat biaya modifikasi rumah hingga Rp15 Juta untuk 1x per Jiwa, jika menderita cacat permanen karena kecelakaan.",
          icon: "/icons/products/care/benefits/housemodif.svg",
        },
      ],
    },
  ];
</script>

<style lang="postcss">
  .product_benefits {
    max-width: 1280px;
    margin: 0 auto;
    padding: 36px 0;

    &__title {
      text-align: center;
      font-weight: bold;
      font-size: 22px;
      margin-bottom: 40px;
      color: #0d294a;

      @media (min-width: 768px) {
        font-size: 28px;
      }
    }

    .benefit_group__title {
      font-size: 20px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 32px;
      color: #0d294a;

      @media (min-width: 768px) {
        font-size: 24px;
      }
    }

    .benefit_wrapper {
      margin-bottom: 60px;
      &:last-child {
        margin-bottom: 0;
      }
      @media (min-width: 640px) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 3rem 10%;

        &:last-child {
          margin-bottom: 40px;
        }
      }
    }
  }
</style>

<div class="product_benefits">
  <h1 class="product_benefits__title">Manfaat apa yang akan kamu dapatkan?</h1>

  {#each benefits_group as bene_section, i (`${i}${bene_section.title.name}`)}
    {#if bene_section.title.name !== ''}
      <h2 class="benefit_group__title">
        {bene_section.title.name}
        {#if bene_section.title.tooltip !== ''}
          <Tooltip indentifier={`head-tooltip-${i}`}>
            {bene_section.title.tooltip}
          </Tooltip>
        {/if}
      </h2>
    {/if}

    <div class="benefit_wrapper">
      {#each bene_section.benefits as { icon, title, description }, i (`${description}${i}`)}
        <InfoItem {icon} {title} {description} key={`bene-tooltip-${i}`} />
      {/each}
    </div>
  {/each}
</div>
