import { useEffect, useState } from 'react';
import Style from './Navbar.module.scss';
import Toggler from "../home/Toggler";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { info } from "../../info/Info";
import { logout } from '../../store/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from '../../store/chat-slice';

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AuthState, ThemeState } from '../../model/slice-types';
import { themeActions } from '../../store/theme-slice';

const LinkEnum = {
    NO_VALIDATION: 'NO_VALIDATION',
    LOGGED_IN: 'LOGGED_IN',
    LOGGED_OUT: 'LOGGED_OUT'
};

const links = [
    {
        name: 'Home',
        to: '/',
        active: 'home',
        check: LinkEnum.NO_VALIDATION,
    },
    {
        name: 'Chat',
        to: '/chat',
        active: 'chat',
        check: LinkEnum.LOGGED_IN,
    },
    {
        name: 'Login',
        to: '/login',
        active: 'login',
        check: LinkEnum.LOGGED_OUT,
    },
    {
        name: 'Signup',
        to: '/signup',
        active: 'signup',
        check: LinkEnum.LOGGED_OUT,
    },
]

const Navbar: React.FC<{ darkMode: boolean, handleClick: () => void }> = ({ darkMode, handleClick }) => {
    // const location = useLocation();
    //const [active, setActive] = useState(location.pathname === '/' ? 'home' : location.pathname.slice(1));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state: { auth: AuthState }) => state.auth);
    const { navLink } = useSelector((state: { theme: ThemeState }) => state.theme);
    const [active, setActive] = useState(navLink);

    const logoutHandler = () => {
        dispatch(chatActions.resetAll());
        dispatch(themeActions.setNavLink("home"));
        dispatch(logout());
    }

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        setActive(navLink);
    }, [navLink]);

    return (
        <Disclosure as="nav" className="bg-transparent">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">

                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>


                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">

                                    <div style={{ background: info.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: "center", display: 'flex', alignItems: 'center' }}
                                        className=' cursor-pointer'
                                        onClick={() => navigate("/")}
                                    >
                                        <i className='fab fa-rocketchat text-3xl'></i>
                                        <span className='ml-1'>{info.initials}</span>
                                    </div>

                                </div>

                                <div className="hidden sm:ml-6 sm:flex flex-grow  justify-center ">
                                    <div className="flex space-x-4">

                                        {links.filter(link => {
                                            if (link.check === LinkEnum.NO_VALIDATION) return link;

                                            if (isLoggedIn) {
                                                return link.check === LinkEnum.LOGGED_IN;
                                            }
                                            else {
                                                return link.check === LinkEnum.LOGGED_OUT;
                                            }
                                        }
                                        ).map((link, index) => (
                                            <Box
                                                key={index}
                                                component={'div'}
                                                className={(link.active === active) ? Style.active : ""}
                                                sx={{ borderImageSource: info.gradient }}
                                            >
                                                <Link key={index} to={link.to} onClick={() => setActive(link.active)}
                                                    className={classNames(
                                                        'text-gray-300 ',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                >
                                                    <span className={`font-bold ${darkMode ? 'text-[#639dc7] hover:text-[#1c3a4f]' : 'text-[#1c3a4f] hover:text-[#639dc7]'}`}>{link.name}</span>
                                                </Link>
                                            </Box>

                                        ))}


                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                <Toggler darkMode={darkMode} handleClick={handleClick} />

                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${darkMode ? 'bg-[#1A364A]' : 'bg-white'}`}>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(active ? (darkMode ? 'bg-[#244a65]' : 'bg-gray-100 ') : ' ', 'block px-4 py-2 text-sm text-gray-700 hover:text-gray-600')}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            {/* <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(active ? (darkMode ? 'bg-[#244a65]' : 'bg-gray-100 ') : ' ', 'block px-4 py-2 text-sm text-gray-700 hover:text-gray-600')}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </Menu.Item> */}
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/"
                                                        onClick={logoutHandler}
                                                        className={classNames(active ? (darkMode ? 'bg-[#244a65]' : 'bg-gray-100 ') : ' ', 'block px-4 py-2 text-sm text-gray-700 hover:text-gray-600')}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {links
                                .filter(link => {
                                    if (link.check === LinkEnum.NO_VALIDATION) return link;

                                    if (isLoggedIn) {
                                        return link.check === LinkEnum.LOGGED_IN;
                                    }
                                    else {
                                        return link.check === LinkEnum.LOGGED_OUT;
                                    }
                                }
                                )
                                .map((link, index) => (
                                    <Disclosure.Button
                                        key={index}
                                        as="a"
                                        href={link.to}
                                        className={classNames(
                                            link.active === active ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        onClick={() => setActive(link.active)}
                                    //aria-current={link.active ? 'page' : undefined}
                                    >
                                        {link.name}
                                    </Disclosure.Button>
                                ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )





}

export default Navbar;