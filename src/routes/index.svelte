<script>
  import AboveTheFold from "../components/AboveTheFold.svelte";
  import ProductBenefits from "../components/Product/ProductBenefits.svelte";
  import ProductTnc from "../components/Product/ProductTnc.svelte";
  import BaseButton from "../components/BaseButton.svelte";
  import IcPdf from "../components/svg/IcPdf.svelte";

  const backgroudColor = `
  linear-gradient(151deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4) 100%), linear-gradient(143deg, #f7b500 22%, #e8d556 87%), linear-gradient(321deg, #fff546 95%, #e8d556 57%);
  `;

  let tnc = [
    {
      icon: "/icons/products/care/tnc/entry-age.svg",
      description:
        "Usia masuk adalah 30 hari - 70 tahun dan perlindungan dapat diperpanjang hingga usia 75 tahun.",
      tooltip: "Usia masuk adalah usia Tertanggung ketika memulai asuransi.",
    },
    {
      icon: "/icons/products/care/tnc/payment.svg",
      description:
        "Pembayaran premi dilakukan bulanan atau tahunan, dan asuransi otomatis diperpanjang setiap tahun.",
      tooltip: "",
    },
    {
      icon: "/icons/products/care/tnc/health-history.svg",
      description: "Terdapat pertanyaan riwayat kesehatan.",
      tooltip: "",
    },
    {
      icon: "/icons/products/care/tnc/cashless.svg",
      description:
        "Metode klaim Cashless maupun Reimbursement. Tersedia 4000+ rumah sakit rekanan seluruh indonesia.",
      tooltip: "",
    },
    {
      icon: "/icons/products/care/tnc/premicost.svg",
      description:
        "Usia, pekerjaan, & metode klaim berpengaruh terhadap besarnya biaya premi.",
      tooltip: "",
    },
    {
      icon: "/icons/products/care/tnc/waiting-period.svg",
      description:
        "Tidak ada Masa tunggu untuk Penyakit Menular. Masa Tunggu kecelakaan yaitu 30 hari kalender sejak tanggal mulai kontrak asuransi.",
      tooltip: "",
    },
    {
      icon: "/icons/products/care/tnc/coverage-location.svg",
      description:
        "Cakupan wilayah pertanggungan manfaat asuransi di seluruh dunia.",
      tooltip: "",
    },
  ];
</script>

<style lang="postcss">
  .su_container {
    padding-left: 10px;
    padding-right: 10px;

    @media (min-width: 768px) {
      padding-left: 24px;
      padding-right: 24px;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<AboveTheFold bgGradient={backgroudColor} />

<section class="su_container benefits">
  <ProductBenefits />

  <BaseButton style="max-width: 314px;font-size:14px;margin:0 auto 20px;">
    CEK MANFAAT & DETAIL PLAN
  </BaseButton>
</section>

<section class="su_container tnc">
  <ProductTnc listTnc={tnc} />
  <p
    class="product_tnc__more-info"
    style="text-align:center;color: #0d294a;font-size: 14px;">
    Baca dan download informasi selengkapnya mengenai produk ini di
  </p>
  <div style="margin:20px auto 20px;padding: 0 10px; max-width:324px;">
    <BaseButton
      style="font-size:14px;
      color: #0d294a;
      border: 1px solid #0d294a;"
      bgColor={'transparent'}>
      RINGKASAN INFORMASI PRODUK
      <span slot="icon">
        <IcPdf />
      </span>
    </BaseButton>
  </div>
</section>
