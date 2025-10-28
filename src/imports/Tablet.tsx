import svgPaths from "./svg-h3d1s8p29g";
import imgPublicidadTeixidoFlorCoche from "figma:asset/328faa30d1d4991c86ab0e222dbfeb91bb4cd4f2.png";
import imgRectangle30 from "figma:asset/53d1dabff9f07d1a5497a42cae4a47f48cf89be2.png";

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[14px] items-center left-[12px] top-[35px]">
      <div className="h-[11px] relative shrink-0 w-[14px]" data-name="Vector">
        <div className="absolute inset-[-6.82%_-5.36%]" style={{ "--stroke-0": "rgba(105, 123, 146, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 13">
            <path d={svgPaths.p2dc07580} id="Vector" stroke="var(--stroke-0, #697B92)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[14px] not-italic relative shrink-0 text-[#697b92] text-[14px] text-nowrap whitespace-pre">desarrollo@trustynet</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[62px] left-0 top-0 w-[333px]">
      <div className="absolute bg-white h-[40px] left-0 rounded-[5px] top-[22px] w-[333px]">
        <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[5px]" />
      </div>
      <Frame1 />
      <p className="absolute bg-clip-text font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] left-[12px] not-italic text-[14px] text-nowrap top-0 whitespace-pre" style={{ WebkitTextFillColor: "transparent" }}>
        Correo Electrónico
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute box-border content-stretch flex gap-[8px] items-center justify-center left-1/2 px-[24px] py-[15px] rounded-[30px] top-[80px] translate-x-[-50%] w-[333px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">Continue</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute h-[124px] left-0 top-0 w-[333px]">
      <Frame2 />
      <Frame />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute h-[124px] left-0 top-[195px] w-[333px]">
      <Frame3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute h-[529px] left-[787px] top-[135px] w-[333px]">
      <div className="absolute h-[39px] left-[calc(50%+0.5px)] top-[490px] translate-x-[-50%] w-[204px]" data-name="publicidad teixido flor- coche">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[304.65%] left-[-0.13%] max-w-none top-[-79.07%] w-[100.26%]" src={imgPublicidadTeixidoFlorCoche} />
        </div>
      </div>
      <p className="absolute bg-clip-text font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-1/2 not-italic text-[24px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre" style={{ WebkitTextFillColor: "transparent" }}>
        Iniciar sesión
      </p>
      <Frame4 />
    </div>
  );
}

export default function Tablet() {
  return (
    <div className="bg-white relative size-full" data-name="Tablet">
      <div className="absolute h-[800px] left-0 top-0 w-[640px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle30} />
      </div>
      <div className="absolute bg-white h-[800px] left-[639px] top-0 w-[640px]" />
      <Frame5 />
    </div>
  );
}