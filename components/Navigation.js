import { ImStatsBars } from "react-icons/im";

const Navigation = () => {
  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Information */}
        <div className="flex items-center gap-2">
          {/* image */}
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            <img
              src="https://thispersondoesnotexist.com/"
              alt="profile image"
              className="object-cover w-full h-full"
            />
          </div>
          {/* name */}
          <small>Hi Leon</small>
        </div>

        {/* navigation */}
        <nav className="flex items-center gap-4">
          <div>
            <ImStatsBars className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger">Sign Out</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
