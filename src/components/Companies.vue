<style>
@import "tailwindcss";
@layer components {
  .btn-primary {
    border-radius: calc(infinity * 1px);
    background-color: var(--color-violet-500);
    padding-inline: --spacing(5);
    padding-block: --spacing(2);
    font-weight: var(--font-weight-semibold);
    color: var(--color-white);
    box-shadow: var(--shadow-md);
    }
    .btn-primary:hover {
      @media (hover: hover) {
        background-color: var(--color-violet-700);
      }
    }
  }
</style>

<template>
  
<div class="flex items-center justify-center">
    
  </div>

    <div id="confirmationButton" class="hidden fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center h-screen pt-4 px-4 pb-20 text-center">
            <div class="fixed inset-0 transition-opacity" style="z-index: 1;">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div  style="z-index: 2;" class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle lg:w-sm w-full"><!-- sm:max-w-lg sm:w-full -->
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 class="text-xl leading-6 font-medium text-gray-900">
                        Información Sobre la Compañia
                    </h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">
                            {{ showAlertCompanyData == ""?"Realiza el calculo de los datos":showAlertCompanyData }}
                        </p>
                    </div>
                </div>
                <div class="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button v-on:click="showAlertEvent($event)" id="allow" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer">
                        Salir
                    </button>
                </div>
            </div>
        </div>
    </div>


<div class="flex flex-wrap justify-between w-full mb-2"   >
  <!-- CALCULATE DATA  sm -->
  <div class="md:w-fit w-full"  >
    <button 
    v-on:click="calculateData()"
      :class="{'text-[#7629c8]':!isDarkMode,'text-white':isDarkMode}"
      class="md:w-48 w-full hover:cursor-pointer group relative inline-flex items-center gap-2 border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:text-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      <span class="absolute left-0 -z-10 block h-full w-[2px] bg-[#7629c8] transition-all group-hover:w-full" ></span>
      Calcular Oportunidad
    </button>
    <button
    v-on:click="calculateDataNoInfo()"
    :class="{'text-[#7629c8]':!isDarkMode,'text-white':isDarkMode}"
    class="md:w-40 w-full md:ml-2 mr-0 hover:cursor-pointer group relative inline-flex items-center gap-2 border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:text-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
    <span class="absolute left-0 -z-10 block h-full w-[2px] bg-[#7629c8] transition-all group-hover:w-full" ></span>
    Ver los Registros
    </button>
  </div>
  <!-- FILTER -->
  <div class="block md:w-xs w-full" >
    <div class="w-full ">
        <div class="relative">
            <input
            class="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
            placeholder="Buscar..."
            v-on:keydown="filterData($event)"
            />
            <button
            class="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
            type="button"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-8 h-8 text-slate-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </button>
        </div>
    </div>
  </div>
</div>
<!-- 
==================================================================================== 
component
 -->



<!-- component -->

<div class="flex flex-col items-center">
  <div class="w-full overflow-y-auto rounded-lg border border-stone-200">
    <table class="w-full">
      <thead class="border-b border-stone-200 bg-stone-100 text-sm font-medium text-stone-600">
        <tr v-if="calc.companiesData.length > 0">
          <th class="px-2.5 py-2 text-center font-medium"><button class="cursor-pointer" v-on:click="sortCalcData('ticker',1,$event)">Desc</button> <p>Ticker</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCalcData('rating_points',0,$event)">Desc</button> <p>Rating Status</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCalcData('company',1,$event)">Desc</button> <p>Company</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCalcData('action_points',0,$event)">Asc</button> <p>Action Invest</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCalcData('brokerage',1,$event)">Desc</button> <p>Brokerage</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCalcData('target_points',0,$event)">Asc</button> <p>Target</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCalcData('time',1,$event)">Desc</button><p>Time</p></th>
        </tr>
        <tr v-if="calc.companiesData.length == 0">
          <th class="px-2.5 py-2 text-center font-medium"><button class="hover:cursor-pointer" v-on:click="sortCompaniesData('ticker',0,$event)">Desc</button>  <p>Ticker</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCompaniesData('target_from',0,$event)">Desc</button><p>Target From</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCompaniesData('target_to',0,$event)">Desc</button><p>Target To</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCompaniesData('company',0,$event)">Desc</button><p>Company</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCompaniesData('action',0,$event)">Desc</button><p>Action</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCompaniesData('brokerage',0,$event)">Desc</button><p>Brokerage</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCompaniesData('rating_from',0,$event)">Desc</button><p>Rating From</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCompaniesData('rating_to',0,$event)">Desc</button><p>Rating To</p></th>
          <th class="px-2.5 py-2 text-center font-medium border-l-2"><button class="cursor-pointer" v-on:click="sortCompaniesData('time',0,$event)">Desc</button><p>Time</p></th>
        </tr>
      </thead>
      <tbody v-if="calc.companiesData.length > 0" :class="{  'text-cyan-300': isDarkMode,'text-black': !isDarkMode }" class="group text-sm" >
        <tr v-on:click="showAlertEvent($event,item)" id="openModal" :class="{  'text-cyan-300 hover:bg-cyan-950': isDarkMode,'text-black hover:bg-blue-50': !isDarkMode }" class="border-b border-stone-200 last:border-0 " v-for="(item, index) in calc.companiesData" :key="index" >
          <td><p class="p-3">{{ item.Info.ticker }}</p></td>

          <td><p class="p-3">{{ ratingPointsInvest(item.rating_points) }}</p></td>

          <td><p class="p-3">{{ item.Info.company }}</p></td>

          <td><p class="p-3">{{ actionInvet(item.action_points) }}</p></td>

          <td><p class="p-3">{{ item.Info.brokerage }}</p></td>

          <td><p class="p-3">{{ targetPointsInvest(item.target_points) }}</p></td>
          
          <td><p class="p-3">{{ formatDate(item.Info.time)  }}</p></td>          
        </tr>
      </tbody>
        <tbody v-if="calc.companiesData.length == 0" :class="{  'text-cyan-300': isDarkMode,'text-black': !isDarkMode }" class="group text-sm" >
        <tr v-on:click="showAlertEvent($event,item)" id="openModal" :class="{  'text-cyan-300 hover:bg-cyan-950': isDarkMode,'text-black hover:bg-blue-50': !isDarkMode }" class="border-b border-stone-200 last:border-0 " v-for="(item, index) in info.companiesData" :key="index"  >
          <td><p class="p-3">{{ item.ticker }}</p></td>
          <td><p class="p-3">{{ parserNumbers(item.target_from) }}</p></td>
          <td><p class="p-3">{{ parserNumbers(item.target_to) }}</p></td>
          <td><p class="p-3">{{ item.company }}</p></td>
          <td><p class="p-3">{{ item.action }}</p></td>
          <td><p class="p-3">{{ item.brokerage }}</p></td>
          <td><p class="p-3">{{ item.rating_from }}</p></td>
          <td><p class="p-3">{{ item.rating_to }}</p></td>
          <td><p class="p-3">{{ formatDate(item.time) }}</p></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- <div class="flex items-center justify-between mt-6"  >
        <a  v-on:click="pageableData($event)" id="prev"
         class="cursor-pointer flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <svg id="prev" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            <span id="prev" >
                Previous
            </span>
        </a>

        <div v-on:click="pageableData($event)" id="positionSelector" 
        class="items-center hidden md:flex gap-x-3">
            <a id="num" class="cursor-pointer px-2 py-1 text-sm" :class="{'text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60':currentPage==1,'text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100':currentPage==1}">1</a>
            <a id="num" class="cursor-pointer px-2 py-1 text-sm" :class="{'text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60':currentPage==2,'text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100':currentPage==2}">2</a>
            <a id="num" class="cursor-pointer px-2 py-1 text-sm" :class="{'text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60':currentPage==3,'text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100':currentPage==3}">3</a>
        </div>

        <a v-on:click="pageableData($event)" id="next"
        class="cursor-pointer flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span id="next">
                Next
            </span>

            <svg id="next" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
        </a>
    </div> -->
 
</div>

<!--
component 
==================================================================================== 
-->

<p :class="{'text-purple-300':!isDarkMode,'text-gray-500':isDarkMode}" 
class="text-xs mt-5 text-right"
>Version: {{ version }}</p>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {useCompanies} from '../stores/companiesStore'
import {useCalculate} from '../stores/companiesStore'
import type companyInterface  from '../model/interfaceModel';
import type companiesCalInterface  from '../model/interfaceModel';
import { ref } from 'vue';

let version = import.meta.env.VITE_VERSION
let info = useCompanies();
let infoAux = <companyInterface[]><any[]>[];

onMounted(async ()=>{
    await info.getAllCompanies();
    //pageableDataAsync("novalue")
});

function parserNumbers(numberData:number) {
    return "$"+parseFloat(numberData.toString()).toFixed(2)
}

function formatDate(dateData:Date) {
    let dateDataSplited = dateData.toString().split("T");
    let houreSplited = dateDataSplited[1].replace("Z","")
    return dateDataSplited[0]+" "+houreSplited
}

function filterDataAsync(item:any) {
  if( calc.companiesData.length == 0)if( infoAux.length == 0)infoAux = info.companiesData;
  if( calc.companiesData.length == 0)info.companiesData = infoAux.filter((val)=>{
      return val.company.toUpperCase().includes(item.target.value.toUpperCase())||
      val.ticker.toUpperCase().includes(item.target.value.toUpperCase())
  })
  if( calc.companiesData.length != 0)if( calcAux.length == 0)calcAux = calc.companiesData;
  if( calc.companiesData.length != 0)calc.companiesData = calcAux.filter((val)=>{
      return val.Info.company.toUpperCase().includes(item.target.value.toUpperCase())||
      val.Info.ticker.toUpperCase().includes(item.target.value.toUpperCase())
  })
}

let filterDataAsyncData = setTimeout(() => {}, 1);

function filterData(item:any) {
    clearTimeout(filterDataAsyncData)
    filterDataAsyncData = setTimeout(() => {
      filterDataAsync(item);
    }, 750);
    if(item.key == 'Enter'){
      clearTimeout(filterDataAsyncData)
      filterDataAsync(item);
    }  
}

////////////// CALCULATE INFO
let calc = useCalculate();
let calcAux:companiesCalInterface[] = [];

const calculateData = () => {
    calc.getCalcCompanies();
    //pageableDataAsync("novalue")
};

const calculateDataNoInfo = async () => {
    calc.companiesData = []
} 
////////////////// DARKMODE DETECTOR

import { onBeforeUnmount } from 'vue';

const isDarkMode = ref(false);
const detectSystemTheme = () => {
  isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/*
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', String(isDarkMode.value));
};*/

onMounted(() => {
  detectSystemTheme();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectSystemTheme);
});

onBeforeUnmount(() => {
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', detectSystemTheme);
});

const savedTheme = localStorage.getItem('darkMode');
if (savedTheme !== null) {
  isDarkMode.value = savedTheme === 'true';
}
///////////////// BUTON POP UP EVENT
let showAlertCompanyData = ref<string>(""); 
function showAlertEvent(e:any,item:any=null) {
    //let test:companiesCalInterface
    if(item)if(item.Info){
        showAlertCompanyData.value = item.summary
    } 
    //Open pop up
    let confirmationButton:any = document.getElementById("confirmationButton");
    confirmationButton.classList.remove("hidden");  
    //Close pop up
    if (e.target.id === "allow" || e.target.id === "deny") {
      confirmationButton.classList.add("hidden");
      showAlertCompanyData.value = "";
    }
}
/////////////// SORTER

function sortCompaniesData(item:any,post:any,e:any) {
  if( infoAux.length == 0)infoAux = info.companiesData;
    let orderType = e.target.textContent;
      info.companiesData = infoAux.sort(function (a:any,b:any){
        return gobalSorter(post,item,orderType,a,b)
      })
    e.target.textContent = orderType == "Asc"?"Desc":"Asc"
}

function sortCalcData(item:any,post:any,e:any){
    if( calcAux.length == 0)calcAux = calc.companiesData;
    let orderType = e.target.textContent;
      calc.companiesData = calcAux.sort(function (a:any,b:any) {
        return gobalSorter(post,item,orderType,a,b)
      })
    e.target.textContent = orderType == "Asc"?"Desc":"Asc"
}

function gobalSorter(post:any,item:any,orderType:any,a:any,b:any){
        if(post == 0){
          if(a[item] > b[item]){
            if(orderType == "Asc")return -1;
            return 1
          }
          if(a[item] < b[item]){
            if(orderType == "Asc")return 1;
            return -1
          }
        }
        if(post == 1){
          if(a["Info"][item] > b["Info"][item]){
            if(orderType == "Asc")return -1;
            return 1
          }
          if(a["Info"][item] < b["Info"][item]){
            if(orderType == "Asc")return 1;
            return -1
          }
        }
        return 0
      }
//////////////// DESCRIPTIONS
function actionInvet(item:number) {
    if(item == 3)return "EXCELENTE RENTABILIDAD"
    if(item == 2)return "MUY RENTABLE"
    if(item == 1.5)return "RENTABLE"
    if(item == 0)return "NEUTRAL"
    if(item == -1)return "PERDIDA"
    if(item == -2)return "GRAN PERDIDA"
}
function ratingPointsInvest(item:number) {
    if(item >= 3 && item < 6)return "ES BAJO EL RATING"
    if(item >= 6 && item  < 9)return "ES MEDIANAMENTE BAJO EL RATING"
    if(item >= 9 && item  < 13)return "ES NEUTRO EL RATING"
    if(item >= 13 && item < 15)return "ES MEDIANAMENTE ALTO EL RATING"
    if(item >= 15 && item < 24)return "ES ALTO EL RATING"
    if(item >= 24 && item < 26)return "ES MUY ALTO EL RATING"
    if(item >= 26 )return "ES EL MEJOR RATING"
}
function targetPointsInvest(item:number) {
  if (item > 0 ) return "PRECIO OBJETIVO AUMENTÓ"
  if (item == 0) return "PRECIO OBJETIVO NO CAMBIA"
  if (item < 0 ) return "PRECIO OBJETIVO DISMINUYÓ"
  
}
//////////////// TODO PAGEABLE CONTENT [comming soon]
/*
let currentPage = ref<number>(1);
let dataRange = 5;
let limit = Number((infoAux.length/dataRange).toPrecision(3))
function pageableData(e:any,start:any=0) {
  let valueName = e,currentPageAux = currentPage,limitAux = 0;
  if(Number((infoAux.length/dataRange).toPrecision(3)) < start){
    limitAux =  Number((infoAux.length/dataRange).toPrecision(3));
  }else{
    limitAux = start
  }
  if(e != "novalue"){
    if(e.target)valueName = e.target.id.trim();
    if(valueName == "prev"){
      if(currentPageAux.value>1)currentPageAux.value--;
    }
    if(valueName == "next"){
      if(currentPageAux.value <  limitAux)currentPageAux.value++;
    }
    if(e.target.id == "num" )currentPageAux.value = Number(e.target.textContent);
  }else{
    infoAux = [...info.companiesData];
    calcAux = calc.companiesData;
    limitAux =  Number((infoAux.length/dataRange).toPrecision(3));
  }
  if(calc.companiesData.length == 0){

    info.companiesData = (infoAux.slice(((infoAux.length/Number(limitAux))*(currentPageAux.value-1)),
  ((infoAux.length/limitAux)*currentPageAux.value)));
  }
  if(calc.companiesData.length > 0){
    limit = Number((calcAux.length/dataRange).toPrecision(3));
    calc.companiesData = (calcAux.slice(((calcAux.length/Number(limitAux))*(currentPageAux.value-1)),
  ((calcAux.length/limitAux)*currentPageAux.value)));
} 
}

const pageableDataAsync = async (e:any) => {
  pageableData(e)
}
*/
</script>