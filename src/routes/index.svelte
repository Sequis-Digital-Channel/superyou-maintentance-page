<script>
  import AboveTheFold from "../components/AboveTheFold.svelte";
  import ProductBenefits from "../components/Product/ProductBenefits.svelte";
  import ProductTnc from "../components/Product/ProductTnc.svelte";
  import BaseButton from "../components/BaseButton.svelte";
  import IcPdf from "../components/svg/IcPdf.svelte";
  import BaseSelectMenu from "../components/BaseSelectMenu.svelte";
  import BaseInputRadio from "../components/BaseInputRadio.svelte";
  import BaseInputDate from "../components/BaseInputDate.svelte";
  import BaseProductCard from "../components/BaseProductCard.svelte";

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

  // FORM FIELD SELECT OPTION ITEMS
  const productPlan = [
    { name: "Bronze Plan", value: "bronze", selected: true },
    { name: "Silver Plan", value: "silver" },
    { name: "Gold Plan", value: "gold" },
  ];
  const insuredFor = [
    {
      name: "Saya Sendiri",
      value: "SELF",
    },
    {
      name: "Suami",
      value: "HUSBAND",
    },
    {
      name: "Istri",
      value: "WIFE",
    },
    {
      name: "Ayah Kandung",
      value: "FATHER",
    },
    {
      name: "Ibu Kandung",
      value: "MOTHER",
    },
    {
      name: "Saudara Laki laki",
      value: "BROTHER",
    },
    {
      name: "Saudara Perempuan",
      value: "SISTER",
    },
    {
      name: "Anak Laki laki",
      value: "SON",
    },
    {
      name: "Anak Perempuan",
      value: "DAUGHTER",
    },
  ];
  const protection = [
    { name: "Ya, dengan santunan tunai rawat inap 1 juta/hari", value: "YES" },
    {
      name: "Tidak, dengan santunan tunai rawat inap 1 juta/hari",
      value: "NO",
    },
  ];
  const gender = [
    { name: "Laki laki", value: "male" },
    { name: "Perempuan", value: "female" },
  ];
  const claim_method = [
    {
      val: "cashless",
      label: "Cashless",
      selected: false,
    },
    {
      val: "reimbursement",
      label: "Reimbursement",
      selected: false,
    },
  ];

  // FORM DATA CONTROLLER
  let calculationData = {
    plan: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
    protection: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
    insured_for: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
    insured_gender: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
    claim_method: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
    insured_dob: {
      val: "",
      error: {
        status: false,
        msg: "",
      },
    },
  };
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

  .premi-calculation {
    padding-top: 36px;

    &__wrapper {
      max-width: 400px;
      margin: 0 auto;
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

<section class="su_container premi-calculation">
  <h2 class="text-2xl text-center font-bold mb-10">
    Cari Tahu Biaya Perlindungan Super Care Protection
  </h2>

  <form
    class="premi-calculation__wrapper"
    style="padding-bottom: 50px;"
    on:submit|preventDefault={() => {
      console.log('FORM SUBMITTED');
    }}>
    <BaseSelectMenu
      label="Pilih Plan"
      items={productPlan}
      bind:selectedItem={calculationData.plan.val}
      error={calculationData.plan.error} />
    <br />
    <BaseSelectMenu
      label="Perlindungan COVID-19"
      items={protection}
      bind:selectedItem={calculationData.protection.val}
      error={calculationData.protection.error} />
    <br />
    <BaseSelectMenu
      label="Tertanggung"
      withtooltip={true}
      tooltiptext="Orang yang ditanggung di dalam Polis"
      items={insuredFor}
      bind:selectedItem={calculationData.insured_for.val}
      error={calculationData.insured_for.error} />
    <br />
    <BaseSelectMenu
      label="Jenis Kelamin Tertanggung"
      items={gender}
      bind:selectedItem={calculationData.insured_gender.val}
      error={calculationData.insured_gender.error} />
    <br />
    <BaseInputRadio
      name="claim_method"
      items={claim_method}
      bind:selectedItemValue={calculationData.claim_method.val} />
    <br />
    <BaseInputDate name="insured_dob" minAge={1} maxAge={60} />
    <br />
    <BaseButton style="max-width: 330px;font-size:14px;margin:30px auto 20px;">
      HITUNG BIAYA PREMI
    </BaseButton>
  </form>

  <br /><br />
  <BaseProductCard />
  <br /><br /><br /><br /><br />
</section>
