import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

export async function Header() {
  return (
    <header>
      <nav className="border-gray-200 px-4 py-2.5 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          <div className="flex items-center lg:order-2">
            <SignOutButton />
          </div>
          <div
            className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
            id="mobile-menu-2"
          >
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              <li>
                <Link
                  href="/"
                  className="block rounded py-2 pl-3 pr-4 hover:underline lg:p-0"
                  aria-current="page"
                >
                  Tasks
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
