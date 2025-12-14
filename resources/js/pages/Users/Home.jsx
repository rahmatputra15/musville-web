import { Head } from "@inertiajs/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Hero from "../../components/Home/Hero";
import Projects from "../../components/Home/Projects";
import Statement from "../../components/Home/Statement";
import CompanyProfile from "../../components/Home/CompanyProfile";
import Partnership from "../../components/Home/Partnership";

const Home = () => {
    return (
        <>
            <Head title="Home - Musville">
                <meta
                    name="description"
                    content="PT. Madani Utama Selebes - The Best Shariah Development and Sustainable Company. Commercial Building, Resort & Elite Residential in Indonesia."
                />
                <meta
                    name="keywords"
                    content="musville, property, real estate, shariah, islamic housing, Indonesia, PT Madani Utama Selebes"
                />
                <meta property="og:title" content="Home - Musville" />
                <meta
                    property="og:description"
                    content="The Best Shariah Development and Sustainable Company - Commercial Building, Resort & Elite Residential in Indonesia"
                />
                <meta property="og:image" content="/assets/logos/logo.png" />
                <meta name="twitter:title" content="Home - Musville" />
                <meta
                    name="twitter:description"
                    content="The Best Shariah Development and Sustainable Company - Commercial Building, Resort & Elite Residential in Indonesia"
                />
                <meta name="twitter:image" content="/assets/logos/logo.png" />
            </Head>

            <div className="min-h-screen bg-black">
                <Navbar activePage="home" />

                <Hero />
                <Projects />
                <Statement />
                <CompanyProfile />
                <Partnership />

                <Footer />
            </div>
        </>
    );
};

export default Home;
