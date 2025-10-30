import svgPaths from "./svg-1oaqghfb2h";

function Frame294() {
  return (
    <div className="absolute h-[107px] left-[130px] top-[28px] w-[339px]">
      <div className="absolute bg-[oldlace] h-[14px] left-[7px] rounded-[20px] top-[93px] w-[325px]" />
      <div className="absolute bg-clip-text font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] left-[169.5px] not-italic text-[24px] text-center text-nowrap top-[49px] translate-x-[-50%] whitespace-pre" style={{ WebkitTextFillColor: "transparent" }}>
        <p className="mb-0">¿Confirmas que deseas</p>
        <p>anular esta nota de venta?</p>
      </div>
      <div className="absolute aspect-[18/18] left-[44.54%] right-[44.25%] top-[calc(50%-34.5px)] translate-y-[-50%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]" style={{ "--stroke-0": "rgba(245, 159, 10, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 43">
            <path d={svgPaths.p34e77700} id="Vector" stroke="var(--stroke-0, #F59F0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.22222" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute bg-[#f59f0a] box-border content-stretch flex gap-[8px] items-center justify-center left-[114px] p-[15px] rounded-[30px] top-0 w-[136px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">Anular Nota</p>
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
    <div className="absolute h-[44px] left-[175px] top-[245px] w-[250px]">
      <Frame13 />
      <Frame280 />
    </div>
  );
}

export default function Frame295() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-white h-[317px] left-0 rounded-[20px] top-0 w-[600px]" />
      <Frame294 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[1.6] left-[299.5px] not-italic text-[#697b92] text-[18px] text-center top-[161px] translate-x-[-50%] w-[379px]">Esta acción no se puede deshacer y la información se perderá permanentemente.</p>
      <Frame281 />
    </div>
  );
}