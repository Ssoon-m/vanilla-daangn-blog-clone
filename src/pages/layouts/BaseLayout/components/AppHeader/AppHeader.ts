import Component from "@/lib/dom";
import styles from "./AppHeader.module.css";

const headerNav = [
  {
    text: "회사소개",
    to: "",
    isActive: false,
  },
  {
    text: "팀문화",
    to: "",
    isActive: false,
  },
  {
    text: "서비스",
    to: "",
    isActive: false,
  },
  {
    text: "블로그",
    to: "",
    isActive: true,
  },
  {
    text: "채용공고",
    to: "",
    isActive: false,
  },
];

class AppHeader extends Component {
  protected render(): string {
    return `
      <div class=${styles["header-height"]}></div>
      <header class=${styles["header"]}>
        <div class=${styles["header-container"]}>
          <a href="/" data-link>
            <title>당근 로고</title>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" style="height:36px" viewBox="0 0 203 114" class="c-iNmzKr">
              <path fill="#FF6F0F" d="M29.234 36.895C13.09 36.895 0 49.695 0 65.856c0 22.328 29.318 34.175 29.234 34.143-.08.032 29.234-11.816 29.234-34.143 0-16.148-13.089-28.96-29.234-28.96Zm0 40.684A11.069 11.069 0 0 1 18.386 64.34a11.073 11.073 0 0 1 15.097-8.061 11.071 11.071 0 0 1 6.83 10.23A11.07 11.07 0 0 1 29.233 77.6v-.02Z"></path>
              <path fill="#00A05B" d="M35.817 0c-6.823 0-11.574 4.768-12.322 10.4-9.094-2.512-16.22 4.4-16.22 12 0 5.82 3.999 10.52 9.33 12.047 4.299 1.228 12.041.312 12.041.312-.04-1.88 1.692-3.944 4.363-5.824 7.599-5.343 13.542-7.863 14.458-15.151C48.427 6.16 42.767 0 35.817 0Z"></path>
              <path fill="#FF6F0F" d="M116.493 46.963c-6.174 1.94-16.864 2.972-26.906 2.972V37.719h20.74v-9.096H78.465v30.975c17.424 0 32.637-2.1 39.06-4.087l-1.032-8.548ZM131.134 25h-11.106v35.611h11.106V49.448h8.958v-9.716h-8.958V25ZM110.506 60.526c-11.765 0-20.396 6.484-20.396 16s8.639 16 20.396 16c11.758 0 20.396-6.488 20.396-16s-8.63-16-20.396-16Zm0 23.092c-5.303 0-9.282-2.544-9.282-7.108s3.979-7.104 9.282-7.104 9.282 2.544 9.282 7.104c0 4.56-3.975 7.108-9.282 7.108ZM161.72 65.251h-11.354v24.091h45.127v-9.535H161.72V65.25ZM194.086 27.972h-44.232v9.535h33.082c0 2.369.112 8-.972 14.4h-40.568v9.864h61.588v-9.848H192.01c1.472-8.088 1.892-14.392 2.076-23.951Z"></path>
            </svg>    
          </a>
          <nav>
            <input type="checkbox" id="navigation-menu" class=${
              styles["input"]
            }>
            <label for="navigation-menu" class=${styles["menu-toggle"]}>
              <svg viewBox="0 0 100 100" class=${styles["menu-icon"]}>
                <path d="M 20 30 H 80 C 80 30 95 30 95 65 C 95 80 90 80 85 80 C 80 80 75 75 75 75 L 25 25" class=${
                  styles["stroke"]
                }></path>
                <path d="M 20 70 H 80 C 80 70 95 70 95 35 C 95 20 90 20 85 20 C 80 20 75 25 75 25 L 25 75" class=${
                  styles["stroke"]
                }></path>
              </svg>
            </label>
            <ul class=${styles["header-nav"]}>
              ${headerNav
                .map(
                  (item) =>
                    `<li>
                      <a data-link class=${
                        item.isActive ? styles["active"] : ""
                      }>${item.text}</a>
                    </li>`
                )
                .join("")}
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
}

export default AppHeader;
