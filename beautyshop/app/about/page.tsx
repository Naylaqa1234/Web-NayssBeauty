// SSG - This page is fully static
import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us — NayssBeauty",
  description: "Cerita di balik brand kecantikan NayssBeauty yang hadir untuk memancarkan kecantikan alami Anda.",
};

// Fully static — no revalidation needed
export const dynamic = "force-static";

const teamMembers = [
  {
    name: "Amara Sutrisno",
    role: "Founder & CEO",
    avatar: "A",
    bio: "Dermatologist berpengalaman 10 tahun yang mendirikan NayssBeauty dengan misi membuat produk kecantikan premium lebih terjangkau.",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    name: "Bella Maharani",
    role: "Head of R&D",
    avatar: "B",
    bio: "Ahli kosmetik dengan latar belakang kimia farmasi. Bertanggung jawab atas inovasi formula produk Lumière.",
    gradient: "from-fuchsia-400 to-pink-500",
  },
  {
    name: "Citra Wulandari",
    role: "Creative Director",
    avatar: "C",
    bio: "Desainer berbakat yang menciptakan identitas visual Lumière yang ikonik dan estetik di setiap produk.",
    gradient: "from-rose-400 to-pink-400",
  },
  {
    name: "Dinda Pramesti",
    role: "Beauty Consultant",
    avatar: "D",
    bio: "MUA profesional dengan 8 tahun pengalaman. Memimpin tim konsultan kecantikan Lumière untuk pelayanan pelanggan.",
    gradient: "from-amber-400 to-rose-400",
  },
];

const milestones = [
  { year: "2018", title: "NayssBeauty Berdiri", desc: "Brand lahir dari passion seorang dermatologis" },
  { year: "2019", title: "1000 Pelanggan", desc: "Milestone pertama yang membuktikan kepercayaan pasar" },
  { year: "2021", title: "Ekspansi Produk", desc: "Meluncurkan lini makeup dan haircare" },
  { year: "2022", title: "10K+ Community", desc: "Komunitas beauty lovers Lumière berkembang pesat" },
  { year: "2023", title: "Sertifikasi BPOM", desc: "Semua produk tersertifikasi resmi BPOM" },
  { year: "2024", title: "500+ Produk", desc: "Kini hadir dengan 500+ koleksi beauty premium" },
];

export default function AboutPage() {
  return <AboutClient teamMembers={teamMembers} milestones={milestones} />;
}
