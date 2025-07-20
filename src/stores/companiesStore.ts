import { defineStore } from "pinia";
import type companyInterface from "../model/interfaceModel";
import type companiesCalInterface  from '../model/interfaceModel';
//let urlBase = import.meta.env.VITE_INDEX_API_URL;
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
/*
import axios from 'axios';
export const api = axios.create({
  baseURL: "/",  // URL base de la API
  timeout: 5000,    // Tiempo de espera de la solicitud (5 segundos)
  withCredentials: false,
  headers: {
    'Content-Type':                 'application/json',
    'Access-Control-Allow-Origin':  '*',
    //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    //'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  },
})
*/
const baseUrl = import.meta.env.VITE_INDEX_API_URL;
export const useCompanies = defineStore("companies",{
    state:()=>({
        companiesData:<companyInterface[]>[],        
    }),
    actions:{
        async getAllCompanies(){
            try {
                const response = await fetch(`${baseUrl}/api/companies/`,{// /
                     method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });//import.meta.env.VITE_INDEX_API_URL+
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')){
                    const text = await response.text();
                    console.log("API Base URL:", text);
                    throw new Error(`Respuesta inválida: ${text.substring(0, 50)}...`)
                }
                this.companiesData = await response.json();
            } catch (e) {
                console.error("Error fetching data: "+e);
            }
        }
    },
})

export const useCalculate = defineStore("calculate",{
    state:()=>({
        companiesData:<companiesCalInterface[]>[],//<companiesCalInterface[]><any[]>[]
    }),
    actions:{
        async getCalcCompanies(){
            try {
                const response = await fetch(`${baseUrl}/api/calculate/`);// /
                this.companiesData = await response.json();
            } catch (e) {
                console.error("Error fetching data: "+e);
            }
        },
    },
})

/*
export const useCompanies = defineStore("companies",{
    state:()=>({
        companiesData:<companyInterface[]>[],
    }),
    actions:{
        async getAllCompanies(){
            try {
                let response = await api.get("/api/companies");
                this.companiesData = response.data;
            } catch (e) {
                console.error("Error fetching data: "+e);
            }
        }
    },
})

export const useCalculate = defineStore("calculate",{
    state:()=>({
        companiesData:<companiesCalInterface[]>[],//<companiesCalInterface[]><any[]>[]
    }),
    actions:{
        async getCalcCompanies(){
            try {
                let response = await api.get("/api/calculate");
                this.companiesData = response.data;
            } catch (e) {
                console.error("Error fetching data: "+e);
            }
        },
    },
})
*/