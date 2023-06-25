<template>
  <div :class="themeColor[theme] && themeColor[theme].back"
    class="pt-4 text-white text-base md:text-xl xl:text-2xl px-2 flex justify-between items-center">
    <span>테마 : {{ theme }} </span>
    <div>
      <button class="mx-1 md:mx-2" @click="theme = 'default'">
        <ul class="bg-white w-4 h-4 p-5 rounded-full relative">
          <li class="rounded-full w-3 h-3 bg-black absolute bottom-1 animate__animated animate__heartBeat"></li>
          <li class="w-full h-2 bg-yellow-400 absolute -top-3 left-0 rounded-full"></li>
          <li class="w-full h-2 bg-yellow-400 absolute -top-3 left-0 rounded-full"></li>
        </ul>
      </button>
      <button class="mx-1" @click="theme = 'orange'">
        <ul class="bg-white w-4 h-4 p-5 rounded-full relative">
          <li class="rounded-full w-3 h-3 bg-orange-500 absolute bottom-1 animate__animated animate__heartBeat"></li>
          <li class="w-full h-2 bg-yellow-400 absolute -top-3 left-0 rounded-full my-element"></li>
          <li class="w-full h-2 bg-yellow-400 absolute -top-3 left-0 rounded-full my-element"></li>
        </ul>
      </button>
      <p class="animate__animated animate__bounce text-sm text-center">Click eye!</p>
    </div>
  </div>

  <h1 class="font-extrabold text-3xl md:text-4xl text-center mt-2 font-jalnan animate__animated animate__lightSpeedInLeft"
    :class="themeColor[theme].font">
    국내&해외 택배조회 시스템
  </h1>
  <h3 class="w-4/5 md:w-3/5 xl:x-4/12 mx-auto my-20 text-2xl text-center">
    <span class="border-4 px-3 py-10 border-yellow-400 font-extrabold">배송 조회</span>
  </h3>
  <div class="w-4/5 md:w-3/5 xl:x-4/12 mx-auto mb-10 relative flex items-center pt-2 flex-wrap border-2"
    :class="themeColor[theme].border">
    <!-- <img src="./assets/images/truck-solid.svg" class="absolute move-to bottom-full w-10 h-10" alt="택배트럭" /> -->
    <div class="basis-full py-2 px-3 flex justify-center items-center text-lg">
      <span class="basis-[33%] text-sm sm:text-lg text-center mr-5">국내/국외 선택</span>
      <button @click="isBtn = 1; t_code = '04';"
        :class="[isBtn == 1 && themeColor[theme] && themeColor[theme].active, isBtn === 1 ? ' text-white' : 'text-black',]"
        class="text-lg border border-[#424874] p-1 px-3 sm:px-5 rounded hover:text-white mr-4]">
        국내
      </button>
      <button @click="isBtn = 2; t_code = '12';" :class="[isBtn == 2 && themeColor[theme] && themeColor[theme].active,
      isBtn === 2 ? ' text-white' : 'text-black',]"
        class="text-lg border border-[#424874] p-1 px-3 sm:px-5 rounded hover:text-white]">
        국외
      </button>
    </div>
    <select v-model="t_code" class="basis-full border-t py-2">
      <option v-for="e in Company" :key="e" :value="e.Code">{{ e.Name }}</option>
    </select>
    <div class="py-4 text-center basis-[100%]">
      <input type="text" placeholder="운송장번호입력" class="border-2 w-full px-5 py-2" v-model="t_invoice" @input="bindNumber"
        id="t_invoice" />
    </div>
  </div>
  <div class="text-center relative">
    <button :class="themeColor[theme] && themeColor[theme].back" class="text-white py-3 bg-yellow-400 p-6"
      @click="PostList()">조회하기</button>
    <lottie-player :src="require('@/assets/arrowDown.json')" background="transparent" speed="0.5" autoplay loop
      style="max-width: 30px; max-height: 30px" class="absolute left-[50%] -translate-x-[50%]">
    </lottie-player>
  </div> 
  <div class="marquee overflow-hidden border border-[#ccc] mt-20">
    <p class="items-center w-full text-3xl h-20 marqueeTxt mr-10 flex gap-x-20 whitespace-nowrap"><span>신속•정확 배달</span><span>신속•정확
      배달</span><span>신속•정확 배달</span><span>신속•정확 배달</span><span>신속•정확 배달</span><span>신속•정확 배달</span>
    </p>
  </div>

  <p class="text-center text-2xl text-red-500 font-bold mt-10 animate__flash animate__animated">{{ errorMsg }}</p>
  <div class="border-2 rounded-lg sm:w-[80%] sm:mx-auto mt-10" :class="themeColor[theme].border"
    v-if="isShow && errorMsg === ''" id="deliverInfo">
    <div class="w-full relative bg-parcel bg-no-repeat bg-cover bg-center sm:bg-repeat sm:bg-contain">
      <div class="w-24 text-center absolute left-[50%] translate-x-[-50%] rounded-b-full text-white bg-[#3282B8]">
        배송정보
      </div>
      <div class="flex rounded-lg justify-center py-10 flex-wrap items-center">
        <span class="text-xl basis-[25%] font-bold mr-3 mb-5">운송장 번호</span>
        <h3 class="text-2xl basis-[70%] font-bold mb-5">{{ Trackings.invoiceNo }}</h3>
        <span class="text-xl basis-[25%] font-bold mr-3">택배사</span>
        <h3 class="text-xl basis-[70%] font-bold">{{ TrackingCode[0] }}</h3>
        <span class="text-xl basis-[25%] font-bold mr-3 mt-5">상품 정보</span>
        <h3 class="text-xl basis-[70%] font-bold mt-5">{{ Trackings.itemName }}</h3>
      </div>
      <div class="my-5 flex justify-around">
        <div class="relative" v-for="level in 5" :key="level">
          <img :src="Trackings.level - 1 === level
            ? require(`@/assets/images/ic_sky_delivery_step${level}_on.png`)
            : require(`@/assets/images/ic_sky_delivery_step${level}_off.png`)" />
          <p>{{ PostListName[level - 1] }}</p>
        </div>
      </div>
      <div class="py-5">
        <div class="px-5 py-5 first:text-red-500 first:font-extrabold md:flex md:justify-between"
          v-for="(e, index) in Trackings.trackingDetails.slice().reverse()" :key="index">
          <p class="text-2xl pb-1 md:basis-[24%]">{{ e.kind }}</p>
          <p class="text-2xl pb-1 md:basis-[24%]">{{ e.where }}</p>
          <p v-if="e.telno" class="text-2xl pb-1 md:basis-[24%]">tel:{{ e.telno }}</p>
          <p v-else class="text-2xl pb-1 md:basis-[24%]">tel does not exist</p>
          <p class="text-2xl md:basis-[24%]">{{ e.timeString }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@lottiefiles/lottie-player";
import "animate.css";
import axios from "axios";
// import Tracking from "./assets/Tracking.json";
// import CarrierList from "./assets/Company.json";
export default {
  name: "App",
  data() {
    return {
      selectIndex: 0,
      isBtn: 1,
      t_key: "7HR7bRRR59HnCd2pcIloSQ",
      t_code: "04",
      t_invoice: "",
      Trackings: [],
      Carriers: [], //import해온 asset을 데이터에 담을 수 있음
      errorMsg: "",
      theme: "default",
      themeColor: {
        default: {
          back: "bg-black",
          active: "bg-black",
          text: "text-white",
          border: "border-black",
          font: "text-black",
        },
        orange: {
          back: "bg-orange-500",
          active: "bg-orange-500",
          text: "text-white",
          border: "border-orange-500",
          font: "text-orange-500",
        },
      },
      isShow: false,
      PostListName: ["상품인수", "상품이동중", "배송지도착", "배송출발", "배송완료"],
    };
  },
  methods: {
    bindNumber() {
      return (this.t_invoice = this.t_invoice.replace(/[^0-9]/g, ""));
    },
    PostList() {
      if (this.t_invoice === "") {
        this.errorMsg = "운송장 번호를 입력해주세요";
        document.querySelector("#t_invoice").focus();
        // focus()는 단,하나만 사용 가능
        return;
      }
      axios
        .get("https://info.sweettracker.co.kr/api/v1/trackingInfo", {
          params: {
            t_code: this.t_code,
            t_invoice: this.t_invoice,
            t_key: this.t_key,
          },
        })
        .then((res) => {
          if (res.data.code === "104") {
            this.errorMsg = res.data.msg;
          } else {
            this.Trackings = res.data;
            this.errorMsg = "";
            this.isShow = true;
          }
        });
    },
  },
  created() {
    axios.get("https://info.sweettracker.co.kr/api/v1/companylist?t_key=7HR7bRRR59HnCd2pcIloSQ").then((res) => {
      this.Carriers = res.data.Company;
    });
  },
  computed: {
    TrackingCode() {
      return this.Carriers.filter((e) => {
        return e.Code === this.t_code;
      }).map((e) => e.Name);
    },
    Company() {
      return this.Carriers.filter((data) => {
        if (this.isBtn == 1) {
          return data.International == "false";
        } else {
          return data.International == "true";
        }
      });
    },
  },
};
</script>

<style>
body {
  font-family: "NanumSquareNeo-Variable";
}

.marqueeTxt {
  animation: marquee1 10s linear infinite;
}

@keyframes marquee1 {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }

  /* 이동거리 */
}
</style>
