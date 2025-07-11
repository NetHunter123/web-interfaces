// import {validateRequest} from "@/auth";
import {redirect} from "next/navigation";
// import SessionProvider from "@/app/(main)/SessionProvider";
import Navbar from "@/app/(main)/Navbar";


export default async function Layout({children}) {
  // const session = await validateRequest();
  //
  // if (!session.user) {
  //   console.log("user not login");
  //   redirect("/login");
  // }

  return (

    <div className="flex max-h-screen flex-col">
      <Navbar/>
      <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
        <main className="mx-auto w-full">{children}</main>
      </div>

    </div>

  );
}
