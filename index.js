const axios = require('axios');
const fs = require('fs');

const { convertToCSV, generateDateRange, sleep } = require('./utils');

(async () => {
    // const startDate = new Date("2021-01-01")

    const startDate = new Date("2018-01-01")
    const endDate = new Date()
    const datePairs = generateDateRange(startDate, endDate)

    // const locations = ["Berlin,Germany", "Los Angeles,US"]
    const locations = ["Berlin,Germany", "Los Angeles,US", "New York,US", "Houston,US", "London,UK", "Paris,France", "Beijing,China", "Shanghai,China", "Tokyo,Japan", "Seoul,South Korea"]

    const finalResult = []
    for (const location of locations) {


        for (const datePair of datePairs) {



            //1단계 : 데이터 받아오기
            const { data, status } = await axios.post(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${datePair[0]}/${datePair[1]}`,
                {
                    'key': 'ZMM2U9XUSJ6UV37L4L49NQACY',
                    'unitGroup': 'metric',
                    'elements': 'datetime,datetimeEpoch,temp,tempmax,tempmin,precip,windspeed,windgust,feelslike,feelslikemax,feelslikemin,sealevelpressure,stations,degreedays,accdegreedays',
                    'include': 'fcst,obs,histfcst,stats,hours',
                    'options': 'preview',
                    'iconSet': 'icons2'
                },
                {
                    headers: {
                        'authority': 'weather.visualcrossing.com',
                        'accept': '*/*',
                        'accept-language': 'ko-KR,ko;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6,en-US;q=0.5',
                        'cache-control': 'no-cache',
                        'content-type': 'application/json',
                        'origin': 'https://www.visualcrossing.com',
                        'pragma': 'no-cache',
                        'referer': 'https://www.visualcrossing.com/',
                        'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-site',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
                    }
                }
            );

            const result = data.days.map(item=>({
                location :location,
                datetime : item.datetime,
                temp :item.temp,
                tempmax :item.tempmax,
                tempmin :item.tempmin,
            }))

            finalResult.push(...result)
            console.log(`finished${datePair},${location}`)
            await sleep(1000)

        }


    }

    convertToCSV(finalResult,"result")


})();