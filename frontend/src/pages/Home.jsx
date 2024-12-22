import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import "./Home.scss"
import Featured from '../components/featured/Featured';

const Home = () => {
    const [showAlert, setShowAlert] = useState(true);
    return (
        <div>
            <Featured />
            {/* <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Bakery}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Bakery}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Bakery}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}
            <div className="features">
                <div className="container">
                    <div className="item">
                        <h1>A whole world of freelance talent at your fingertips</h1>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            The best for every budget
                        </div>
                        <p>
                            Find high-quality services at every price point. No hourly rates,
                            just project-based pricing.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Quality work done quickly
                        </div>
                        <p>
                            Find the right freelancer to begin working on your project within
                            minutes.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Protected payments, every time
                        </div>
                        <p>
                            Always know what you'll pay upfront. Your payment isn't released
                            until you approve the work.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            24/7 support
                        </div>
                        <p>
                            Find high-quality services at every price point. No hourly rates,
                            just project-based pricing.
                        </p>
                    </div>
                    <div className="item">
                        <video src="./img/companyculture.mp4" controls />
                    </div>
                </div>
            </div>
            <div className="explore">
                <div className="container">
                    <h1>Explore the marketplace</h1>
                    <div className="items">
                        <div className="item">
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                                alt=""
                            />
                            <div className="line"></div>
                            <span>Graphics & Design</span>
                        </div>
                        <div className="item">
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                                alt=""
                            />
                            <div className="line"></div>

                            <span>Digital Marketing</span>
                        </div>
                        <div className="item">
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                                alt=""
                            />
                            <div className="line"></div>
                            <span>Writing & Translation</span>
                        </div>
                        <div className="item">
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                                alt=""
                            />
                            <div className="line"></div>
                            <span>Video & Animation</span>
                        </div>
                        <div className="item">
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                                alt=""
                            />
                            <div className="line"></div>
                            <span>Music & Audio</span>
                        </div>
                        <div className="item">
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                                alt=""
                            />
                            <div className="line"></div>
                            <span>Programming & Tech</span>
                        </div>
                        <div className="item">
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                                alt=""
                            />
                            <div className="line"></div>
                            <span>Business</span>
                        </div>
                        <div className="item">
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                                alt=""
                            />
                            <div className="line"></div>
                            <span>Lifestyle</span>
                        </div>
                        <div className="item">
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                                alt=""
                            />
                            <div className="line"></div>
                            <span>Data</span>
                        </div>
                        <div className="item">
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                                alt=""
                            />
                            <div className="line"></div>
                            <span>Photography</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="features dark">
                <div className="container">
                    <div className="item">
                        <h1>
                            SkilHire
                        </h1>
                        <h1>
                            A business solution designed for <i>teams</i>
                        </h1>
                        <p>
                            Upgrade to a curated experience packed with tools and benefits,
                            dedicated to businesses
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Connect to freelancers with proven business experience
                        </div>

                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Get matched with the perfect talent by a customer success manager
                        </div>

                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Manage teamwork and boost productivity with one powerful workspace
                        </div>
                        <button>Explore SkilHire</button>
                    </div>
                    <div className="item">
                        <img
                            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="how-it-works">
                <div className="container">
                    <h1>How It Works</h1>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>1. Post a Job</Accordion.Header>
                            <Accordion.Body>
                                Tell us about your project and the skills you need. You'll create a clear job description that outlines the work you're looking for.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>2. Choose a Freelancer</Accordion.Header>
                            <Accordion.Body>
                                Review proposals from freelancers and select the best fit for your project. You can communicate with them before making your choice.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>3. Get Work Done</Accordion.Header>
                            <Accordion.Body>
                                Collaborate with the freelancer and complete your project with ease. You'll have tools to manage the workflow, and your payment is only released once you're satisfied.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default Home;