const fs = require('fs');
const path = require('path');

const tailwindConfig = `
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary-container": "#d12028",
                        "secondary-container": "#fecb00",
                        "surface": "#fbf9f9",
                        "on-surface-variant": "#5c403d",
                        "primary": "#e31837",
                        "on-surface": "#1b1c1c",
                        "on-primary": "#ffffff",
                    },
                    fontFamily: {
                        "headline": ["Public Sans"],
                        "body": ["Inter"],
                        "label": ["Inter"]
                    },
                    borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1.25rem", "3xl": "1.75rem", "full": "9999px" },
                },
            },
        }
`;

function getHTML(title, headerTitle, content, activePage = "") {
    const navItems = [
        { name: "Home", href: "index.html" },
        { name: "Groceries", href: "groceries.html" },
        { name: "Fresh Produce", href: "fresh-produce.html" },
        { name: "Bakery", href: "bakery.html" },
        { name: "Offers", href: "offers.html" },
        { name: "Locations", href: "locations.html" }
    ];

    const navLinks = navItems.map(item => {
        const isActive = title.toLowerCase().includes(item.name.toLowerCase()) || (item.name === "Home" && title === "Shoprite");
        const activeClass = isActive ? 'text-primary font-black border-b-[3px] border-primary pb-1' : 'text-zinc-500 hover:text-primary transition-colors';
        return `<a class="${activeClass}" href="${item.href}">${item.name}</a>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html class="light" lang="en">
<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>${title} | Shoprite Ikeja City Mall</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="style.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    <script id="tailwind-config">${tailwindConfig}</script>
</head>
<body class="bg-surface text-on-surface font-body selection:bg-primary/20 selection:text-primary overflow-x-hidden page-fade-in">
    <header class="fixed top-0 w-full z-50 glass-nav shadow-sm dark:shadow-none">
        <nav class="flex justify-between items-center px-6 md:px-10 py-4 md:py-5 max-w-screen-2xl mx-auto font-['Public_Sans'] tracking-tight">
            <div class="flex items-center gap-2">
                <a href="index.html" class="text-3xl md:text-3xl font-black text-primary italic tracking-tighter">Shoprite</a>
            </div>
            
            <div class="hidden md:flex items-center space-x-10 text-sm font-medium">
                ${navLinks}
            </div>

            <div class="hidden md:flex items-center gap-4">
                <a href="visit-us.html" class="primary-gradient text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/30 hover:-translate-y-1 hover:shadow-primary/50 transition-all duration-300">Visit Us</a>
            </div>

            <button id="mobile-menu-btn" class="md:hidden text-primary p-2">
                <span class="material-symbols-outlined text-3xl">menu</span>
            </button>
        </nav>
    </header>

    <div id="mobile-menu" class="fixed inset-0 bg-white z-40 transform translate-x-full transition-transform duration-300 md:hidden pt-[110px] px-8 flex flex-col gap-8 text-xl font-bold font-['Public_Sans']">
        <a href="index.html" class="text-zinc-800 border-b border-zinc-100 pb-4">Home</a>
        <a href="groceries.html" class="text-zinc-800 border-b border-zinc-100 pb-4">Groceries</a>
        <a href="fresh-produce.html" class="text-zinc-800 border-b border-zinc-100 pb-4">Fresh Produce</a>
        <a href="bakery.html" class="text-zinc-800 border-b border-zinc-100 pb-4">Bakery</a>
        <a href="offers.html" class="text-zinc-800 border-b border-zinc-100 pb-4">Offers</a>
        <a href="locations.html" class="text-zinc-800 border-b border-zinc-100 pb-4">Locations</a>
        <a href="visit-us.html" class="mt-4 primary-gradient text-center text-white p-4 rounded-xl shadow-lg">Visit Us</a>
    </div>

    <main class="pt-[90px] md:pt-[110px] min-h-screen">
        <section class="bg-primary/5 py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] blob"></div>
            <div class="max-w-screen-2xl mx-auto relative z-10">
                <span class="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-label text-xs uppercase font-extrabold mb-6 tracking-widest">Ikeja City Mall Branch</span>
                <h1 class="font-headline text-4xl md:text-6xl lg:text-7xl font-black text-on-surface tracking-tighter mb-4 text-gradient">${headerTitle}</h1>
            </div>
        </section>
        <section class="py-16 md:py-24 px-6 md:px-10 max-w-screen-2xl mx-auto">
            ${content}
        </section>
    </main>

    <footer class="bg-zinc-950 w-full pt-20 pb-10 px-6 md:px-10 font-['Inter'] text-sm tracking-wide text-zinc-400">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-screen-2xl mx-auto mb-16">
            <div class="space-y-6 sm:col-span-2 md:col-span-1">
                <div class="text-2xl font-black text-white italic tracking-tighter">Shoprite</div>
                <p class="leading-relaxed">Africa's largest food retailer. Delivering top quality at the lowest prices across Nigeria.</p>
                <div class="flex gap-4">
                    <span class="material-symbols-outlined hover:text-white cursor-pointer transition-colors p-2 bg-zinc-900 rounded-lg">facebook</span>
                    <span class="material-symbols-outlined hover:text-white cursor-pointer transition-colors p-2 bg-zinc-900 rounded-lg">language</span>
                </div>
            </div>
            <div class="flex flex-col gap-5">
                <h4 class="font-bold text-white text-base">Shop with Us</h4>
                <a class="hover:text-white transition-colors" href="groceries.html">Groceries</a>
                <a class="hover:text-white transition-colors" href="bakery.html">The Bakery</a>
                <a class="hover:text-white transition-colors" href="fresh-produce.html">Fresh Produce</a>
                <a class="hover:text-white transition-colors" href="offers.html">Weekly Specials</a>
            </div>
            <div class="flex flex-col gap-5">
                <h4 class="font-bold text-white text-base">Support & Legal</h4>
                <a class="hover:text-white transition-colors" href="privacy.html">Privacy Policy</a>
                <a class="hover:text-white transition-colors" href="terms.html">Terms & Conditions</a>
                <a class="hover:text-white transition-colors" href="visit-us.html">Contact Us</a>
                <a class="hover:text-white transition-colors" href="locations.html">Store Locator</a>
            </div>
            <div class="flex flex-col gap-5">
                <h4 class="font-bold text-white text-base">Join the Team</h4>
                <a class="hover:text-white transition-colors" href="careers.html">Careers</a>
                <p class="mt-4 text-xs font-medium">Head Office: Victoria Island, Lagos</p>
                <a class="text-white hover:text-primary transition-colors font-bold" href="tel:+2348000000000">+234 800 000 0000</a>
            </div>
        </div>
        <div class="max-w-screen-2xl mx-auto pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div>© 2026 Shoprite Ikeja City Mall. All rights reserved.</div>
            <div class="flex gap-4 items-center">
                <span class="px-3 py-1 bg-zinc-900 rounded-full text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Trusted by Millions</span>
            </div>
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>`;
}

const pages = [
    {
        name: 'groceries.html',
        title: 'Groceries',
        headerTitle: 'Premium <br/>Groceries',
        content: `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div class="bg-white p-10 rounded-[2.5rem] border border-zinc-100 hover-scale group">
                <div class="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary transition-all duration-500">
                    <span class="material-symbols-outlined text-primary text-4xl group-hover:text-white">local_drink</span>
                </div>
                <h3 class="font-headline text-2xl font-black mb-4 tracking-tighter">Beverages</h3>
                <p class="text-zinc-600 mb-8 leading-relaxed">Quench your thirst with our extensive range of sodas, juices, water, and premium energy drinks.</p>
                <a href="groceries.html" class="inline-flex items-center gap-2 text-primary font-black hover:gap-4 transition-all uppercase text-xs tracking-widest">Shop Now &rarr;</a>
            </div>
            <div class="bg-white p-10 rounded-[2.5rem] border border-zinc-100 hover-scale group">
                <div class="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary transition-all duration-500">
                    <span class="material-symbols-outlined text-primary text-4xl group-hover:text-white">kitchen</span>
                </div>
                <h3 class="font-headline text-2xl font-black mb-4 tracking-tighter">Dairy & Frozen</h3>
                <p class="text-zinc-600 mb-8 leading-relaxed">Fresh milk, cheeses, artisanal yogurts, and a massive selection of ready-to-eat frozen meals.</p>
                <a href="groceries.html" class="inline-flex items-center gap-2 text-primary font-black hover:gap-4 transition-all uppercase text-xs tracking-widest">Explore Frozen &rarr;</a>
            </div>
            <div class="bg-white p-10 rounded-[2.5rem] border border-zinc-100 hover-scale group">
                <div class="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary transition-all duration-500">
                    <span class="material-symbols-outlined text-primary text-4xl group-hover:text-white">inventory_2</span>
                </div>
                <h3 class="font-headline text-2xl font-black mb-4 tracking-tighter">Pantry Staples</h3>
                <p class="text-zinc-600 mb-8 leading-relaxed">Long-lasting essentials: rice, beans, pasta, oils, and the seasonings that define Nigerian cuisine.</p>
                <a href="groceries.html" class="inline-flex items-center gap-2 text-primary font-black hover:gap-4 transition-all uppercase text-xs tracking-widest">Bulk Buy &rarr;</a>
            </div>
        </div>
    `
    },
    {
        name: 'fresh-produce.html',
        title: 'Fresh Produce',
        headerTitle: 'From Farm <br/>to Your Table',
        content: `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="relative group overflow-hidden rounded-[3rem]">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" class="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110" alt="Fresh Produce">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-10 left-10 text-white">
                    <p class="text-xs font-black uppercase tracking-widest mb-2">Quality Guarantee</p>
                    <h3 class="text-3xl font-black font-headline">Handpicked Daily</h3>
                </div>
            </div>
            <div class="space-y-10">
                <h2 class="text-5xl font-black font-headline tracking-tighter leading-tight">Straight from local <br/><span class="text-primary italic">Nigerian farms.</span></h2>
                <p class="text-xl text-zinc-600 leading-relaxed">We partner with local growers across the country to bring you fruits and vegetables that haven't spent weeks in transport. Freshness is our singular obsession.</p>
                <div class="grid grid-cols-2 gap-6">
                    <div class="p-6 bg-green-50 rounded-3xl border border-green-100">
                        <span class="material-symbols-outlined text-green-600 text-3xl mb-4">eco</span>
                        <h4 class="font-bold text-lg mb-2">100% Natural</h4>
                        <p class="text-sm text-zinc-500">Grown without harmful chemicals.</p>
                    </div>
                    <div class="p-6 bg-red-50 rounded-3xl border border-red-100">
                        <span class="material-symbols-outlined text-red-600 text-3xl mb-4">local_shipping</span>
                        <h4 class="font-bold text-lg mb-2">Daily Restock</h4>
                        <p class="text-sm text-zinc-500">New arrivals every morning.</p>
                    </div>
                </div>
                <a href="visit-us.html" class="primary-gradient text-white px-10 py-5 rounded-full font-bold inline-block luxury-shadow">Find the Best Deals</a>
            </div>
        </div>
    `
    },
    {
        name: 'bakery.html',
        title: 'Fresh Bakery',
        headerTitle: 'The Artisans <br/>at the Bakery',
        content: `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-10 order-2 lg:order-1">
                <h2 class="text-5xl font-black font-headline tracking-tighter leading-tight text-gradient">The Smell of <br/>Freshly Baked Joy.</h2>
                <p class="text-xl text-zinc-600 leading-relaxed">Our master bakers bring decades of experience to create breads and pastries that are crispy on the outside and cloud-soft on the inside. Experience the heart of Shoprite.</p>
                <ul class="space-y-6">
                    <li class="flex items-center gap-4">
                        <span class="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center"><span class="material-symbols-outlined text-primary">bakery_dining</span></span>
                        <div>
                            <p class="font-black text-lg">Signature Agege Bread</p>
                            <p class="text-zinc-500">The fluffy classic everyone loves.</p>
                        </div>
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center"><span class="material-symbols-outlined text-primary">cake</span></span>
                        <div>
                            <p class="font-black text-lg">Celebration Cakes</p>
                            <p class="text-zinc-500">Custom orders for your special moments.</p>
                        </div>
                    </li>
                    <li class="flex items-center gap-4">
                        <span class="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center"><span class="material-symbols-outlined text-primary">cookie</span></span>
                        <div>
                            <p class="font-black text-lg">Fresh Pastries</p>
                            <p class="text-zinc-500">Sweet and savory treats baked hourly.</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="relative order-1 lg:order-2 group overflow-hidden rounded-[3rem]">
                <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200" class="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110" alt="Fresh Bakery">
                <div class="absolute inset-x-8 bottom-8 bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl">
                    <p class="text-primary font-black uppercase tracking-widest text-xs mb-2">Baked Hourly</p>
                    <p class="text-zinc-800 font-bold italic">"Warm oven-fresh bread is available every single morning from 7:00 AM."</p>
                </div>
            </div>
        </div>
    `
    },
    {
        name: 'offers.html',
        title: 'Offers & Specials',
        headerTitle: 'Lower Prices <br/>You Can Trust',
        content: `
        <div class="max-w-4xl mx-auto">
            <div class="bg-primary p-12 md:p-16 rounded-[3rem] text-white relative overflow-hidden mb-16 shadow-2xl">
                <div class="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div class="relative z-10 text-center space-y-8">
                    <span class="px-6 py-2 bg-white/20 rounded-full text-xs font-black uppercase tracking-[0.2em]">Weekly Price Slash</span>
                    <h2 class="text-5xl md:text-7xl font-black font-headline tracking-tighter">UP TO 40% OFF</h2>
                    <p class="text-xl opacity-90 font-medium">Enjoy incredible discounts on bulk groceries, household items, and electronics this week at Ikeja City Mall.</p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <div class="bg-white/10 p-6 rounded-2xl border border-white/20">
                            <p class="text-3xl font-black">20%</p>
                            <p class="text-xs uppercase font-bold opacity-80 mt-1">On Beverages</p>
                        </div>
                        <div class="bg-white/10 p-6 rounded-2xl border border-white/20">
                            <p class="text-3xl font-black">15%</p>
                            <p class="text-xs uppercase font-bold opacity-80 mt-1">On Pantry</p>
                        </div>
                        <div class="bg-white/10 p-6 rounded-2xl border border-white/20">
                            <p class="text-3xl font-black">30%</p>
                            <p class="text-xs uppercase font-bold opacity-80 mt-1">On Cleaning</p>
                        </div>
                    </div>
                    <p class="text-[10px] opacity-60 uppercase tracking-widest font-bold pt-10">*OFFER EXPIRES THIS SUNDAY. VISIT STORE FOR MORE INFO.</p>
                </div>
            </div>
            
            <div class="text-center">
                <h3 class="text-3xl font-black font-headline mb-10">Sign up for our newsletter</h3>
                <div class="flex gap-4 max-w-md mx-auto">
                    <input type="email" placeholder="Your email address" class="flex-grow p-5 rounded-full bg-zinc-100 border-none focus:ring-2 focus:ring-primary font-medium">
                    <button class="primary-gradient text-white px-8 py-5 rounded-full font-bold">Join</button>
                </div>
            </div>
        </div>
    `
    },
    {
        name: 'specials.html',
        title: 'Specials',
        headerTitle: 'Today\'s <br/>Special Offers',
        content: `
        <div class="text-center py-20 px-10 bg-zinc-50 rounded-[3rem] border border-zinc-100">
            <span class="material-symbols-outlined text-7xl text-primary mb-6 animate-bounce">celebration</span>
            <h2 class="text-4xl font-black font-headline mb-4 tracking-tighter">Big Savings Daily</h2>
            <p class="text-xl text-zinc-600 mb-10">We update our special offers every day at dawn. Check our in-store flyers for the latest Price Slash!</p>
            <a href="offers.html" class="primary-gradient text-white px-10 py-5 rounded-full font-bold inline-block luxury-shadow">View Weekly Flyer</a>
        </div>
    `
    },
    {
        name: 'locations.html',
        title: 'Locations',
        headerTitle: 'Find Your <br/>Nearest Store',
        content: `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div class="space-y-12">
                <div class="bg-white p-10 rounded-[3rem] border-2 border-primary/20 shadow-xl relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-4">
                        <span class="px-4 py-1.5 bg-green-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">Main Store</span>
                    </div>
                    <h3 class="text-3xl font-black font-headline mb-4 text-gradient">Shoprite Ikeja City Mall</h3>
                    <div class="space-y-6">
                        <div class="flex items-start gap-4">
                            <span class="material-symbols-outlined text-primary p-2 bg-primary/5 rounded-xl">location_on</span>
                            <p class="text-zinc-600 font-medium">Obafemi Awolowo Way, Alausa,<br/>Ikeja, Lagos, Nigeria</p>
                        </div>
                        <div class="flex items-start gap-4">
                            <span class="material-symbols-outlined text-primary p-2 bg-primary/5 rounded-xl">schedule</span>
                            <div>
                                <p class="text-zinc-600 font-medium">Mon - Sun: 9:00 AM - 9:00 PM</p>
                                <p class="text-xs text-green-600 font-bold uppercase tracking-widest mt-1">Open Now</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <span class="material-symbols-outlined text-primary p-2 bg-primary/5 rounded-xl">call</span>
                            <a href="tel:+2348000000000" class="text-zinc-800 font-black hover:text-primary transition-colors">+234 800 000 0000</a>
                        </div>
                    </div>
                    <a href="https://www.google.com/maps/place/Shoprite/@6.6137986,3.3554221,17z/data=!3m2!4b1!5s0x103bf2d34be01e1d:0xebe991b0fbf76c5c!4m6!3m5!1s0x103b93c9e7ece127:0xc19caf1dac7dace9!8m2!3d6.6137933!4d3.357997!16s%2Fg%2F11r8cf5d7" target="_blank" class="primary-gradient text-white px-8 py-4 rounded-full font-bold w-full inline-block text-center mt-10 hover:shadow-2xl transition-all">Get Directions</a>
                </div>
                
                <div class="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 italic font-medium">
                    <p class="text-zinc-500">"The location inside Ikeja City Mall is perfect. I can do my shopping while the family explores the mall. Always organized!" - Happy Customer</p>
                </div>
            </div>
            
            <div class="h-[650px] rounded-[3rem] overflow-hidden map-container border border-zinc-100 shadow-2xl relative">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.353278949822!2d3.355422074757303!3d6.613798622241687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93c9e7ece127%3A0xc19caf1dac7dace9!2sShoprite!5e0!3m2!1sen!2sng!4v1711200000000!5m2!1sen!2sng" class="absolute inset-0 w-full h-full border-0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    `
    },
    {
        name: 'store-locator.html',
        title: 'Store Locator',
        headerTitle: 'Find Shoprite <br/>Lagos',
        content: `
        <div class="max-w-4xl mx-auto space-y-12">
            <h2 class="text-4xl font-black font-headline text-center">Enter your proximity</h2>
            <div class="relative max-w-2xl mx-auto group">
                <input type="text" placeholder="Enter your area (e.g. Ikeja, Lekki, Surulere)" class="w-full p-6 pl-14 rounded-full bg-white border-2 border-zinc-100 focus:border-primary focus:ring-0 font-medium transition-all text-lg">
                <span class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">search</span>
                <button class="absolute right-3 top-1/2 -translate-y-1/2 primary-gradient text-white px-8 py-3 rounded-full font-bold text-sm">Find</button>
            </div>
            <div class="pt-10">
                <p class="text-center text-zinc-400 font-bold uppercase tracking-widest text-xs">Recently Viewed</p>
                <a href="locations.html" class="flex items-center justify-between p-8 bg-white rounded-3xl mt-6 border border-zinc-100 hover:border-primary transition-all group">
                    <div>
                        <h4 class="font-black text-xl group-hover:text-primary transition-colors">Ikeja City Mall Branch</h4>
                        <p class="text-zinc-500">Obafemi Awolowo Way, Alausa</p>
                    </div>
                    <span class="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">east</span>
                </a>
            </div>
        </div>
    `
    },
    {
        name: 'visit-us.html',
        title: 'Visit Us',
        headerTitle: 'We\'d Love <br/>to See You',
        content: `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-10">
                <h2 class="text-5xl font-black font-headline tracking-tighter text-gradient leading-tight">Your gateway to <br/>premium grocery.</h2>
                <p class="text-xl text-zinc-600 leading-relaxed">Whether you have a question about our products, need to host an event with our catering, or just want to say hi, we're here for you.</p>
                
                <div class="space-y-6">
                    <div class="flex items-center gap-6 p-8 bg-white rounded-3xl border border-zinc-100 hover-scale">
                        <div class="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center">
                            <span class="material-symbols-outlined text-primary text-3xl">mail</span>
                        </div>
                        <div>
                            <p class="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Email Support</p>
                            <p class="text-lg font-black">hello@shoprite.com.ng</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-6 p-8 bg-white rounded-3xl border border-zinc-100 hover-scale">
                        <div class="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center">
                            <span class="material-symbols-outlined text-primary text-3xl">headphones_worker</span>
                        </div>
                        <div>
                            <p class="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">Customer Care</p>
                            <p class="text-lg font-black">+234 800 SHOPRITE</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-zinc-950 p-10 md:p-14 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                <h3 class="text-3xl font-black font-headline mb-8">Send a Message</h3>
                <form class="space-y-6" onsubmit="event.preventDefault(); alert('Message sent successfully!');">
                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase tracking-widest opacity-60">Full Name</label>
                        <input type="text" class="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-2xl focus:border-primary outline-none transition-all" placeholder="John Doe">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase tracking-widest opacity-60">Email Address</label>
                        <input type="email" class="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-2xl focus:border-primary outline-none transition-all" placeholder="john@example.com">
                    </div>
                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase tracking-widest opacity-60">How can we help?</label>
                        <textarea rows="4" class="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-2xl focus:border-primary outline-none transition-all resize-none" placeholder="Your message..."></textarea>
                    </div>
                    <button class="primary-gradient w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm mt-4 hover:shadow-primary/30 transition-all">Send Message</button>
                    <p class="text-[10px] text-center opacity-40">By clicking send, you agree to our privacy policy.</p>
                </form>
            </div>
        </div>
    `
    },
    {
        name: 'careers.html',
        title: 'Careers',
        headerTitle: 'Build Your <br/>Future Here',
        content: `
        <div class="max-w-4xl mx-auto space-y-16">
            <div class="text-center space-y-6">
                <h2 class="text-5xl font-black font-headline tracking-tighter">Join Africa\'s largest <br/>food retailer.</h2>
                <p class="text-xl text-zinc-600">Be part of a team that feeds millions. We value hard work, integrity, and a passion for customer service.</p>
            </div>
            
            <div class="space-y-6">
                <h3 class="text-2xl font-black font-headline uppercase tracking-widest text-xs opacity-60">Open Positions at Ikeja</h3>
                <div class="group p-8 bg-white rounded-3xl border border-zinc-100 cursor-pointer hover:border-primary transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h4 class="font-black text-xl mb-1">Branch Supervisor</h4>
                        <p class="text-zinc-500 font-medium">Full-time • Ikeja City Mall</p>
                    </div>
                    <button class="px-8 py-3 rounded-full border-2 border-zinc-100 font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">Apply Now</button>
                </div>
                <div class="group p-8 bg-white rounded-3xl border border-zinc-100 cursor-pointer hover:border-primary transition-all flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
                    <div>
                        <h4 class="font-black text-xl mb-1">Bakery Associate</h4>
                        <p class="text-zinc-500 font-medium">Part-time • Ikeja City Mall</p>
                    </div>
                    <button class="px-8 py-3 rounded-full border-2 border-zinc-100 font-bold">Closed</button>
                </div>
            </div>

            <div class="bg-zinc-50 p-10 rounded-[3rem] text-center border border-zinc-100">
                <p class="text-zinc-500 font-medium mb-6">Don't see a role for you? Send your CV to our talent database.</p>
                <a href="mailto:careers@shoprite.com.ng" class="text-primary font-black underline decoration-primary/20 underline-offset-8">talent@shoprite.com.ng</a>
            </div>
        </div>
    `
    },
    {
        name: 'privacy.html',
        title: 'Privacy Policy',
        headerTitle: 'Your Data <br/>& Privacy',
        content: `
        <div class="prose max-w-4xl mx-auto prose-zinc prose-lg">
            <p class="lead font-medium text-zinc-600">This Privacy Policy describes how your personal information is collected, used, and shared when you visit shoprite.com.ng (the "Site").</p>
            
            <h3 class="text-2xl font-black font-headline mt-12 mb-6">PERSONAL INFORMATION WE COLLECT</h3>
            <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.</p>
            
            <h3 class="text-2xl font-black font-headline mt-12 mb-6">HOW DO WE USE YOUR PERSONAL INFORMATION?</h3>
            <p>We use the Information that we collect generally to fulfill any orders placed through the Site. Additionally, we use this Order Information to: Communicate with you; Screen our orders for potential risk or fraud; and When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</p>
            
            <h3 class="text-2xl font-black font-headline mt-12 mb-6">CHANGES</h3>
            <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
        </div>
    `
    },
    {
        name: 'terms.html',
        title: 'Terms & Conditions',
        headerTitle: 'Terms of <br/>Service',
        content: `
        <div class="prose max-w-4xl mx-auto prose-zinc prose-lg">
            <p class="lead font-medium text-zinc-600">Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the shoprite.com.ng website (the "Service") operated by Shoprite Nigeria ("us", "we", or "our").</p>
            
            <h3 class="text-2xl font-black font-headline mt-12 mb-6">1. TERMS</h3>
            <p>By accessing the website at shoprite.com.ng, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            
            <h3 class="text-2xl font-black font-headline mt-12 mb-6">2. USE LICENSE</h3>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Shoprite Nigeria's website for personal, non-commercial transitory viewing only.</p>
            
            <h3 class="text-2xl font-black font-headline mt-12 mb-6">3. DISCLAIMER</h3>
            <p>The materials on Shoprite Nigeria's website are provided on an 'as is' basis. Shoprite Nigeria makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </div>
    `
    }
];

pages.forEach(page => {
    fs.writeFileSync(path.join(__dirname, page.name), getHTML(page.title, page.headerTitle, page.content));
    console.log(\`Generated: \${page.name}\`);
});
