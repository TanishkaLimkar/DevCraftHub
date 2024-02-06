import { Analytics } from "../components/Analytics";

export const Home = () => {
    return (
        <>
            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                        <div className="hero-content">
                            <p>We are the wrolds best IT company</p>
                            <h1>WELCOME</h1>
                           <p>
                           Are you ready to take your business to the next level with
                            cutting-edge IT solutions? Look no further! At Thapa Technical,
                            we specialize in providing innovative IT services and solutions
                            tailored to meet your unique needs.
                           </p>
                           <div className="btn btn-group">
                                <a href="/contact">
                                    <button className="btn">Connect Now</button>
                                </a>
                                <a href="/services">
                                    <button className="btn secondary-btn">Learn More</button>
                                </a>
                           </div>
                        </div>
                        <div className="hero-image">
                            <img src="home1.png" alt="" width="600" height="400"/>
                        </div>
                    </div>
                </section>
            </main>
            <Analytics/>
            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                    <div className="hero-image">
                            <img src="home2.png" alt="" width="600" height="400"/>
                        </div>
                        <div className="hero-content">
                            <p>We are the wrolds best IT company</p>
                            <h1>Join us</h1>
                           <p>
                           Are you ready to take your business to the next level with
                            cutting-edge IT solutions? Look no further! At Thapa Technical,
                            we specialize in providing innovative IT services and solutions
                            tailored to meet your unique needs.
                           </p>
                           <div className="btn btn-group">
                                <a href="/contact">
                                    <button className="btn">Connect Now</button>
                                </a>
                                <a href="/services">
                                    <button className="btn secondary-btn">Learn More</button>
                                </a>
                           </div>
                        </div>

                    </div>
                </section>
            </main>
        </> 
    )
};