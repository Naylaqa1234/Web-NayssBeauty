// SSG - Tips are static content
import { Metadata } from "next";
import TipsClient from "./TipsClient";
import { beautyTips, tipCategories } from "@/lib/tips-data";

export const metadata: Metadata = {
  title: "Beauty Tips — NayssBeauty",
  description: "Tips dan trik kecantikan dari para ahli untuk skincare, makeup, dan haircare terbaik.",
};

export const dynamic = "force-static";

export default function TipsPage() {
  return <TipsClient tips={beautyTips} categories={tipCategories} />;
}
