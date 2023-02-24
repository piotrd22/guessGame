import Link from "next/link";

function Navbar() {
  return (
    <nav className="navbar border-b bordered border-base-300 bg-base-100 mb-5">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">nGUESSER</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/hall-of-fame"}>Hall Of Fame</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
