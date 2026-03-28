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

function getHTML(title, headerTitle, content) {
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
<body class="bg-surface text-on-surface font-body selection:bg-primary/20 selection:text-primary overflow-x-hidden">
    <header class="fixed top-0 w-full z-50 glass-nav shadow-sm dark:shadow-none">
        <nav class="flex justify-between items-center px-6 md:px-10 py-4 md:py-5 max-w-screen-2xl mx-auto font-['Public_Sans'] tracking-tight reveal">
            <div class="flex items-center gap-2">
                <a href="index.html" class="text-3xl md:text-3xl font-black text-primary italic tracking-tighter">Shoprite</a>
            </div>
            
            <div class="hidden md:flex items-center space-x-10 text-sm font-medium">
                <a class="text-zinc-500 hover:text-primary transition-colors" href="index.html">Home</a>
                <a class="text-zinc-500 hover:text-primary transition-colors" href="groceries.html">Groceries</a>
                <a class="text-zinc-500 hover:text-primary transition-colors" href="fresh-produce.html">Fresh Produce</a>
                <a class="text-zinc-500 hover:text-primary transition-colors" href="bakery.html">Bakery</a>
                <a class="text-zinc-500 hover:text-primary transition-colors" href="offers.html">Offers</a>
                <a class="text-zinc-500 hover:text-primary transition-colors" href="locations.html">Locations</a>
            </div>

            <div class="hidden md:flex items-center gap-4">
                <a href="locations.html" class="primary-gradient text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/30 hover:-translate-y-1 hover:shadow-primary/50 transition-all duration-300">Visit Us</a>
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
        <a href="locations.html" class="mt-4 primary-gradient text-center text-white p-4 rounded-xl shadow-lg">Visit Us</a>
    </div>

    <main class="pt-[90px] md:pt-[110px] min-h-screen pb-20">
        <section class="bg-primary/5 py-12 md:py-20 px-6 md:px-10">
            <div class="max-w-screen-2xl mx-auto">
                <h1 class="font-headline text-4xl md:text-5xl lg:text-6xl font-black text-on-surface tracking-tighter mb-4">${headerTitle}</h1>
            </div>
        </section>
        <section class="py-12 px-6 md:px-10 max-w-screen-2xl mx-auto">
            ${content}
        </section>
    </main>

    <footer class="bg-zinc-950 w-full pt-16 md:pt-20 pb-10 px-6 md:px-10 font-['Inter'] text-sm tracking-wide text-zinc-400">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 max-w-screen-2xl mx-auto mb-12 md:mb-16">
            <div class="space-y-6 sm:col-span-2 md:col-span-1">
                <div class="text-2xl font-black text-white italic tracking-tighter">Shoprite</div>
                <p class="leading-relaxed">Africa's largest food retailer. Delivering top quality at the lowest prices.</p>
            </div>
            <div class="flex flex-col gap-4">
                <h4 class="font-bold text-white text-base">Contact</h4>
                <a class="hover:text-white transition-colors duration-300" href="tel:+2348000000000">Call: +234 800 000 0000</a>
                <p>Store Hours: 9 AM - 9 PM</p>
            </div>
            <div class="flex flex-col gap-4">
                <h4 class="font-bold text-white text-base">Legal</h4>
                <a class="hover:text-white transition-colors duration-300" href="privacy.html">Privacy Policy</a>
                <a class="hover:text-white transition-colors duration-300" href="terms.html">Terms & Conditions</a>
            </div>
            <div class="flex flex-col gap-4">
                <h4 class="font-bold text-white text-base">Quick Links</h4>
                <a class="hover:text-white transition-colors duration-300" href="careers.html">Careers</a>
                <a class="hover:text-white transition-colors duration-300" href="locations.html">Store Locator</a>
                <a class="hover:text-white transition-colors duration-300" href="offers.html">Specials</a>
            </div>
        </div>
        <div class="max-w-screen-2xl mx-auto pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div>© 2026 Shoprite Ikeja City Mall. All rights reserved.</div>
            <div class="flex gap-6">
                <span class="material-symbols-outlined hover:text-white cursor-pointer transition-colors">language</span>
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
        headerTitle: 'Groceries & Pantry',
        content: `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-3xl border border-zinc-100 hover-scale">
                <span class="material-symbols-outlined text-primary text-4xl mb-6">local_drink</span>
                <h3 class="font-headline text-2xl font-bold mb-3">Beverages</h3>
                <p class="text-zinc-600 mb-6">Quench your thirst with our extensive range of sodas, juices, water, and energy drinks.</p>
                <a href="groceries.html" class="text-primary font-bold">Shop category &rarr;</a>
            </div>
            <div class="bg-white p-8 rounded-3xl border border-zinc-100 hover-scale">
                <span class="material-symbols-outlined text-primary text-4xl mb-6">kitchen</span>
                <h3 class="font-headline text-2xl font-bold mb-3">Dairy & Frozen</h3>
                <p class="text-zinc-600 mb-6">Milk, cheeses, ice creams, and frozen meals guaranteed to be fresh and frosty.</p>
                <a href="groceries.html" class="text-primary font-bold">Shop category &rarr;</a>
            </div>
            <div class="bg-white p-8 rounded-3xl border border-zinc-100 hover-scale">
                <span class="material-symbols-outlined text-primary text-4xl mb-6">inventory_2</span>
                <h3 class="font-headline text-2xl font-bold mb-3">Canned & Packaged</h3>
                <p class="text-zinc-600 mb-6">Long-lasting pantry staples, pasta, rice, beans, and canned vegetables.</p>
                <a href="groceries.html" class="text-primary font-bold">Shop category &rarr;</a>
            </div>
        </div>
    `
    },
    {
        name: 'fresh-produce.html',
        title: 'Fresh Produce',
        headerTitle: 'Farm Fresh Produce',
        content: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" class="rounded-[2.5rem] w-full h-[400px] object-cover" alt="Produce Layout">
            <div class="space-y-6">
                <h2 class="text-3xl font-black font-headline">Straight from the Farms</h2>
                <p class="text-lg text-zinc-600 leading-relaxed">Our fresh produce department prides itself on acquiring the locally sourced, hand-picked fruits and vegetables. Delivered fresh every morning.</p>
                <ul class="space-y-4">
                    <li class="flex items-center gap-3"><span class="material-symbols-outlined text-green-600">check_circle</span> Organic vegetables</li>
                    <li class="flex items-center gap-3"><span class="material-symbols-outlined text-green-600">check_circle</span> Seasonal fruits</li>
                    <li class="flex items-center gap-3"><span class="material-symbols-outlined text-green-600">check_circle</span> Freshly cut herbs & spices</li>
                </ul>
            </div>
        </div>
    `
    },
    {
        name: 'bakery.html',
        title: 'Fresh Bakery',
        headerTitle: 'The Bakery',
        content: `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div class="space-y-6">
                <h2 class="text-3xl font-black font-headline">Baked Fresh Daily</h2>
                <p class="text-lg text-zinc-600 leading-relaxed">Our artisan bakers arrive before dawn to ensure that you get the freshest bread, rolls, cakes, and pastries in Ikeja.</p>
                <ul class="space-y-4">
                    <li class="flex items-center gap-3"><span class="material-symbols-outlined text-amber-600">check_circle</span> Signature Agege Bread</li>
                    <li class="flex items-center gap-3"><span class="material-symbols-outlined text-amber-600">check_circle</span> Custom-made celebration cakes</li>
                    <li class="flex items-center gap-3"><span class="material-symbols-outlined text-amber-600">check_circle</span> Hot meat pies and sausage rolls</li>
                </ul>
            </div>
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000" class="rounded-[2.5rem] w-full h-[400px] object-cover" alt="Fresh Bakery">
        </div>
    `
    },
    {
        name: 'offers.html',
        title: 'Specials & Offers',
        headerTitle: 'Current Specials',
        content: `
        <div class="bg-red-50 p-10 rounded-[2rem] border border-red-100 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            <span class="material-symbols-outlined text-6xl text-primary">campaign</span>
            <h2 class="text-4xl font-black font-headline text-primary">Weekend Price Slash!</h2>
            <p class="text-lg text-zinc-700">Get up to 30% off selected household items and bulk groceries this weekend at Shoprite Ikeja City Mall.</p>
            <div class="mt-8 text-sm text-zinc-500">*Offers valid from Thursday to Sunday only. Terms and conditions apply.</div>
        </div>
    `
    },
    {
        name: 'locations.html',
        title: 'Locations',
        headerTitle: 'Store Locations',
        content: `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="space-y-8">
                <h2 class="text-3xl font-black font-headline">Find us in Lagos</h2>
                <div class="bg-white p-8 rounded-3xl border-2 border-primary/20 shadow-sm relative">
                    <div class="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">OPEN NOW</div>
                    <h3 class="text-xl font-bold mb-2">Shoprite - Ikeja City Mall</h3>
                    <p class="text-zinc-600 mb-4">Obafemi Awolowo Way, Alausa, Ikeja</p>
                    <p class="text-zinc-600 font-medium mb-1">Hours: 9:00 AM - 9:00 PM</p>
                    <p class="text-zinc-600 font-medium mb-6">Phone: <a href="tel:+2348000000000" class="text-primary">+234 800 000 0000</a></p>
                    <a href="https://www.google.com/maps/place/Shoprite/@6.6137986,3.3554221,17z/data=!3m2!4b1!5s0x103bf2d34be01e1d:0xebe991b0fbf76c5c!4m6!3m5!1s0x103b93c9e7ece127:0xc19caf1dac7dace9!8m2!3d6.6137933!4d3.357997!16s%2Fg%2F11r8cf5d7" target="_blank" class="primary-gradient text-white px-6 py-3 rounded-full font-bold w-full inline-block text-center mt-4">Get Directions</a>
                </div>
            </div>
            <div class="h-[500px] rounded-[2rem] overflow-hidden map-container border border-zinc-100">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.353278949822!2d3.355422074757303!3d6.613798622241687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93c9e7ece127%3A0xc19caf1dac7dace9!2sShoprite!5e0!3m2!1sen!2sng!4v1711200000000!5m2!1sen!2sng" class="absolute inset-0 w-full h-full border-0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    `
    },
    {
        name: 'privacy.html',
        title: 'Privacy Policy',
        headerTitle: 'Privacy Policy',
        content: \`
        <div class="prose max-w-4xl mx-auto prose-zinc">
            <p>At Shoprite, we respect your privacy and are committed to protecting it. This Privacy Policy outlines our practices.</p>
            <h3 class="text-xl font-bold mt-8 mb-4">Information We Collect</h3>
            <p>We do not collect personal information from you unless you voluntarily provide it to us.</p>
            <h3 class="text-xl font-bold mt-8 mb-4">How We Use Information</h3>
            <p>Your information is used solely to improve customer service and to present targeted specials or offers if you opt-in.</p>
        </div>
    \`
},
{
    name: 'terms.html',
    title: 'Terms & Conditions',
    headerTitle: 'Terms & Conditions',
    content: \`
        <div class="prose max-w-4xl mx-auto prose-zinc">
            <p>By accessing this website, you agree to be bound by these Terms and Conditions.</p>
            <h3 class="text-xl font-bold mt-8 mb-4">Use of Website</h3>
            <p>You agree to use this site for lawful purposes and in a way that doesn't infringe the rights of third parties.</p>
        </div>
    \`
},
{
    name: 'careers.html',
    title: 'Careers',
    headerTitle: 'Join Our Team',
    content: \`
        <div class="text-center max-w-3xl mx-auto space-y-6">
            <span class="material-symbols-outlined text-6xl text-primary">work</span>
            <h2 class="text-4xl font-black font-headline">Work at Shoprite</h2>
            <p class="text-lg text-zinc-700">We are always looking for passionate individuals to join Africa's largest food retailer. There are currently no open roles at the Ikeja City Mall branch, but check back soon!</p>
        </div>
    \`
}
];

pages.forEach(page => {
    fs.writeFileSync(path.join(__dirname, page.name), getHTML(page.title, page.headerTitle, page.content));
    console.log(\`Created \${page.name}\`);
});
