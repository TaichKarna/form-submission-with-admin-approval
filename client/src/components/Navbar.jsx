import { Link, useNavigate } from "react-router-dom"
import useUserStore from "../store/store"

export default function Navbar(){
    const user = useUserStore(state => state.user)
    const navigate = useNavigate();
    return(
        <div className="w-full z-500 pb-7 pt-3">
        <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full ">
            <nav className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-8 mx-auto">
                <div className="md:col-span-3">
                <Link className="flex-none rounded-xl text-2xl inline-block font-semibold focus:outline-none focus:opacity-80 dark:text-white text-black"  aria-label="Form-Homepage" to={"/"}>
                    Form
                </Link>
                </div>

                <div className="flex items-center gap-x-1 md:gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
                   { !user ? (
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-white/10 dark:text-white dark:hover:text-white dark:focus:text-white"
                            onClick={() => navigate('signin')}
                        >
                        Signin
                    </button>
                    ) : 
                    (
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 focus:outline-none focus:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => navigate('/profile')}
                        >
                    Profile
                        </button>
                    )
                }
                 { user && user.userRole === "admin" &&
                    (
                        <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-lime-400 text-black hover:bg-lime-500 focus:outline-none focus:bg-lime-500 transition disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => navigate('/dashboard')}
                        >
                            Dashboard
                        </button>
                    )
                }
                <div className="md:hidden">
                    <button type="button" className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" id="hs-navbar-hcail-collapse" aria-expanded="false" aria-controls="hs-navbar-hcail" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-hcail">
                    <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                    <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
                </div>

                <div id="hs-navbar-hcail" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6" aria-labelledby="hs-navbar-hcail-collapse">
                <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
                    <div>
                    <Link className="relative inline-block text-black focus:outline-none before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 dark:text-white" to={"/form"} aria-current="page">Form</Link>
                    </div>
                    <div>
                    <Link className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300" to={""}></Link>
                    </div>
                    <div>
                    <Link className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300" to={""}></Link>
                    </div>
                    <div>
                    <Link className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300" to={""}></Link>
                    </div>
                    <div>
                    <Link className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300" to={""}></Link>
                    </div>
                </div>
                </div>
            </nav>
        </header>
        </div>
    )
}
