import { UserCircleIcon } from "@heroicons/react/24/outline"
import { BellIcon } from "@heroicons/react/20/solid"
import { useAuth } from "@/hooks"

export function Header() {
    const { signOut } = useAuth()

    function handleSignOut() {
        signOut()
        window.location.href = '/login'
    }


    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a href="/app" className="btn btn-ghost text-xl">PlusPlanner</a>
            </div>
        <div className="flex-none">
            <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
                    <BellIcon width={24}/>
                </button>
                <div
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                <div className="card-body">
                    <span className="text-lg font-bold">Noficações</span>
                </div>
                </div>
            </div>
            <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <UserCircleIcon />
                    </div>
                </button>
                <ul
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                    <a href="__blank" className="justify-between">
                    Profile<span className="badge">New</span>
                    </a>
                </li>
                <li><button onClick={handleSignOut} className="btn-ghost">Logout</button></li>
                </ul>
            </div>
        </div>
    </div>
  )
}