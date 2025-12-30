import type { JSX, SVGProps } from "react";

type SVGPropsType = SVGProps<SVGSVGElement>;
export type PropsType = SVGProps<SVGSVGElement>;

export function Views(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#3FD97F" />
      <path
        d="M26.562 29a2.437 2.437 0 114.875 0 2.437 2.437 0 01-4.875 0z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.166 29c0 1.776.46 2.374 1.382 3.57 1.838 2.389 4.922 5.097 9.452 5.097s7.614-2.708 9.452-5.096c.92-1.197 1.381-1.795 1.381-3.57 0-1.777-.46-2.375-1.381-3.571-1.838-2.389-4.922-5.096-9.452-5.096s-7.614 2.707-9.452 5.096c-.921 1.196-1.381 1.794-1.381 3.57zM29 24.938a4.063 4.063 0 100 8.125 4.063 4.063 0 000-8.125z"
        fill="#fff"
      />
    </svg>
  );
}

export function Profit(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#FF9C55" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29 39.833c5.983 0 10.833-4.85 10.833-10.833 0-5.983-4.85-10.834-10.833-10.834-5.983 0-10.834 4.85-10.834 10.834 0 5.983 4.85 10.833 10.834 10.833zm.812-17.333a.812.812 0 10-1.625 0v.343c-1.766.316-3.25 1.643-3.25 3.448 0 2.077 1.964 3.521 4.063 3.521 1.491 0 2.437.982 2.437 1.896 0 .915-.946 1.896-2.437 1.896-1.491 0-2.438-.981-2.438-1.896a.812.812 0 10-1.625 0c0 1.805 1.484 3.132 3.25 3.449v.343a.812.812 0 101.625 0v-.343c1.767-.317 3.25-1.644 3.25-3.449 0-2.077-1.963-3.52-4.062-3.52-1.491 0-2.438-.982-2.438-1.896 0-.915.947-1.896 2.438-1.896s2.437.98 2.437 1.895a.813.813 0 001.625 0c0-1.805-1.483-3.132-3.25-3.448V22.5z"
        fill="#fff"
      />
    </svg>
  );
}

export function Product(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#8155FF" />
      <path
        d="M35.043 20.8l-2.167-1.136c-1.902-.998-2.853-1.498-3.876-1.498-1.023 0-1.974.5-3.876 1.498L22.958 20.8c-1.922 1.008-3.051 1.6-3.752 2.394L29 28.09l9.794-4.896c-.7-.793-1.83-1.386-3.751-2.394zM39.56 24.628l-9.747 4.874v10.227c.777-.194 1.662-.658 3.063-1.393l2.167-1.137c2.33-1.223 3.496-1.835 4.143-2.934.647-1.099.647-2.467.647-5.202v-.127c0-2.05 0-3.332-.272-4.308zM28.188 39.73V29.501l-9.749-4.874c-.272.976-.272 2.258-.272 4.308v.127c0 2.735 0 4.103.647 5.202.647 1.1 1.813 1.71 4.144 2.934l2.166 1.137c1.4.735 2.286 1.2 3.064 1.393z"
        fill="#fff"
      />
    </svg>
  );
}

export function ChevronUp(props: PropsType) {
  return (
    <svg
      width={16}
      height={8}
      viewBox="0 0 16 8"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.553.728a.687.687 0 01.895 0l6.416 5.5a.688.688 0 01-.895 1.044L8 2.155 2.03 7.272a.688.688 0 11-.894-1.044l6.417-5.5z"
      />
    </svg>
  );
}

export function HomeIcon(props: PropsType) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
        stroke="#1C274C"
        strokeWidth="1.5"
      />
      <path
        d="M12 15L12 18"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Calendar(props: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M17 14a1 1 0 100-2 1 1 0 000 2zM17 18a1 1 0 100-2 1 1 0 000 2zM13 13a1 1 0 11-2 0 1 1 0 012 0zM13 17a1 1 0 11-2 0 1 1 0 012 0zM7 14a1 1 0 100-2 1 1 0 000 2zM7 18a1 1 0 100-2 1 1 0 000 2z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 1.75a.75.75 0 01.75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 011.5 0v.827c.26.02.506.045.739.076 1.172.158 2.121.49 2.87 1.238.748.749 1.08 1.698 1.238 2.87.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433-.158 1.172-.49 2.121-1.238 2.87-.749.748-1.698 1.08-2.87 1.238-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153-1.172-.158-2.121-.49-2.87-1.238-.748-.749-1.08-1.698-1.238-2.87-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433.158-1.172.49-2.121 1.238-2.87.749-.748 1.698-1.08 2.87-1.238.233-.031.48-.056.739-.076V2.5A.75.75 0 017 1.75zM5.71 4.89c-1.005.135-1.585.389-2.008.812-.423.423-.677 1.003-.812 2.009-.023.17-.042.35-.058.539h18.336c-.016-.19-.035-.369-.058-.54-.135-1.005-.389-1.585-.812-2.008-.423-.423-1.003-.677-2.009-.812-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14zM2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29-.135 1.005-.389 1.585-.812 2.008-.423.423-1.003.677-2.009.812-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14-1.005-.135-1.585-.389-2.008-.812-.423-.423-.677-1.003-.812-2.009-.138-1.027-.14-2.382-.14-4.289v-2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function User(props: PropsType) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="6" r="4" stroke="#1C274C" strokeWidth="1.5" />
      <path
        d="M15 9C16.6569 9 18 7.65685 18 6C18 4.34315 16.6569 3 15 3"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse
        cx="9"
        cy="17"
        rx="7"
        ry="4"
        stroke="#1C274C"
        strokeWidth="1.5"
      />
      <path
        d="M18 14C19.7542 14.3847 21 15.3589 21 16.5C21 17.5293 19.9863 18.4229 18.5 18.8704"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Business(props: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-briefcase-business-icon lucide-briefcase-business"
    >
      <path d="M12 12h.01" />
      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M22 13a18.15 18.15 0 0 1-20 0" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

export function ReportedUser(props: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="12" y1="18" x2="12" y2="18" />
    </svg>
  );
}

export function Alphabet(props: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 7A.75.75 0 013 6.25h10a.75.75 0 010 1.5H3A.75.75 0 012.25 7zm14.25-.75a.75.75 0 01.684.442l4.5 10a.75.75 0 11-1.368.616l-1.437-3.194H14.12l-1.437 3.194a.75.75 0 11-1.368-.616l4.5-10a.75.75 0 01.684-.442zm-1.704 6.364h3.408L16.5 8.828l-1.704 3.786zM2.25 12a.75.75 0 01.75-.75h7a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 5a.75.75 0 01.75-.75h5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z"
        fill="currentColor"
      />
    </svg>
  );
}

export function UniversityIcon(props: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-university-icon lucide-university"
    >
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M18 12h.01" />
      <path d="M18 16h.01" />
      <path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
      <path d="M6 12h.01" />
      <path d="M6 16h.01" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}

export function Table(props: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-ambulance-icon lucide-ambulance"
    >
      <path d="M10 10H6" />
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
      <path d="M8 8v4" />
      <path d="M9 18h6" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

export function PieChart(props: PropsType) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.254 1.365c-1.096-.306-2.122.024-2.851.695-.719.66-1.153 1.646-1.153 2.7v6.695a2.295 2.295 0 002.295 2.295h6.694c1.055 0 2.042-.434 2.701-1.153.67-.729 1.001-1.755.695-2.851a12.102 12.102 0 00-8.38-8.381zM11.75 4.76c0-.652.27-1.232.668-1.597.386-.355.886-.508 1.433-.355 3.55.991 6.349 3.79 7.34 7.34.153.548 0 1.048-.355 1.434-.365.397-.945.667-1.597.667h-6.694a.795.795 0 01-.795-.795V4.761z"
        fill="currentColor"
      />
      <path
        d="M8.672 4.716a.75.75 0 00-.45-1.432C4.183 4.554 1.25 8.328 1.25 12.79c0 5.501 4.46 9.961 9.96 9.961 4.462 0 8.236-2.932 9.505-6.973a.75.75 0 10-1.43-.45 8.465 8.465 0 01-8.074 5.923 8.46 8.46 0 01-8.461-8.46 8.465 8.465 0 015.922-8.074z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FourCircle(props: PropsType) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 1.75a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM3.25 6.5a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM17.5 12.75a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zm-3.25 4.75a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM12.75 6.5a4.75 4.75 0 119.5 0 4.75 4.75 0 01-9.5 0zm4.75-3.25a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zM6.5 12.75a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM3.25 17.5a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Authentication(props: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M14.945 1.25c-1.367 0-2.47 0-3.337.117-.9.12-1.658.38-2.26.981-.524.525-.79 1.17-.929 1.928-.135.737-.161 1.638-.167 2.72a.75.75 0 001.5.008c.006-1.093.034-1.868.142-2.457.105-.566.272-.895.515-1.138.277-.277.666-.457 1.4-.556.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103.734.099 1.122.28 1.4.556.276.277.456.665.555 1.4.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.436-.103 3.192-.099.734-.279 1.122-.556 1.399-.277.277-.665.457-1.399.556-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103-.733-.099-1.122-.28-1.399-.556-.243-.244-.41-.572-.515-1.138-.108-.589-.136-1.364-.142-2.457a.75.75 0 10-1.5.008c.006 1.082.032 1.983.167 2.72.14.758.405 1.403.93 1.928.601.602 1.36.86 2.26.982.866.116 1.969.116 3.336.116h1.11c1.368 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337v-8.11c0-1.367 0-2.47-.116-3.337-.121-.9-.38-1.658-.982-2.26-.602-.602-1.36-.86-2.26-.981-.867-.117-1.97-.117-3.337-.117h-1.11z" />
      <path d="M2.001 11.249a.75.75 0 000 1.5h11.973l-1.961 1.68a.75.75 0 10.976 1.14l3.5-3a.75.75 0 000-1.14l-3.5-3a.75.75 0 00-.976 1.14l1.96 1.68H2.002z" />
    </svg>
  );
}

export function ArrowLeftIcon(props: PropsType) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.89775 4.10225C8.11742 4.32192 8.11742 4.67808 7.89775 4.89775L4.358 8.4375H15C15.3107 8.4375 15.5625 8.68934 15.5625 9C15.5625 9.31066 15.3107 9.5625 15 9.5625H4.358L7.89775 13.1023C8.11742 13.3219 8.11742 13.6781 7.89775 13.8977C7.67808 14.1174 7.32192 14.1174 7.10225 13.8977L2.60225 9.39775C2.38258 9.17808 2.38258 8.82192 2.60225 8.60225L7.10225 4.10225C7.32192 3.88258 7.67808 3.88258 7.89775 4.10225Z"
        fill=""
      />
    </svg>
  );
}

export function SettingsIcon(props: PropsType) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="3" stroke="#1C274C" strokeWidth="1.5" />
      <path
        d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74458 2.35523 9.35523 2.74458 9.15224 3.23463C9.05958 3.45834 9.02332 3.7185 9.00912 4.09799C8.98827 4.65568 8.70227 5.17189 8.21896 5.45093C7.73565 5.72996 7.1456 5.71954 6.65221 5.45876C6.31646 5.2813 6.07302 5.18262 5.83295 5.15102C5.30705 5.08178 4.77519 5.22429 4.35437 5.5472C4.03876 5.78938 3.80579 6.1929 3.33984 6.99993C2.8739 7.80697 2.64093 8.21048 2.589 8.60491C2.51977 9.1308 2.66228 9.66266 2.98519 10.0835C3.13257 10.2756 3.33971 10.437 3.6612 10.639C4.13381 10.936 4.4379 11.4419 4.43787 12C4.43784 12.5581 4.13376 13.0639 3.6612 13.3608C3.33966 13.5629 3.13249 13.7244 2.98509 13.9165C2.66218 14.3373 2.51967 14.8691 2.58891 15.395C2.64083 15.7894 2.8738 16.193 3.33975 17C3.80569 17.807 4.03866 18.2106 4.35427 18.4527C4.77509 18.7756 5.30695 18.9181 5.83285 18.8489C6.07291 18.8173 6.31633 18.7186 6.65205 18.5412C7.14548 18.2804 7.73557 18.27 8.21891 18.549C8.70225 18.8281 8.98827 19.3443 9.00913 19.9021C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.1671 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6602 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6603 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5622 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6603 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1672 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
        stroke="#1C274C"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function SubscriptionIcon(props: PropsType) {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
    //   strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
    //   <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    //   <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    // </svg>
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 120.641 122.878"
      xmlSpace="preserve"
      width="120.641px"
      height="122.878px"
      {...props}
      fill="currentColor"
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M68.16,6.889c18.129,3.653,31.889,19.757,31.889,38.921 
           c0,22.594-2.146,39.585,20.592,54.716c-40.277,0-80.366,0-120.641,0C22.8,85.353,20.647,68.036,20.647,45.81 
           c0-19.267,13.91-35.439,32.182-38.979C53.883-2.309,67.174-2.265,68.16,6.889L68.16,6.889z 
           M76.711,109.19c-1.398,7.785-8.205,13.688-16.392,13.688c-8.187,0-14.992-5.902-16.393-13.688H76.711L76.711,109.19z"
        />
      </g>
    </svg>
  );
}
export function BlogIcon(props: PropsType) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="6" r="4" stroke="#1C274C" strokeWidth="1.5" />
      <path
        d="M15 13.3271C14.0736 13.1162 13.0609 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C17.6874 22 19.3315 20.9817 19.8068 19.5"
        stroke="#1C274C"
        strokeWidth="1.5"
      />
      <circle cx="18" cy="16" r="4" stroke="#1C274C" strokeWidth="1.5" />
      <path
        d="M18 14.6667V17.3333"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6665 16L19.3332 16"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Groupicon(props: PropsType) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="6" r="4" stroke="#1C274C" strokeWidth="1.5" />
      <path
        d="M18 9C19.6569 9 21 7.88071 21 6.5C21 5.11929 19.6569 4 18 4"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 9C4.34315 9 3 7.88071 3 6.5C3 5.11929 4.34315 4 6 4"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse
        cx="12"
        cy="17"
        rx="6"
        ry="4"
        stroke="#1C274C"
        strokeWidth="1.5"
      />
      <path
        d="M20 19C21.7542 18.6153 23 17.6411 23 16.5C23 15.3589 21.7542 14.3847 20 14"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 19C2.24575 18.6153 1 17.6411 1 16.5C1 15.3589 2.24575 14.3847 4 14"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}


export const Users = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-users-icon lucide-users text-gray-700 dark:text-gray-300"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  </div>
);

export const UserPosts = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
    <svg
      width="15"
      height="20"
      viewBox="0 0 64 80"
      xmlns="http://www.w3.org/2000/svg"
      stroke="black"
      fill="none"
      strokeWidth="2"
      className="text-blue-700 dark:text-blue-300"
    >
      <rect x="4" y="4" width="56" height="72" rx="4" ry="4" />
      <circle cx="14" cy="16" r="5" />
      <line x1="24" y1="13" x2="46" y2="13" />
      <line x1="24" y1="18" x2="46" y2="18" />
      <line x1="24" y1="23" x2="44" y2="23" />

      <line x1="6" y1="28" x2="58" y2="28" />

      <polyline points="10,60 26,42 38,54 46,46 58,60" />
      <circle cx="36" cy="36" r="3" />

      <line x1="6" y1="62" x2="58" y2="62" />
      <circle cx="14" cy="68" r="1.5" />
      <circle cx="20" cy="68" r="1.5" />
      <circle cx="26" cy="68" r="1.5" />
      <line x1="38" y1="68" x2="54" y2="68" />
    </svg>
  </div>
);

export const Groups = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <div className="flex h-10 w-10 items-center justify-center rounded-lg">
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 83.38"
      width="24"
      height="24"
      fill="currentColor"
      // className="text-purple-700 dark:text-purple-300"
    >
      <path
        className="cls-1"
        d="M68.58,63.51v16a4.08,4.08,0,0,0,4.21,3.9h0A4.08,4.08,0,0,0,77,79.48v-16h2v16a4.09,4.09,0,0,0,4.22,3.9h0a4.08,4.08,0,0,0,4.21-3.9v-16h6l-6-28.22c.21.46.41.92.61,1.39A51.08,51.08,0,0,1,91.19,47,4,4,0,0,0,95,50.23h.06a3,3,0,0,0,2.75-1.13A3.93,3.93,0,0,0,99,45.56l-.08-.47a38,38,0,0,1,1.47-5.2c.22-.59.45-1.17.69-1.73v1.12L96.92,58.91H101V69.78a2.83,2.83,0,0,0,2.89,2.76h0a2.84,2.84,0,0,0,2.9-2.76V58.91h1.8V69.78a2.83,2.83,0,0,0,2.89,2.76h0a2.84,2.84,0,0,0,2.9-2.76V58.91h4.52l-4.52-20V38.5c.23.54.44,1.09.65,1.66A38,38,0,0,1,117,48a3,3,0,0,0,5.86-.81,44.45,44.45,0,0,0-2.23-9,39.06,39.06,0,0,0-4-8,3,3,0,0,0-2.24-1.32h0c-3.16-1-9.1-1-13.35-.26h0a2.92,2.92,0,0,0-2.25,1.32A37.42,37.42,0,0,0,96,35c-.18-.46-.36-.91-.55-1.36a52,52,0,0,0-5.85-10.47,3.91,3.91,0,0,0-2.41-1.54v0a48.89,48.89,0,0,0-18.29,0v0a3.88,3.88,0,0,0-2.63,1.58A50.93,50.93,0,0,0,61,32.3a50.72,50.72,0,0,0-4.75-9.19,3.87,3.87,0,0,0-2.62-1.69v-.08C49,20,40.29,20,35.32,21.19v.12a3.83,3.83,0,0,0-3,1.73A51.2,51.2,0,0,0,27,33.75l-.18.49a37,37,0,0,0-2.54-4.55A3,3,0,0,0,22,28.37c-1.42-.61-12.74-1-14.15.13a3,3,0,0,0-1.56,1.19,39.06,39.06,0,0,0-4,8,44.45,44.45,0,0,0-2.23,9,3,3,0,0,0,5.85.81,38.39,38.39,0,0,1,1.8-7.44V69.55a3.05,3.05,0,0,0,3.11,3h0a3,3,0,0,0,3.1-3V53.44h1.93V69.55a3.05,3.05,0,0,0,3.11,3h0a3,3,0,0,0,3.1-3V38.06c.23.55.45,1.1.66,1.68a37.22,37.22,0,0,1,1.45,5l-.15,1a3.85,3.85,0,0,0,7.63,1.06,51.18,51.18,0,0,1,2.59-10.48c.35-1,.72-1.9,1.11-2.79v45.9a4.08,4.08,0,0,0,4.21,3.9h0a4.09,4.09,0,0,0,4.22-3.9v-25h1.43v25a4.09,4.09,0,0,0,4.22,3.9h0a4.08,4.08,0,0,0,4.21-3.9V34.59c.25.6.49,1.22.72,1.85A51.9,51.9,0,0,1,56.78,46a4,4,0,0,0,7.82,1.05,51.08,51.08,0,0,1,3.08-10.33c.31-.75.64-1.48,1-2.18l-6.1,29ZM107.8,13.33a6.44,6.44,0,1,1-6.43,6.43,6.43,6.43,0,0,1,6.43-6.43ZM15,12.52a6.9,6.9,0,1,1-6.9,6.9,6.9,6.9,0,0,1,6.9-6.9ZM44.22,0A9.12,9.12,0,1,1,35.1,9.12,9.12,9.12,0,0,1,44.22,0ZM77.76,0a9.12,9.12,0,1,1-9.12,9.12A9.12,9.12,0,0,1,77.76,0Z"
      />
    </svg>
  </div>
);

export const DailyWinsPostsIcon = (
  props: SVGProps<SVGSVGElement>,
): JSX.Element => (
  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 dark:bg-pink-900/20">
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-calendar-check-icon lucide-calendar-check text-pink-600 dark:text-pink-400"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  </div>
);

export const Adventure = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-900/20">
    <svg
      height="24"
      width="24"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 99.22 122.88"
      fill="currentColor"
      xmlSpace="preserve"
      className="text-orange-600 dark:text-orange-400"
      {...props}
    >
      <style type="text/css">{`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}</style>
      <g>
        <path
          className="st0"
          d="M47,3.73L49.65,0l2.44,3.44c1.23,1.74,1.26,1.35,1.26,3.46v7.09c8.25,7.84,15.91,15.39,20.1,24.04 
        c4.85,10,2.98,13.41-0.13,22.88c-5.24,15.95-13.44,24.12-9.56,41.37l29.45,5.41c8.04,1.39,8.61,14.49-2.05,15.18H9.34 
        c-3.02,0-5.78,0.15-7.88-2.67c-2.9-3.91-1.35-10.86,3.57-12.26l30.76-5.17c2.12-16.44,0.47-13.14-5.02-28.38 
        c-1.86-5.16-3.75-9.79-5.18-14.78c-1.74-6.07-3.54-12.46-1.39-18.77c1.2-3.52,5.1-7.51,7.52-10.44
        c4.62-5.6,9.29-11.12,14.08-16.46V7.96C45.8,5.4,45.52,5.8,47,3.73L47,3.73z 
        M52.25,40.96c0.1-0.1,0.19-0.21,0.25-0.33c1.86-3.55-4.97-4.24-5.78-2.04
        c-0.26,0.69-0.36,1.84,0.27,2.37h0c-0.86,0-1.23,0.23-1.99,0.66c-8.36,4.68-6.99,18.67,0.5,23.24V68h-0.17 
        c-2.93,0-4.5,0.15-6.9-1.97c-2.33-2.06-4.21-7.44-4.97-10.42c-1.9-7.46-1.05-11.12,2.52-18C39.2,31.41,44,25.67,49.69,20.34 
        c8.46,8.29,15.81,16.89,16.75,26.26c0.06,2.42,0,4.8-0.44,7.07c-1.96,10.25-3.62,13.74-12.07,14.26v-2.93h0.06 
        c1.69-1.14,3.05-2.78,4.09-4.92c2.99-6.15,3.01-14.44-3.17-18.06C53.86,41.39,53.37,41,52.25,40.96L52.25,40.96z"
        />
      </g>
    </svg>
  </div>
);

export const Challenges = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <div className="flex h-12 w-12 items-center justify-center rounded-xl">
    <svg
      height="24"
      width="24"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 122.88 120.36"
      fill="currentColor"
      // className="text-red-600 dark:text-red-400"
      xmlSpace="preserve"
      {...props}
    >
      <style type="text/css">
        {`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}
      </style>
      <g>
        <path
          className="st0"
          d="M8.94,102.48h85.62c3.71-3.85,8.02-14.75,12.45-25.96c1.41-3.57,2.83-7.17,4.3-10.66 
        c-6.43,0.02-15.18-0.61-16.52-2.15c-1.04-1.19-0.66-2.93,0.91-5.12l18.93-18.48c1.77-1.6,3.31-2.21,4.62-1.81 
        c1.3,0.39,2.38,1.76,3.23,4.13c0.48,7.13,0.43,14.27-0.63,21.4c-0.58,0.34-1.18,0.63-1.79,0.89c-2.01,4.48-4.01,9.56-6,14.58 
        c-3.41,8.63-6.75,17.09-10.52,23.18h10.39c4.92,0,8.94,4.02,8.94,8.94v0c0,4.92-4.02,8.94-8.94,8.94h-105 
        c-4.92,0-8.94-4.02-8.94-8.94v0C0,106.51,4.02,102.48,8.94,102.48L8.94,102.48z M36.43,36.39l-0.27-0.45l-7.06,1.01L26.54,52.6 
        c-0.48,2.93-3.23,4.91-6.16,4.44c-2.93-0.48-4.91-3.23-4.44-6.16l3.2-19.55c0.39-2.38,2.28-4.13,4.54-4.45l13.67-1.96 
        l10.11-2.21c5.76,0.19,10.06,2.61,12,7.7c0.28,0.35,0.52,0.75,0.71,1.18l5.42,12.39l17.68,1.1c2.96,0.17,5.22,2.72,5.04,5.68 
        c-0.17,2.96-2.72,5.22-5.68,5.05l-20.97-1.3c-2.16-0.13-3.95-1.52-4.69-3.41l-1.1-2.51l-2.25,9.79l14.84,8.74 
        c1.29,0.75,2.14,1.96,2.48,3.3l0.02,0l5.39,21.11c0.73,2.88-1.01,5.81-3.89,6.54c-2.88,0.73-5.81-1.01-6.54-3.89L61.1,75.19 
        l-1.24-0.73l-15.42-5.87l-0.83,0.46l-4.71,12.49c-0.34,0.9-0.89,1.65-1.58,2.23l-17.66,14.83c-2.28,1.9-5.66,1.6-7.57-0.67 
        c-1.9-2.28-1.6-5.66,0.67-7.57L29.03,76.7C30.22,62.9,32.82,49.5,36.43,36.39L36.43,36.39z M57.91,0c5.64,0,10.21,4.57,10.21,10.21 
        c0,5.64-4.57,10.21-10.21,10.21c-5.64,0-10.21-4.57-10.21-10.21C47.7,4.57,52.27,0,57.91,0L57.91,0z"
        />
      </g>
    </svg>
  </div>
);

export const Contests = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <div className="flex h-12 w-12 items-center justify-center rounded-xl">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      // className="text-yellow-600 dark:text-yellow-400"
    >
      <path d="M17 4V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1H4v2a5 5 0 0 0 4 4.9V12a6 6 0 0 0 5 5.91V20H9v2h6v-2h-4v-2.09A6 6 0 0 0 16 12v-1.1A5 5 0 0 0 20 6V4h-3ZM6 6V6.01a3 3 0 0 1-2-.59V6a1 1 0 0 1 1-1h1Zm12 0a3 3 0 0 1-2 .01V5h1a1 1 0 0 1 1 1v.01Z" />
      <path
        d="M12 7.5l.76 1.54 1.7.25-1.23 1.2.29 1.69L12 11.25l-1.52.8.29-1.69-1.23-1.2 1.7-.25L12 7.5z"
        fill="#fff"
      />
    </svg>
  </div>
);

export const Posts = (props: SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 64 80"
      xmlns="http://www.w3.org/2000/svg"
      stroke="black"
      fill="none"
      strokeWidth="2"
      className="text-blue-700 dark:text-blue-300"
    >
      <rect x="4" y="4" width="56" height="72" rx="4" ry="4" />
      <circle cx="14" cy="16" r="5" />
      <line x1="24" y1="13" x2="46" y2="13" />
      <line x1="24" y1="18" x2="46" y2="18" />
      <line x1="24" y1="23" x2="44" y2="23" />

      <line x1="6" y1="28" x2="58" y2="28" />

      <polyline points="10,60 26,42 38,54 46,46 58,60" />
      <circle cx="36" cy="36" r="3" />

      <line x1="6" y1="62" x2="58" y2="62" />
      <circle cx="14" cy="68" r="1.5" />
      <circle cx="20" cy="68" r="1.5" />
      <circle cx="26" cy="68" r="1.5" />
      <line x1="38" y1="68" x2="54" y2="68" />
    </svg>
  );
};

export const RegionIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      stroke-linejoin="round"
      className="lucide lucide-map-pin-icon lucide-map-pin"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
};
