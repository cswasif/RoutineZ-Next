import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  logoLight?: string;
  logoDark?: string;
  logoSvg?: React.ReactNode;
}

const testimonials: Testimonial[] = [
  {
    quote: "With Next.js, we now consistently average 0.09 or lower for Cumulative Layout Shift, placing our site in the top tier for user experience and Core Web Vitals.",
    author: "Senior Software Engineer",
    role: "Frontend",
    logoLight: "/_next/static/media/notion-light.656396fe.svg",
    logoDark: "/_next/static/media/notion-dark.2aaa719f.svg"
  },
  {
    quote: "Our UI for Frame.io responds to user input within 100ms and all animations run at a consistent 60fps with Next.js.",
    author: "Charlton Roberts",
    role: "Product Engineering",
    logoLight: "/_next/static/media/adobe-light.ecca5ec5.svg",
    logoDark: "/_next/static/media/adobe-dark.52acb024.svg"
  },
  {
    quote: "Next.js has been a game-changer for our agency work and team collaboration. Its powerful features have allowed us to build high-performance websites quickly and efficiently like never before.",
    author: "Daniel Lopes",
    role: "Frontend Developer",
    logoSvg: (
      <svg aria-label="Wunderman Thompson's logo" fill="none" height="36" viewBox="0 0 1000 348" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_3077_14635)">
          <path d="M91.631 34.1735H57.4575V0H34.217V34.1735H0V57.414H34.217V91.5875H57.4575V57.414H91.631V34.1735Z" fill="#A4A4A4"></path>
          <path d="M683.593 123.273C683.568 105.808 669.416 91.6548 651.95 91.6309H617.202V195.969H628.849V154.907H651.95C652.846 154.907 653.733 154.864 654.629 154.777L673.468 195.969H686.271L665.91 151.672C676.693 146.304 683.534 135.319 683.593 123.273ZM651.95 143.313H628.849V103.182H651.95C663.039 103.201 672.023 112.185 672.042 123.273C672.004 134.345 663.022 143.303 651.95 143.313ZM271.744 164.066C271.744 179.574 261.255 185.793 248.591 185.793C235.883 185.793 225.437 179.574 225.437 164.066V91.5874H213.843V164.162C213.843 184.645 228.012 197.352 248.591 197.352C269.213 197.352 283.347 184.645 283.347 164.162V91.5874H271.753L271.744 164.066ZM162.866 172.024L147.445 91.6396H133.354L117.942 172.024L103.451 91.6396H91.631L111.671 195.978H123.943L140.382 115.193L156.829 195.978H169.093L189.133 91.6396H177.313L162.866 172.024ZM559.171 241.746H524.51V346.084H536.113V305.109H559.171C576.639 305.099 590.799 290.944 590.813 273.475C590.859 265.061 587.544 256.976 581.602 251.018C575.66 245.06 567.585 241.722 559.171 241.746ZM559.171 293.471H536.113V253.392H559.171C564.501 253.388 569.614 255.503 573.383 259.272C577.152 263.04 579.267 268.154 579.263 273.484C579.224 284.547 570.234 293.49 559.171 293.471ZM853.164 91.5874L819.93 195.935H832.02L839.761 171.894H879.31L886.955 195.935H899.219L865.785 91.5874H853.164ZM843.397 160.335L859.566 110.079L875.561 160.335H843.397ZM753.27 240.328C734.595 240.357 719.478 255.513 719.497 274.188V313.65C719.478 332.325 734.595 347.482 753.27 347.511C771.963 347.486 787.111 332.343 787.14 313.65V274.188C787.115 255.494 771.964 240.347 753.27 240.328ZM775.493 313.65C775.504 319.547 773.167 325.207 768.997 329.377C764.827 333.547 759.167 335.884 753.27 335.873C747.373 335.884 741.714 333.547 737.544 329.377C733.373 325.207 731.036 319.547 731.048 313.65V274.188C731.048 261.838 741.006 251.887 753.27 251.887C765.534 251.887 775.493 261.846 775.493 274.188V313.65ZM351.329 240.328C332.651 240.366 317.527 255.511 317.512 274.188V313.65C317.536 332.324 332.656 347.463 351.329 347.511C370.02 347.486 385.165 332.341 385.189 313.65V274.188C385.165 255.498 370.02 240.352 351.329 240.328ZM373.595 313.65C373.595 325.914 363.636 335.873 351.329 335.873C339.022 335.873 329.063 326.001 329.063 313.65V274.188C329.051 268.277 331.392 262.602 335.57 258.418C339.747 254.235 345.417 251.885 351.329 251.887C363.593 251.887 373.595 261.846 373.595 274.188V313.65ZM374.613 172.024L327.375 91.6396H316.442V195.969H328.036V115.532L375.274 195.926H386.207V91.5874H374.613V172.024ZM988.258 91.6309V172.024L941.151 91.6396H930.131V195.969H941.681V115.532L988.971 195.926H1000V91.5874L988.258 91.6309ZM882.858 322.174L835.569 241.746H824.636V346.084H836.282V265.656L883.476 346.084H894.409V241.746H882.858V322.174ZM487.98 162.109V125.457C487.97 106.784 472.835 91.6492 454.163 91.6396H419.459V195.969H454.163C472.832 195.912 487.946 180.779 487.98 162.109ZM431.053 103.182H454.111C466.41 103.177 476.382 113.148 476.377 125.448V162.109C476.377 174.373 466.47 184.375 454.111 184.375H431.053V103.182ZM586.63 184.375H534.321V149.445H580.933V137.851H534.321V103.19H586.63V91.5961H522.736V195.935H586.638V184.375H586.63ZM753.27 143.139L727.316 91.6396H715.226V195.969H726.786V115.532L749.53 161.439H756.993L779.746 115.532V195.926H791.48V91.5874H779.39L753.27 143.139ZM97.3193 253.392H134.607V346.084H146.201V253.392H183.436V241.746H97.3193V253.392ZM271.336 288.131H225.829V241.746H214.235V346.084H225.829V299.69H271.292V346.084H282.938V241.746H271.292V288.131H271.336ZM659.413 288.227L642.8 281.651C631.597 276.937 630.084 271.692 630.084 267.074C630.084 262.812 631.693 259.254 634.798 256.671C638.529 253.575 644.313 251.783 650.889 251.783C657.638 251.783 663.335 253.653 667.067 256.845C670.52 259.872 672.303 264.142 672.303 269.561V271.431H683.949V269.561C683.949 251.435 670.441 240.232 650.889 240.232C631.423 240.232 618.455 251.261 618.455 266.978C618.455 280.929 628.318 288.575 640.399 293.202L655.151 299.064C669.459 304.587 673.642 308.666 673.642 317.208C673.642 322.8 671.677 327.245 667.945 330.446C663.953 333.899 657.638 335.864 650.532 335.864C643.07 335.864 636.755 334.081 632.667 330.707C629.023 327.68 627.153 323.418 627.153 318.182V315.598H615.506V318.182C615.506 336.221 629.823 347.502 650.524 347.502C671.137 347.502 685.184 335.595 685.184 317.208C685.193 299.421 671.503 293.028 659.413 288.227ZM453.71 293.202L427.669 241.746H415.623V346.084H427.217V265.656L450.014 311.597H457.442L480.239 265.656V346.084H491.833V241.746H479.804L453.71 293.202Z" fill="var(--geist-foreground)"></path>
        </g>
        <defs>
          <clipPath id="clip0_3077_14635">
            <rect fill="white" height="347.511" width="1000"></rect>
          </clipPath>
        </defs>
      </svg>
    )
  }
];

export default function CustomerTestimonials() {
  return (
    <div className="stack-module__UbbKhW__stack stack customers-module__2o1JUG__quotes" data-version="v1" style={{
      '--stack-flex': 'initial',
      '--sm-stack-direction': 'column',
      '--md-stack-direction': 'row',
      '--stack-align': 'stretch',
      '--stack-justify': 'flex-start',
      '--stack-padding': '0px',
      '--stack-gap': '0px'
    } as React.CSSProperties}>
      <h2 className="visually-hidden">Customer Testimonials</h2>
      
      {testimonials.map((testimonial, index) => (
        <figure key={index} className="customers-module__2o1JUG__quote">
          <blockquote>
            <h3>
              <span aria-hidden="true">"</span>
              {testimonial.quote}
              <span aria-hidden="true">"</span>
            </h3>
          </blockquote>
          <figcaption>
            {testimonial.logoLight && testimonial.logoDark ? (
              <>
                <img 
                  alt={`${testimonial.author} Logo`} 
                  loading="eager" 
                  width="76.86274509803921" 
                  height="28" 
                  decoding="async" 
                  data-nimg="1" 
                  className="geist-hide-on-dark" 
                  style={{color: 'transparent'}} 
                  src={testimonial.logoLight} 
                />
                <img 
                  alt={`${testimonial.author} Logo`} 
                  loading="eager" 
                  width="76.86274509803921" 
                  height="28" 
                  decoding="async" 
                  data-nimg="1" 
                  className="geist-hide-on-light" 
                  style={{color: 'transparent'}} 
                  src={testimonial.logoDark} 
                />
              </>
            ) : (
              testimonial.logoSvg
            )}
            <span data-author="true">
              {testimonial.author}<span>, </span>{testimonial.role}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}