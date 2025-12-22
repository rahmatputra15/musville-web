import { Head } from "@inertiajs/react";
import UsersLayout from "../../components/Users/UsersLayout";
import Hero from "../../components/Users/Home/Hero";
import Projects from "../../components/Users/Home/Projects";
import Statement from "../../components/Users/Home/Statement";
import CompanyProfile from "../../components/Users/Home/CompanyProfile";
import Partnership from "../../components/Users/Home/Partnership";

const Home = ({
    banner_header = null,
    banners = [],
    projects = [],
    statement = null,
    profile = null,
    journeys = [],
    goals = [],
    partnerships = [],
}) => {
    // Helper untuk menentukan url gambar banner atau logo default
    const getBannerImage = () => {
        if (banner_header && banner_header.image) {
            if (typeof window !== "undefined") {
                // Jika path sudah absolute (misal sudah mengandung http), langsung return
                if (banner_header.image.startsWith("http"))
                    return banner_header.image;
                // Jika path relatif, tambahkan origin dan storage
                return (
                    window.location.origin +
                    "/storage/" +
                    banner_header.image.replace(/^\/+/, "")
                );
            }
            // SSR fallback
            return "/storage/" + banner_header.image.replace(/^\/+/, "");
        }
        // Jika tidak ada banner, pakai logo default
        return "/assets/logos/logo.png";
    };
    return (
        <>
            <Head>
                <title>Home</title>
                <meta
                    name="description"
                    content="PT. Madani Utama Selebes - The Best Shariah Development and Sustainable Company. Commercial Building, Resort & Elite Residential in Indonesia."
                />
                <meta
                    name="keywords"
                    content="musville, property, real estate, shariah, islamic housing, Indonesia, PT Madani Utama Selebes"
                />
                <meta name="author" content="PT. Madani Utama Selebes" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Home - Musville" />
                <meta
                    property="og:description"
                    content="The Best Shariah Development and Sustainable Company - Commercial Building, Resort & Elite Residential in Indonesia"
                />
                <meta property="og:image" content={getBannerImage()} />
                <meta name="twitter:title" content="Home - Musville" />
                <meta
                    name="twitter:description"
                    content="The Best Shariah Development and Sustainable Company - Commercial Building, Resort & Elite Residential in Indonesia"
                />
                <meta name="twitter:image" content={getBannerImage()} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <UsersLayout activePage="home">
                <Hero banners={banners} />
                <Projects projects={projects} />
                <Statement statement={statement} />
                <CompanyProfile
                    profile={profile}
                    journeys={journeys}
                    companyGoals={goals}
                />
                <Partnership partnerships={partnerships} />
            </UsersLayout>
        </>
    );
};

export default Home;
