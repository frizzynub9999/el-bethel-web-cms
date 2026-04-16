import { ArrowRight } from "lucide-react";
import { getHomePageData } from "@/sanity/lib/home-page";

export default async function MinistriesPage() {
  const data = await getHomePageData();
  const ministries = data.ministries;

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[450px] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200"
            className="w-full h-full object-cover"
            alt="Church Background"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <span className="text-[#8B19E6] font-black tracking-[0.3em] uppercase mb-4 block">
            EL BETHEL GLOBAL HARVEST
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
            Our <br /> <span className="text-[#8B19E6]">Ministries</span>
          </h1>
          <p className="max-w-xl text-gray-300 text-lg font-medium leading-relaxed">
            Discover the various ways we serve our community and grow together in faith.
            There is a place for everyone in our family.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {ministries.map((ministry, index) => (
              <div key={`${ministry.title}-${index}`} className="group cursor-pointer">
                <div className="relative h-80 rounded-[40px] overflow-hidden bg-gray-100 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800"
                    alt={ministry.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0" />

                  <div className="absolute bottom-6 left-6 bg-white p-4 rounded-2xl shadow-xl text-black">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={ministry.icon}
                      />
                    </svg>
                  </div>
                </div>

                <span className="text-[#8B19E6] text-xs font-black tracking-widest uppercase mb-2 block">
                  Ministry Opportunity
                </span>
                <h3 className="text-3xl font-black uppercase italic mb-4 text-gray-900 group-hover:text-[#8B19E6] transition-colors">
                  {ministry.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">
                  {ministry.desc}
                </p>

                <div className="flex items-center gap-2 font-black text-sm uppercase tracking-tighter group-hover:gap-4 transition-all text-black">
                  Join This Ministry <ArrowRight size={18} className="text-[#8B19E6]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#8B19E6] py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-12">
          <div className="text-white">
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-8">
              Become a <br /> Volunteer
            </h2>
            <p className="text-purple-100 text-xl font-medium mb-10 leading-relaxed max-w-lg">
              God has given you unique gifts to bless others. Whether it&apos;s technology, music, or teaching,
              your contribution makes a difference.
            </p>
            <button className="bg-black text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl">
              Apply to Serve
            </button>
          </div>
          <div className="relative hidden lg:block">
            <div className="aspect-square bg-black/10 rounded-[80px] rotate-3 absolute inset-0 -z-10" />
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800"
              className="rounded-[80px] aspect-square object-cover shadow-2xl"
              alt="Community"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
