import Logo from "./Logo";

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className="bg-black text-gray-300 md:px-20 px-5 py-8">
            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-8 mb-10">
                <div className="col-span-2">
                    <Logo />
                    <p className="mt-3">
                        At Blogssom, we believe that every adventure, big or small, deserves to be
                        remembered and shared.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-4">About</h3>
                    <ul className="flex flex-col space-y-3">
                        <li>About Us</li>
                        <li>Blog</li>
                        <li>Career</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-4">Support</h3>
                    <ul className="flex flex-col space-y-3">
                        <li>Contact Us</li>
                        <li>Return</li>
                        <li>FAQ</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-4">Get Updates</h3>

                    <form>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="border-b border-b-gray-300 p-1 bg-transparent focus-within:outline-none"
                        />
                    </form>
                    <div></div>
                </div>
            </div>

            <p>&copy;{year} Blogssom. All rights reserved</p>
        </div>
    );
};

export default Footer;
