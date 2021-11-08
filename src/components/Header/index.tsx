import header from "./header.module.scss"
import common from "../../styles/common.module.scss"
import Link from "next/link"

export default function Header() {
  return (
    <header className={`${common.container} ${header.header}`}>
      <Link href="/">
        <img src="/images/Logo.svg" alt="logo" />
      </Link>
    </header>
  );
}
