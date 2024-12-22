import { useMutateLogout } from "@/hooks/mutation";
import { useQueryGetUser } from "@/hooks/query";
import { conciseAddress } from "@/utils/wagmiConfig";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

export default function ProfileMenu() {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { data: user, refetch } = useQueryGetUser();
  const router = useRouter();
  const { mutate: mutateLogout } = useMutateLogout()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  function handleCopy(text) {
    const copy = navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset "copied" state after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
    console.log(copy)
  }

  return (
    <div>

      {user?.email ? (<div className="relative inline-block text-left" ref={menuRef}>
        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          className="flex justify-center items-center rounded-md border ring-orange bg-yellow w-8 h-8 rounded-full uppercase"
        >
          <span class="font-bold text-22 mt-1 text-black-100 ">{user?.email?.charAt(0)}</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute right-0 mt-2 rounded-lg overflow-hidden w-56 rounded-md text-left shadow-lg bg-white text-black-100 ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              <div className="flex justify-between items-center pr-4">
                <p
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Email: {conciseAddress(user.email, 8, 3)}
                </p>
                <button onClick={() => handleCopy(user.email)}>
                  <img src="/assets/svg/copy.svg" alt="" className="" />
                </button>

              </div>
              <div className="flex justify-between items-center pr-4 hover:bg-gray-200 border-y border-gray-200">
                <p
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Address: {conciseAddress(user.address)}
                </p>
                <button onClick={() => handleCopy(user.address)}>
                  <img src="/assets/svg/copy.svg" alt="" className="" />
                </button>

              </div>
              <button
                onClick={() => router.push('/dashboard/')}
                className="block px-4 py-2 text-sm  text-gray-700 hover:bg-gray-200 text-left border-y border-gray-200 w-full"
              >
                Profile
              </button>

              <button
                onClick={() => router.push('/admin/dashboard')}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 text-left border-y border-gray-200 w-full"
              >
                Admin
              </button>

              <button
                onClick={() => {
                  mutateLogout();
                  refetch();
                  setTimeout(() => refetch(), 500)
                  router.push('/');
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 text-left border-y border-gray-200 w-full"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>) : (
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/auth/create-account")}
            className="text-12 font-inter font-semibold py-3 text-center px-8 text-black-100 border border-black-100 rounded-full"
          >
            Regístrate
          </button>
          <button
            onClick={() => router.push("/auth/log-in")}
            className="text-12 font-inter font-semibold py-3 text-center px-8 text-black-100 bg-yellow rounded-full"
          >
            Ingresa
          </button>
        </div>
      )}
    </div>

  );
}
