import { CurrentUser } from "@/components/CurrentUser";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-semibold text-gray-900 hover:text-gray-700"
            >
              PocketBase SPA
            </Link>
          </div>

          {/* Right side - Current User */}
          <div className="flex items-center">
            <CurrentUser />
          </div>
        </div>
      </div>
    </nav>
  );
}
