"use client"

import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {ChartLineInteractive} from "@/app/(main)/meter/ChartsLine";

export default function MeterPage() {
  const params = useParams()
  const {id} = params // тепер без помилок
  const [meterName, setMeterName] = useState("")
  const [meterRecords, setMeterRecords] = useState([]);


  useEffect(() => {
      async function fetchMeters() {
        try {
          const res = await fetch(`/api/meter/${id}`, {
            method: "GET",
            credentials: "include", // важливо для кукі
          })

          if (!res.ok) throw new Error("Помилка запиту")

          const result = await res.json()
          setMeterName(result.name)
          setMeterRecords(result.records)
        } catch (err) {
          console.error("Помилка завантаження:", err)
        }
        // finally {
        //   setLoading(false)
        // }
      }

      if (id) fetchMeters()

    }, [id]
  )


  function splitDataByYear(data) {
    return data.reduce((acc, item) => {
      const year = new Date(item.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    }, {});
  }

  const yearsData = splitDataByYear(meterRecords);



  return <>
    <div className="p-6">
      <div className="flex justify-between gap-[16px] mb-4">
        <h2 className="text-2xl font-bold">{meterName}</h2>
        <p className={"text-xl"}>Днів зафіксовано: <span className={"font-bold"}>{meterRecords.length}</span></p>
      </div>
      <ul className="mt-4">

        {/*<ChartLineInteractive chartDataPrep={meterRecords}/>*/}

        {Object.entries(yearsData).map(([year, yearData]) => (
          <div key={year} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Споживання за {year} рік</h2>
            <ChartLineInteractive chartDataPrep={yearData} />
          </div>
        ))}

        {/*{meterRecords.map((rec, i) => (<div>{i}</div>)*/}
        {/*)}*/}
      </ul>
    </div>
  </>;
}
