import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { getUser, syncUser } from "@/actions/user.actions";

async function Navbar() {
  const user = await currentUser();

  if (user) await syncUser();

  const userIsSignedIn = await getUser();

  return (
    <header className="h-[12vh] shadow-md sticky top-0 z-50 bg-white backdrop-opacity-80 backdrop-blur-3xl">
      <nav className="flex items-center justify-between h-full  max-w-6xl mx-auto">
        <div className="leading-2">
          <Link href={"/"} className="flex items-center gap-1">
            <span className="text-2xl font-bold text-primary">Next Blog</span>
          </Link>
          <span className="text-[10px] cursor-default">
            Exploring innovation <br />
            one Byte at a time
          </span>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton
              // className="bg-primary px-4 py-1.5 rounded-lg text-white cursor-pointer"
              mode="modal"
            >
              <div className="bg-primary px-4 py-1.5 rounded-lg text-white text-sm cursor-pointer">
                Sign in
              </div>
            </SignInButton>

            <SignUpButton mode="modal">
              <div className="cursor-pointer">Sign up</div>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
            <Link
              className="text-sm font-semibold ml-4 hover:underline"
              href={"/create-post"}
            >
              create post
            </Link>
            {userIsSignedIn?.isAdmin && (
              <Link
                className="text-sm font-semibold ml-4 hover:underline"
                href={"/admin"}
              >
                Admin
              </Link>
            )}
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
