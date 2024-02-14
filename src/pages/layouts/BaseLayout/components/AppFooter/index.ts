import Component from "@/lib/dom";

class AppFooter extends Component {
  protected render(): string {
    return `
      <footer>
        <nav>
          <ul>
            <li>개인정보처리방침</li>
            <li>브랜드 리소스</li>
            <li>자주 묻는 질문</li>
            <li>IR</li>
            <li>PR</li>
          </ul>
          <ul>
            <li>Github</li>
            <li>Medium</li>
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </nav>
        <div>
          <p>주소 : 서울특별시 서초구 강남대로 465, 교보강남타워 11층 (IR 관련 문의 : <a href="mailto:ir@daangn.com" rel="noopener noreferrer">ir@daangn.com</a>)<br/>
          (채용 관련 문의 : <a href="mailto:recruit@daangn.com" target="_blank" rel="noopener noreferrer">recruit@daangn.com</a>)</p>
          <p>© 당근마켓</p>
        </div>
      </footer>
    `;
  }
}

export default AppFooter;
