"use client"
import {useEffect, useState} from "react";
import Button from "@/components/shared/buttons/Button";


export default function Home() {
  const [meters, setMeters] = useState([]);

  useEffect(() => {
    const fetchMeters = async () => {
      try {
        const res = await fetch('/api/meters', {
          method: 'GET',
        });
        if (res.status === 401) {
          // Неавторизований – можна переадресувати на сторінку логіну
          console.log('Not authorized');
          return;
        }
        const data = await res.json();
        console.log("fetch data", data)
        setMeters(data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchMeters();
  }, [])


  return (

    <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start">

      <h2 className={"text-3xl mb-4 text-center w-full font-bold"}>Лічильники</h2>
      <ul className={"flex justify-center flex-wrap gap-[15px] w-full max-w-90% m-auto"}>
        {meters.map((meter, i) => (
          <li
            key={meter.id}
            className={"flex flex-col bg-card border w-full min-w-[280px] max-w-[300px] px-5 py-4 rounded-2xl text-lg"}>
            <span className={"mb-3 text-2xl"}>{meter.name}</span>
            Крайній замір:
            <span className={"mb-3"}>{meter.lastDate.split("T")[0]} - {meter.lastKWh} KWh</span>
            <Button className={"pb-2"} asComp={"link"} variant={"outline"} href={`/meter/${meter.id}`}>детальніше</Button>
          </li>
        ))}
      </ul>


      {/*<div className="flex justify-center p-4">*/}
      {/*  <Card className="w-full max-w-md">*/}
      {/*    <CardHeader>*/}
      {/*      <CardTitle>{`${meters[0]?.name}`}</CardTitle>*/}
      {/*    </CardHeader>*/}
      {/*    <CardContent>*/}
      {/*      <p>This card uses Shadcn UI components.</p>*/}
      {/*      <Button variant="default">Click Me</Button>*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*</div>*/}

    </main>
  );
}
