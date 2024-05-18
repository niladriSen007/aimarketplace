import Link from "next/link"
import NavbarLinks from "./NavbarLinks"
import { Button } from "./ui/button"
import { MobileMenu } from "./MobileMenu"
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server"
import { UserNav } from "./UserNav"

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  /*  console.log(user) */
  return (
    <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            Bing<span className="text-primary underline">UI.</span>
          </h1>
        </Link>
      </div>
      <NavbarLinks />
      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        {user ? (
          <UserNav
            email={user?.email as string}
            name={user?.given_name as string}
            userImage={
              user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
          />
        ) : (
          <div className="flex items-center gap-x-2">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary" asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
