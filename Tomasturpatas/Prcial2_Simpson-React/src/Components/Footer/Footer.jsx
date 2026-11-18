import "./Footer.css"

function Footer() {
  return (
    <footer className="site-footer">
      {/* Silueta de edificios de Springfield. */}
      <svg
        className="springfield-silhouette"
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="currentColor">
          <path d="M0 140V76h62V54h15v22h37v64z" />
          <path d="M112 140V92h42V62h12v30h31v48z" />
          <path d="M194 140V48h22V25h12v23h24v92z" />
          <path d="M244 140V82h54V45h13v37h38v58z" />
          <path d="M334 140V66h42V35h10V17h12v18h13v31h34v74z" />
          <path d="M425 140V93h45V58h20v35h32v47z" />
          <path d="M520 140V72h42V50h13v22h37v68z" />
          <path d="M602 140V87h55V52h18v35h31v53z" />
          <path d="M698 140V68h38V42h12V20h13v22h15v26h34v72z" />
          <path d="M802 140V96h40V70h14v26h38v44z" />
          <path d="M891 140V79h54V38h15v41h33v61z" />
          <path d="M986 140V91h42V57h17v34h33v49z" />
          <path d="M1072 140V70h40V49h12v21h76v70z" />
          <path d="M560 140l15-47 15 47zM566 99h18v-8h-18z" />
          <path d="M584 140l15-58 15 58zM590 91h18v-8h-18z" />
        </g>
        <g fill="#8fdcff">
          <path d="M19 93h10v13H19zm23 0h10v13H42zm98 18h10v13h-10zm73-51h9v13h-9zm41 42h10v13h-10zm61 0h10v13h-10zm57-21h10v13h-10zm45-17h9v13h-9zm55 48h10v13h-10zm63-1h10v13h-10zm69-21h10v13h-10zm43 28h10v13h-10zm76-18h10v13h-10zm54 21h10v13h-10zm59-35h10v13h-10zm61 49h10v13h-10zm69-37h10v13h-10zm72 26h10v13h-10zm54-21h10v13h-10z" />
        </g>
      </svg>
      <p className="site-footer-text">©2026. Creado por S:P.C.</p>
    </footer>
  )
}

export default Footer
