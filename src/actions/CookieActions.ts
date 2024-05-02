"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleSettingCookies(data: any) {
  cookies().set("CTA1", data);
  //   redirect("/user");
}
