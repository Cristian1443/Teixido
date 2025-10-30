import svgPaths from "./svg-1t5nsxpf5l";

function Frame294() {
  return (
    <div className="absolute h-[107px] left-[130px] top-[28px] w-[339px]">
      <div className="absolute bg-[#f4fce5] h-[14px] left-[42px] rounded-[20px] top-[93px] w-[255px]" />
      <div className="absolute bg-clip-text font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] left-[169.5px] not-italic text-[24px] text-center text-nowrap top-[49px] translate-x-[-50%] whitespace-pre" style={{ WebkitTextFillColor: "transparent" }}>
        <p className="mb-0">¿Estás seguro de que deseas</p>
        <p>cerrar la operación?</p>
      </div>
      <div className="absolute aspect-[18/18] left-[44.54%] right-[44.25%] top-[calc(50%-34.5px)] translate-y-[-50%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 43">
            <path d={svgPaths.p34e77700} id="Vector" stroke="url(#paint0_linear_30_93)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.22222" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_30_93" x1="2.11111" x2="40.1111" y1="21.1111" y2="21.1111">
                <stop stopColor="#8BD600" />
                <stop offset="1" stopColor="#C4FF57" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute bg-gradient-to-r box-border content-stretch flex from-[#8bd600] gap-[8px] items-center justify-center left-[114px] p-[15px] rounded-[30px] to-[#c4ff57] top-0 w-[175px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-center text-nowrap whitespace-pre">Cerrar la Operación</p>
    </div>
  );
}

function Frame280() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] items-center justify-center left-0 p-[15px] rounded-[30px] top-0 w-[102px]">
      <div aria-hidden="true" className="absolute border border-[#697b92] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] not-italic relative shrink-0 text-[#697b92] text-[14px] text-center text-nowrap whitespace-pre">Cancelar</p>
    </div>
  );
}

function Frame281() {
  return (
    <div className="absolute h-[44px] left-[155px] top-[245px] w-[289px]">
      <Frame13 />
      <Frame280 />
    </div>
  );
}

export default function Frame293() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-white h-[317px] left-0 rounded-[20px] top-0 w-[600px]" />
      <Frame294 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.6] left-[299.5px] not-italic text-[#697b92] text-[18px] text-center top-[161px] translate-x-[-50%] w-[379px]">Una vez cerrada, no podrás modificar ni anular esta nota de venta.</p>
      <Frame281 />
    </div>
  );
}