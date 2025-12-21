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
                <meta
                    property="og:image"
                    content={
                        typeof window !== "undefined"
                            ? window.location.origin +
                              "/storage/" +
                              banner_header.image
                            : "/assets/logos/logo.png"
                    }
                />
                <meta name="twitter:title" content="Home - Musville" />
                <meta
                    name="twitter:description"
                    content="The Best Shariah Development and Sustainable Company - Commercial Building, Resort & Elite Residential in Indonesia"
                />
                <meta
                    name="twitter:image"
                    content={
                        typeof window !== "undefined"
                            ? window.location.origin +
                              "/storage/" +
                              banner_header.image
                            : "/assets/logos/logo.png"
                    }
                />
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
