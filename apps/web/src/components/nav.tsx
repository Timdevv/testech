import { UserButton } from "@clerk/nextjs";

export function Nav() {
  return (
    <div className="border-b">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 font-bold">Feedback App</div>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/"/>
        </div>
      </div>
    </div>
  )
}