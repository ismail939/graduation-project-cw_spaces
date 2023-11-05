import Footer from "../../components/Footer";
import Image1 from "../../components/images/cover.jpg"
import Image2 from "../../components/images/offer1.jpg"
import Slider from "../../components/Slider";
import { Link } from "react-router-dom";
import { Star } from "react-bootstrap-icons";
function Home() {
    return (
        <>
            <div className="w-4/5 mx-auto mt-[70px] h-[500px] relative bg-cover" style={{ backgroundImage: `url(${Image1})` }}>
                <div className="bg-black w-full h-full opacity-50 absolute"></div>
                <div className="w-full h-full text-white text-center absolute">
                    <div className="w-3/4 h-full mx-auto mt-[150px] max-sm:w-full max-sm:px-2">
                        <h2 className="text-5xl font-bold">Our Vision</h2>
                        <p className="mt-4 text-lg">We create a borderless and inclusive work environment, where individuals and teams can connect, collaborate, and thrive regardless of their physical location</p>
                    </div>
                </div>
            </div>
            <Slider />
            <div className="w-4/5 mx-auto mt-[70px]">
                <h2 className="text-left mb-8 text-4xl font-bold">Discover</h2>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                            
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative">
                            <img className="w-full" src={Image2} alt="Sunset in the mountains"></img>
                            <Link><div className="h-full w-full absolute inset-0 duration-500 hover:bg-black hover:opacity-50"></div></Link>
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;