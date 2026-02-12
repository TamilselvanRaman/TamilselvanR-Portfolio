export default function About() {
  return (
    <section
      id="about"
      className="bg-[#f2f0e6] py-28 px-6 relative"
      style={{
        backgroundImage:
          "radial-gradient(#00000020 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* OUTER FRAME */}
        <div className="border-[6px] border-black bg-white p-10 shadow-[10px_10px_0px_#000]">

          <div className="flex flex-col md:grid md:grid-cols-[300px_1fr] gap-12 items-start">

            {/* LEFT IMAGE CARD */}
            <div className="border-[5px] border-black bg-[#f5f5f5] p-4 w-full md:w-auto mx-auto">

              <div className="bg-black text-white text-[10px] font-bold px-2 py-1 inline-block mb-3">
                PROFILE.CONFIG
              </div>

              {/* Profile Image */}
              <div className="border-[4px] border-black aspect-square overflow-hidden bg-white">
                <img 
                  src="/images/ProfileImage.jpeg" 
                  alt="Tamil Selvan Profile"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

            {/* RIGHT CONTENT */}
            <div>

              {/* TITLE */}
              <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight font-sans">
                WHO_AM_I()
              </h2>

              {/* CODE BLOCK STYLE PANEL */}
              <div className="border-[3px] border-black p-6 bg-[#fafafa] font-mono text-sm leading-relaxed">

                <CodeRow label="name" value='"Tamil Selvan"' />
                <CodeRow label="role" value='"Full Stack Developer"' />
                <CodeRow 
                  label="philosophy" 
                  value='"Bring personality back to code"' 
                  highlight 
                />

                <div className="my-4 border-t-2 border-black"></div>

                <div className="mb-2 text-green-600">
                  // Skills
                </div>

                <CodeArray 
                  label="specialization" 
                  items={[
                    "Full Stack Web Development",
                    "Clean Architecture",
                    "Scalable Systems",
                  ]}
                />

                <div className="my-4 border-t-2 border-black"></div>

                <CodeRow label="location" value='"India"' />
                <CodeRow label="status" value='"Available"' status />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

/* ROW COMPONENT */
function CodeRow({
  label,
  value,
  highlight,
  status,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  status?: boolean;
}) {
  return (
    <div className="flex gap-2 mb-2">
      <span className="text-blue-600">const</span>
      <span className="text-purple-600">{label}</span>
      <span>=</span>
      <span
        className={`${
          highlight
            ? "bg-yellow-400 px-1 font-bold"
            : status
            ? "bg-green-400 px-1 font-bold"
            : "text-orange-600"
        }`}
      >
        {value}
      </span>
      <span>;</span>
    </div>
  );
}

/* ARRAY COMPONENT */
function CodeArray({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div className="mb-2">
      <div className="flex gap-2">
        <span className="text-blue-600">const</span>
        <span className="text-purple-600">{label}</span>
        <span>= [</span>
      </div>
      {items.map((item, index) => (
        <div key={index} className="pl-10 text-orange-600">
          "{item}",
        </div>
      ))}
      <div>];</div>
    </div>
  );
}
