"use client";

import { handleSettingCookies } from "@/actions/CookieActions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  // router defined here
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // form submit handler
  const submithandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // loading state
    setLoading(true);

    // api call post method to jsonplaceholder
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: formData.get("something"),
        body: formData.get("something"),
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    setLoading(false);
    if (data) {
      // **************************************************
      // **************************************************
      // **************************************************
      // next line only changes the url and doesnt redirect the user to a desired route. when server action is commented, the behaviour will be correct

      router.push("/user");
      handleSettingCookies(data);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="h-4 flex items-center justify-center gap-4"
        onSubmit={submithandler}
      >
        <input type="text" name="something" className="rounded-md p-2" />
        <button className="bg-blue-600 rounded text-white p-2" type="submit">
          {loading ? (
            <Image
              src={"/Dual Ball-1s-201px (1).svg"}
              alt=""
              height={100}
              width={100}
            />
          ) : (
            "submit"
          )}
        </button>
      </form>
      <div className="flex flex-row gap-2">
        <Link className="bg-blue-600 rounded text-white p-2" href={"/product"}>
          product page
        </Link>
        <Link className="bg-blue-600 rounded text-white p-2" href={"/user"}>
          user page
        </Link>
      </div>
    </main>
  );
}
