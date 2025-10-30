import svgPaths from "./svg-q6030ad8oe";

function Frame180() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] items-center left-[calc(50%-24px)] p-[15px] rounded-[5px] top-0 translate-x-[-50%] w-[123px]">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[#697b92] text-[14px] text-nowrap whitespace-pre">27,00 €</p>
    </div>
  );
}

function Frame85() {
  return (
    <button className="absolute block cursor-pointer left-[127px] size-[44px] top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
        <g id="Frame 85">
          <rect fill="var(--fill-0, white)" height="43" rx="4.5" width="43" x="0.5" y="0.5" />
          <rect height="43" rx="4.5" stroke="url(#paint0_linear_29_34)" width="43" x="0.5" y="0.5" />
          <path d={svgPaths.p28b56e40} id="Vector" stroke="url(#paint1_linear_29_34)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_29_34" x1="0" x2="52.6721" y1="0" y2="27.2174">
            <stop stopColor="#092090" />
            <stop offset="1" stopColor="#0C2ABF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_29_34" x1="17" x2="31.0125" y1="13" y2="17.0226">
            <stop stopColor="#092090" />
            <stop offset="1" stopColor="#0C2ABF" />
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
}

export default function DescuentoProdutos() {
  return (
    <div className="relative size-full" data-name="Descuento Produtos">
      <Frame180 />
      <Frame85 />
    </div>
  );
}