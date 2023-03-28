import React from "react";

const Profile = () => {
  return (
    <form className="w-full flex flex-col profil-h self-end text-[#041267]">
      <div className="px-6 flex flex-col gap-y-4">
        <div className="min-h-[4rem] flex items-center justify-start border-b">
          <h2 className="text-2xl font-semibold">Preferences</h2>
        </div>
        <div className="flex flex-col gap-y-3 py-2 text-sm">
          <h3 className="text-base font-medium">Display name</h3>
          <input type="text" placeholder="vron" className="px-4 py-3 border" />
          <button type="submit" className="px-4 py-3 font-medium bg-indigo-300">
            Update display name
          </button>
        </div>
      </div>
    </form>
  );
};

export default Profile;
