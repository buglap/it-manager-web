import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "graphql/queries/users";
import { getSession, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
    const { data: session }: any = useSession();
    const { data: userData, loading } = useQuery(GET_USER_PROFILE, {
        variables: {
          email: session.user.email,
        },
      });

    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            href="#"
                        >
                            TI-manager
                        </a>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            {
                                userData?.getUser?.role?.pages.map((c) => (
                                    <NarbarItem  key={c.id} path={c.path} name={c.name}/>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

const NarbarItem = ({ path, name }) => (
    <div>
        <li className="nav-item">
            <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href={path}>
                <i className=" leading-lg text-white opacity-75"></i><span className="ml-2">{name}</span>
            </a>
        </li>
    </div>
);

export default Navbar;